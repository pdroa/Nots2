import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarNotaPage } from './editar-nota';

@NgModule({
  declarations: [
    EditarNotaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarNotaPage),
  ],
})
export class EditarNotaPageModule {}
