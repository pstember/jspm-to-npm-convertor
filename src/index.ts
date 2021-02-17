import {Command, flags} from '@oclif/command'
import { readFileSync } from 'fs';

const jsonExample = JSON.parse(readFileSync('./package.json', 'utf-8'));
//console.log(jsonExample);

class JspmToNpmConvertor extends Command {
  static description = 'describe the command here'
  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    // flag with no value (-d, --dev)
    dev: flags.boolean({char: 'd'}),
  }
  static args = [{name: 'file'}]
  async run() {
    const {args, flags} = this.parse(JspmToNpmConvertor)
    const jsonEmpty: any = {"dependencies": {}};
   
    for(let dep in jsonExample.jspm.dependencies){
        const splitVersion = jsonExample.jspm.dependencies[dep].split('@');
        let depName='';
        const gitOrNpm = splitVersion[0].split(':')
        if(gitOrNpm[0] == 'npm'){
          depName = gitOrNpm[1];
        }else{
          depName = dep 
        }
        const depVersion = splitVersion[1]; 
   
        jsonEmpty.dependencies[depName] = depVersion;
    }
////////////////////////////////////////////////////////////////////////
    if(flags.dev){
      jsonEmpty["devDependencies"] = {};
      for(let dep in jsonExample.jspm.devDependencies){
        const splitVersion = jsonExample.jspm.devDependencies[dep].split('@');
          
        let depName='';
        const gitOrNpm = splitVersion[0].split(':');
        
        if(gitOrNpm[0] == 'npm'){
          depName = gitOrNpm[1];
        }else{
          depName = dep 
        }
        const depVersion = splitVersion[1]; 
   
        jsonEmpty.devDependencies[depName] = depVersion;
      }
    }
   
    console.log(jsonEmpty);
  }

}
export = JspmToNpmConvertor