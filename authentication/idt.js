'use strict'

/*
 *  Wrapper for the idt (IBM Developer Tools) command.
 *  Run with the same arguments as `idt`, e.g.
 *    `node idt.js build` -> `idt build`.
 *  If `idt` isn't installed, this will prompt you to install. Or you can run
 *  `node idt.js install` to automatically install idt and any other
 *  required dependencies (e.g. docker, git, kubernetes, helm).
 *
 */

const fs = require('fs');
const process = require('process');
const cp = require('child_process');
const request = require('request');
const path = require('path');

const chalk = require('chalk');

const node = process.execPath;
// Array of args passed to idt.js.
const args = process.argv.slice(2);
let win = (process.platform === 'win32');

// Either install idt or run idt + args.
if (args.includes('install')) {
  downloadInstaller();
} else {
  // TODO(gib): Check for idt once this works in scripts:
  // const checkCmd = win ? 'where idt' : 'which idt';
  const checkCmd = 'bx plugin show dev';
  let hasIDT = false;
  try {
    console.log(chalk.blue('Checking for idt'));
    cp.execSync(checkCmd); // Don't inherit stdio, we don't want to print the output.
    hasIDT = true; // If we didn't have idt, the previous command would have thrown.
  } catch (e) {
    const prompt = require('prompt-confirm');
    new prompt({ name: 'install',
      message: 'IDT not found, do you want to install it? y/N',
      default: false
    }).ask((answer) => {
      if (answer) {
        downloadInstaller(() => runIDT(args));
      } else {
        console.error(chalk.red(`Not installing idt, so not running: idt ${args.join(' ')}`));
      }
    });
  }
  if (hasIDT) runIDT(args);
}

// Run IDT with whatever args we were given.
function runIDT(args) {
  const cmd = 'bx dev ' + args.join(' ');
  console.log(chalk.blue('Running:'), cmd);
  cp.execSync(cmd, {stdio: 'inherit'});
}

// Download the IDT installer script and trigger runInstaller().
function downloadInstaller(cb) {
  const url = win ?
    'https://ibm.biz/yeoman-idt-win-install' :
    'http://ibm.biz/yeoman-idt-install';

  const fileName = url.split('/').pop()

  console.log(chalk.blue('Downloading installer from:'), url);

  const file = fs.createWriteStream(fileName);

  request
    .get({url, followAllRedirects: true})
    .on('error', (err) => { console.error(err); })
    .pipe(file)
    .on('finish', () => runInstaller(fileName, cb));
}

// Run the installer script and trigger optional callback (cb).
function runInstaller(fileName, cb) {
  const shell = win ? 'powershell.exe' : 'bash';

  const filePath = path.resolve(__dirname, fileName);
  console.log(`Now running: ${shell} ${filePath}`);

  cp.spawnSync(shell, [filePath], {stdio: 'inherit'});
  typeof cb === 'function' && cb();
}
