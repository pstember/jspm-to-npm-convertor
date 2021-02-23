jspm-to-npm-convertor
=====================

Extract the list of dependencies from the JSPM section of the package.json to the regular section

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/jspm-to-npm-convertor.svg)](https://npmjs.org/package/jspm-to-npm-convertor)
[![Downloads/week](https://img.shields.io/npm/dw/jspm-to-npm-convertor.svg)](https://npmjs.org/package/jspm-to-npm-convertor)
[![License](https://img.shields.io/npm/l/jspm-to-npm-convertor.svg)](https://github.com/pstember/jspm-to-npm-convertor/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g jspm-to-npm-snyk-convertor
$ jspm-to-npm-convertor COMMAND
running command...
$ jspm-to-npm-convertor (-v|--version|version)
jspm-to-npm-snyk-convertor/0.0.0 darwin-x64 node-v15.3.0
$ jspm-to-npm-convertor --help [COMMAND]
USAGE
  $ jspm-to-npm-convertor COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->
```This tool is deisgned to extract the dependencies from the JSPM section to the regular section of the package.json

USAGE
  $ jspm-to-npm-convertor
  $ jspm-to-npm-convertor -i ./package-jspm.json -o ./snyk/package.json -g

OPTIONS
  -d, --dev            devDependencies to be imported as well
  -g, --ignoreGithub   ignore github registry based dependencies
  -h, --help           show CLI help
  -i, --input=input    [default: package.json] name of input file
  -o, --output=output  [default: ./snyk/package.json] name of output file
  -v, --version        show CLI version
```
