const semver = require("semver");

type Dependencies = Record<string, string>;

interface PackageObject {
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
  keywords?: string[];
}

function getDependencies(packageObject: PackageObject): Dependencies {
  return {
    ...packageObject.dependencies,
    ...packageObject.devDependencies
  };
}

interface Discoverable {
  package: string;
  test(packageObject: PackageObject): boolean;
}

const discoverables: Discoverable[] = [
  {
    package: "@typescript-eslint/eslint-plugin",
    test(packageObject) {
      return "typescript" in packageObject;
    }
  },
  {
    package: "eslint-plugin-eslint-plugin",
    test(packageObject) {
      return (
        packageObject.keywords &&
        packageObject.keywords.includes("eslintplugin")
      );
    }
  },
  {
    package: "eslint-plugin-jest-dom",
    test(packageObject) {
      return (
        "jest-dom" in getDependencies(packageObject) ||
        "@testing-library/jest-dom" in getDependencies(packageObject)
      );
    }
  },
  {
    package: "eslint-plugin-react",
    test(packageObject) {
      return "react" in getDependencies(packageObject);
    }
  },
  {
    package: "eslint-plugin-react-hooks",
    test(packageObject) {
      return (
        "react" in getDependencies(packageObject) &&
        semver.satisfies(getDependencies(packageObject).react, ">= 16.8")
      );
    }
  },
  {
    package: "eslint-plugin-testing-library",
    test(packageObject) {
      return Object.keys(getDependencies(packageObject)).some(packageName =>
        packageName.includes("testing-library")
      );
    }
  }
];

module.exports = function discover() {
  const packageObject: PackageObject = require(`${process.cwd()}/package.json`);

  return discoverables
    .filter(
      discoverable =>
        !(discoverable.package in getDependencies(packageObject)) &&
        discoverable.test(packageObject)
    )
    .map(discoverable => discoverable.package);
};
