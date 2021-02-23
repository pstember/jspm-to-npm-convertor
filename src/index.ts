import { Command, flags } from '@oclif/command';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { CLIError } from '@oclif/errors';
import { dirname } from 'path';
import { Convertor } from './convertor';
import { CustomError } from './lib/custom-error';
import { InternalError } from './lib';

class JspmToNpmConvertor extends Command {
  static description = 'This tool is deisgned to extract the dependencies from the JSPM section to the regular section of the package.json'
  static flags = {
    // add --version flag to show CLI version
    version: flags.version({
      char: 'v',
    }),
    help: flags.help({
      char: 'h',
    }),
    output: flags.string({
      char: 'o', 
      description: 'name of output file', 
      default: "./snyk/package.json",
    }),
    input: flags.string({
      char: 'i', 
      description: 'name of input file', 
      default: "package.json",
    }),
    dev: flags.boolean({
      char: 'd', 
      description: 'devDependencies to be imported as well',
      default: false,
    }),
    ignoreGithub: flags.boolean({
      char: 'g', 
      description: 'ignore github registry based dependencies',
      default: false,
    }),
  }
  
  // static args = [] // List your argument here to be displayed in the help section
  
  async run() {
    
    const {args, flags} = this.parse(JspmToNpmConvertor)
    const convertor = new Convertor(flags.ignoreGithub);
    console.log('Conversion started');
    try {
      const file = JSON.parse(readFileSync('./' + flags.input, 'utf-8'));
      convertor.load(file);
    } catch(err){
      if(err instanceof InternalError){
        throw err;
      }else{
        throw new InternalError('Input file could not be found, please check that it exists');
      }
    }
    try{
      console.log('File has been loaded');
      
      convertor.convert('dependencies');
      if(flags.dev){ //for the devDependencies in package.json if -d was used
        convertor.convert('devDependencies');
      }
      console.log('File has been converted');
      
      const folder = dirname(flags.output);
      if (!existsSync(folder)){
        try{
          mkdirSync(folder);
        }
        catch(err){
          throw new InternalError('Snyk folder could not be created, make sure you have the right permissions first');
        }
      }
      writeFileSync(flags.output, JSON.stringify(convertor.extract(), null, 2));
      console.log('File has been saved in location: ' + flags.output);
    } catch(err) {
      console.log('An error occured');
      if( err instanceof CLIError)
      {
        const e: CLIError = err;
        console.log(e)
        this.error(e , {exit: 1});
      } else if( err instanceof CustomError){
        this.error(err, {code: err.code, exit: 1});
      }
      else{
        this.error(err, {exit: 2});
      }
    }
  }
}

export = JspmToNpmConvertor
