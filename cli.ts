#!/usr/bin/env node
const discover = require(".");

for (const discoverable of discover()) {
  console.log(discoverable);
}
