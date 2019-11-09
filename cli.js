#!/usr/bin/env node
const discover = require(".");

const discoverables = discover();

if (discoverables.length) {
  process.exitCode = 1;

  for (const discoverable of discoverables) {
    console.log(discoverable);
  }
}
