# eslint-discover

Quickly discover ESLint plugins for your dependencies

## Usage

Run `npx eslint-discover` in your package's root directory. Any known plugins will be discovered if you have the associated package installed (such as `eslint-plugin-react` for `react`). You can install discovered plugins as needed. They may include custom rules or shareable configs, so refer to their documentation for full usage instructions.

```
$ npx eslint-discover
@typescript-eslint/eslint-plugin
eslint-plugin-eslint-plugin
eslint-plugin-jest-dom
eslint-plugin-react
eslint-plugin-react-hooks
eslint-plugin-testing-library
```

### Continuous integration (CI)

It may be useful to automatically check that relevant ESLint plugins are installed as your codebase grows and depends on new technologies. A convenient way to do this is to install `eslint-discover` in a continuous integration (CI) service like [GitHub Actions](https://github.com/features/actions) or [Travis CI](https://travis-ci.com/). The `eslint-discover` command can be called in CI scripts (or any `package.json` scripts that your CI service runs). It will return a `1` (failure) exit code if any discovered ESLint plugins are missing, which should fail the build on most CI services.

## Limitations

This currently scans `dependencies` and `devDependencies` in `package.json`, so it may miss globally installed packages or dependencies of other packages.
