import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaComponent } from './tarea.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';




@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [TareaComponent],
  exports:[TareaComponent]
})
export class TareaComponentModule { }
