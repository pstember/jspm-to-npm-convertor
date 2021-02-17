import {Command, flags} from '@oclif/command'
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
    const jsonExample: any = {
                      "jspm": {
                        "directories": {
                          "baseURL": "app"
                        },
                        "devDependencies": {
                          "babel": "npm:babel-core@^5.8.24",
                          "babel-runtime": "npm:babel-runtime@^5.8.24",
                          "core-js": "npm:core-js@^1.1.4"
                        },
                        "dependencies": {
                          "angular": "github:angular/bower-angular@^1.5.0",
                          "core-js": "npm:core-js@^1.1.4"
                        }
                      }
                    }
    //const jsonExample = {"jspm":{"dependencies":["npm:angular/angular-bower@^1.5.2","npm:express@4.12.4"]}};
    const jsonEmpty: any = {"dependencies": {}};
   
    for(let dep in jsonExample.jspm.dependencies){
        const splitVersion = jsonExample.jspm.dependencies[dep].split('@');
        console.log(splitVersion);
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
        console.log(gitOrNpm);
        if(gitOrNpm[0] == 'npm'){
          depName = gitOrNpm[1];
          console.log(depName);
        }else{
          depName = dep 
        }
        const depVersion = splitVersion[1]; 
   
        jsonEmpty.devDependencies[depName] = depVersion;
      }
    }
   
    console.log('PRINT EXTRACT');
    console.log(jsonEmpty);
  }
}
export = JspmToNpmConvertor