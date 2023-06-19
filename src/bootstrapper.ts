import * as file from 'zone.js/dist/zone.min.js';

export class Bootstrapper {
    constructor(
      private bootstrapFunction: (bootstrapper: Bootstrapper) => void
    ) {}
  
    /**
     * Before bootstrapping the app, we need to determine if Zone has already
     * been loaded and if not, load it before bootstrapping the application.
     */
    startup(): void {
      console.log('NG: Bootstrapping app...');
  
      if (!window['Zone']) {
        // we need to load zone.js
        console.group('Zone: has not been loaded. Loading now...');
        // This is the minified version of zone
        const zoneFile = file;
  
        const filesToLoad = zoneFile;

        console.log(zoneFile);
  
        const req = window['require'];
        if (typeof req !== 'undefined') {
          req(filesToLoad);
        } else {
          let sequence: Promise<any> = Promise.resolve();
          filesToLoad.forEach((file: string) => {
            sequence = sequence.then(() => {
              return this.loadScript(file);
            });
          });
  
          sequence.then(
            () => {
              this.bootstrapFunction(this);
              console.groupEnd();
            },
            (error: any) => {
              console.error('Error occurred loading necessary files', error);
              console.groupEnd();
            }
          );
        }
      } else {
        // zone already exists
        this.bootstrapFunction(this);
      }
    }
  
    /**
     * Loads a script and adds it to the head.
     * @param fileName
     * @returns a Promise that will resolve with the file name
     */
    loadScript(fileName: string): Promise<any> {
      return new Promise(resolve => {
        console.log('Zone: Loading file... ' + fileName);
        const script = document.createElement('script');
        script.src = fileName;
        script.type = 'text/javascript';
        script.onload = () => {
          console.log('\tDone');
          resolve(fileName);
        };
        document.getElementsByTagName('head')[0].appendChild(script);
      });
    }
  }