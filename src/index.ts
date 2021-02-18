import {Command, flags} from '@oclif/command'
import { readFileSync, writeFileSync } from 'fs';



const depExtractor = (file: any, depOrDevDep: string)=>{
  for(let dep in file.jspm[depOrDevDep]){ // going over devDep or dep in jspm
    const splitVrsnName = file.jspm[depOrDevDep][dep].split('@');
    
    const gitOrNpm = splitVrsnName[0].split(':')
    const depName = gitOrNpm[0] == 'npm' ? gitOrNpm[1] : dep;

    const depVersion = splitVrsnName[1]; 
    file[depOrDevDep][depName] = depVersion; //inserting dependency 
}
}

class JspmToNpmConvertor extends Command {
  static description = 'describe the command here'
  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name of output file', required: true}),
    // flag with a value (-i, --input=VALUE)
    input: flags.string({char: 'i', description: 'name of input file', required: true}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    // flag with no value (-d, --dev)
    dev: flags.boolean({char: 'd', description: 'devDependencies be imported as well'}),
  }
  
  static args = [{name: 'file'}]

  async run() {
    
    const {args, flags} = this.parse(JspmToNpmConvertor)
    const packageJson = JSON.parse(readFileSync('./'+flags.input, 'utf-8'));
    depExtractor(packageJson, "dependencies");

    if(flags.dev){ //for the devDependencies in package.json if -d was used
      depExtractor(packageJson, "devDependencies");
    }

    delete packageJson.jspm;
    writeFileSync('./'+flags.name, JSON.stringify(packageJson, null, 2));
  }  
}
export = JspmToNpmConvertor