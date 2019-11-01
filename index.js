const semver = require("semver");

function getDependencies(packageObject) {
  return {
    ...packageObject.dependencies,
    ...packageObject.devDependencies
  };
}

const discoverables = [
  {
    package: "@typescript-eslint/eslint-plugin",
    test(packageObject) {
      return packageObject.hasOwnProperty("typescript");
    }
  },
  {
    package: "eslint-plugin-eslint-plugin",
    test(packageObject) {
      return (
        packageObject.keywords && packageObject.keywords.includes("eslintplugin")
      );
    }
  },
  {
    package: "eslint-plugin-jest-dom",
    test(packageObject) {
      return (
        getDependencies(packageObject).hasOwnProperty("jest-dom") ||
        getDependencies(packageObject).hasOwnProperty(
          "@testing-library/jest-dom"
        )
      );
    }
  },
  {
    package: "eslint-plugin-react",
    test(packageObject) {
      return getDependencies(packageObject).hasOwnProperty("react");
    }
  },
  {
    package: "eslint-plugin-react-hooks",
    test(packageObject) {
      return (
        getDependencies(packageObject).hasOwnProperty("react") &&
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
  const packageObject = require(`${process.cwd()}/package.json`);

  return discoverables
    .filter(discoverable => discoverable.test(packageObject))
    .map(discoverable => discoverable.package);
};
