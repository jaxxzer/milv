#!/usr/bin/env node
'use strict';

import * as commander from 'commander';
import { CommanderStatic } from 'commander';
// import { CommandLoader } from '../commands';

const milv = () => {
  const program: CommanderStatic = commander;
  program.version(require('../package.json').version);
  // CommandLoader.load(program);
  program.parse(process.argv);

  if (!program.args.length) {
  	program.outputHelp();
  }
};

milv();
