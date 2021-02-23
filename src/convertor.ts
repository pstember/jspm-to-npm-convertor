import { InternalError } from './lib';

export class Convertor {
    private packageJson: any;
    private jspm: any;
    private ignoreGithub: boolean;
    
    constructor(ignoreGithub: boolean){
        this.ignoreGithub = ignoreGithub;
        this.packageJson = {};
        this.jspm = {};
    }

    load(file: any) {
        // this.packageJson = file;
        if(!file.jspm){
            throw new InternalError('The input file does not contains a JSPM section') 
        }
        this.jspm = file.jspm;
        this.packageJson.name = file.name;
        this.packageJson.version = file.version;
        this.packageJson.description = file.description;
        this.packageJson.dependencies = file.dependencies;
        this.packageJson.devDependencies = file.devDependencies;

    }

    convert(depOrDevDep: string) {
        for(const dep in this.jspm[depOrDevDep]){ // going over devDep or dep in jspm
            
            const regex = /(?<dependency>@?[\w]*\/?[\w|\-|\.]+)@(?<version>[^|~][\d|\.]+)/;
            const found = this.jspm[depOrDevDep][dep].match(regex); //this give us the name(if npm is the registry) and version

            if( found.groups.dependency == '' || found.groups.version == ''){
                throw new InternalError('The following dependency could not be parse properly: ' + dep);
            } else{
                // we identify if we have a npm or github origin
                const gitOrNpm = this.jspm[depOrDevDep][dep].split(':')

                if( gitOrNpm[0] == 'npm' ){
                    this.packageJson[depOrDevDep][found.groups.dependency] = found.groups.version; //inserting dependency     
                } else if( !this.ignoreGithub ){
                    this.packageJson[depOrDevDep][dep] = found.groups.version; //inserting dependency 
                }                                
            }
          }
    }

    extract() : any {
        return this.packageJson;
    }

  }