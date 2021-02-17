import {Command, flags} from '@oclif/command'
import { readFileSync, writeFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
//console.log(jsonExample.dependencies);


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
   
    for(let dep in packageJson.jspm.dependencies){ //for the dependencies in package.json
        const splitVersion = packageJson.jspm.dependencies[dep].split('@');
        
        const gitOrNpm = splitVersion[0].split(':')
        const depName = gitOrNpm[0] == 'npm' ? gitOrNpm[1] : dep;

        const depVersion = splitVersion[1]; 
        packageJson.dependencies[depName] = depVersion;
    }
////////////////////////////////////////////////////////////////////////

    if(flags.dev){ //for the devDependencies in package.json if -d was used
      for(let dep in packageJson.jspm.devDependencies){
        const splitVersion = packageJson.jspm.devDependencies[dep].split('@');
          
        const gitOrNpm = splitVersion[0].split(':')
        const depName = gitOrNpm[0] == 'npm' ? gitOrNpm[1] : dep;
        
        const depVersion = splitVersion[1]; 
        packageJson.devDependencies[depName] = depVersion;
      }
    }
    delete packageJson.jspm;
    writeFileSync('./package-snyk.json', JSON.stringify(packageJson, null, 2));
  }  
}
//delete packageJson.jspm;
//console.log(packageJson);
//writeFileSync('./package-snyk.json', packageJson.toString());
export = JspmToNpmConvertor