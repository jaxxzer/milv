#!/usr/bin/env node
'use strict';

// const milv = () => {
//   const program: CommanderStatic = commander;
//   program.version(require('../package.json').version);
// //   CommandLoader.load(program);
//   program.parse(process.argv);
// };

import Milv from '../src/milv';

const milv = () => {
    const config = { whiteList: ["dupa", /lol/g] }
    const m = new Milv("/Users/i353840/go/src/github.com/magicmatatjahu/milv/examples/milv.yml", config);
}

milv();
