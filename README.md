# eslint-discover

Quickly discover ESLint plugins for your dependencies

## Usage

Run `npx eslint-discover` in your package's root directory and install plugin packages as needed. They may include custom rules or shareable configs, so refer to their documentation for full usage instructions.

## Limitations

This currently scans `dependencies` and `devDependencies` in `package.json`, so it may miss globally installed packages or dependencies of other packages.
