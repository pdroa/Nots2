import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaNotaPage } from './nova-nota';

@NgModule({
  declarations: [
    NovaNotaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaNotaPage),
  ],
})
export class NovaNotaPageModule {}
