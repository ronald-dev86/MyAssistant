import { Component, OnInit } from '@angular/core';
import { AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { Utilities } from 'src/app/helpers/utilities';
import { Dias_Activos, ITarea, TareasService, Tipos_Prioridad } from 'src/app/services/tareas/tareas.service';

export interface IListaTarea {
  hoy:ITarea[],
  ignorar:ITarea[]
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  lista_Tarea: IListaTarea = {hoy:[], ignorar:[]}
  tarea: ITarea = {
    titulo: "",
    descripcion: "",
    activa: true,
    prioridad: Tipos_Prioridad.MEDIA,
    realizada:false,
    dias: [Utilities.hoyEs()],
    page: {
      show_details: false
    }
  }

  constructor(
    private tareasService: TareasService,
    private alertController:AlertController) {
   }

  async ngOnInit() {
    const listaTareas = await this.tareasService.get()
    this.lista_Tarea = Utilities.tareasDeHoy(listaTareas)
  }


  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  async borrarTarea(tarea: ITarea) {
    await this.tareasService.delete(tarea)
    const listaTareas = await this.tareasService.get()
    this.lista_Tarea = Utilities.tareasDeHoy(listaTareas)
  }

  async nuevaTarea(){
    const alert = await this.alertController.create({
      header:"Crear nueva tarea",
      inputs: [
        {
          placeholder: 'Titulo'
        },
        {
          type: 'textarea',
          placeholder: 'descripcion de la tarea',
        },
      ],
      buttons: [
        {
          text: "Ok",
          handler: async (value: any) => {
            this.tarea.titulo = value[0]
            this.tarea.descripcion = value[1]
            await this.tareasService.add(this.tarea)
            const listaTareas = await this.tareasService.get()
            this.lista_Tarea = Utilities.tareasDeHoy(listaTareas)
          }
        }
      ]
    })
    alert.present()
  }

  async actualizarTarea(tarea:ITarea){
    await this.tareasService.update(tarea)
    const listaTareas = await this.tareasService.get()
    this.lista_Tarea = Utilities.tareasDeHoy(listaTareas)
  }





}
