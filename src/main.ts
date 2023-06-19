import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.prod) {
  enableProdMode();
}

import { Bootstrapper } from './bootstrapper';
const bootstrapApp = function(): void {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {})
    .catch(err => console.error(err));
};

const bootstrapper = new Bootstrapper(bootstrapApp);
bootstrapper.startup();