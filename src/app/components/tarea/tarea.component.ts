import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Utilities } from 'src/app/helpers/utilities';
import { Dias_Activos, ITarea, ITareaRealizada, TareasService, Tipos_Prioridad } from 'src/app/services/tareas/tareas.service';

@Component({
  selector: 'item-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss'],
})
export class TareaComponent  implements OnInit {
  @Output()
  deleteTarea = new EventEmitter()
  @Output()
  updateTarea = new EventEmitter()

  @Input()
  data!: ITarea;

  realizada!: boolean;

  constructor(
    private alertController: AlertController,
    private tareasService: TareasService
    ) { }

  async ngOnInit() {
    this.realizada = await this.estaRealizada()
  }

  showDetails(tarea: ITarea) {
    if ('page' in tarea === true) {
      tarea.page = { show_details: !tarea.page?.show_details };
    }

    if ('page' in tarea === false) {
      tarea.page = { show_details: true };
    }
    this.data = tarea
    this.updateTarea.emit(this.data)
  }

  getLabelDays(dias: any[]): any {

    let respuesta: string;

    const hoy = Utilities.hoyEs()

    if (dias.length === 1) {
      if (hoy === dias[0]) {
        respuesta = "solo por hoy"
        return respuesta
      }
      respuesta = dias[0]
      return respuesta

    }

    if (dias.length > 1) {
      respuesta = dias.toString()
      return respuesta
    }

    respuesta = "Seleccione un dia"
    return respuesta


  }
  async onDeleteTarea() {
    this.deleteTarea.emit(this.data)
  }

  async prioridad(){
    const lista_prioridad = Utilities.listaPrioridades()
    let inputsDinamic: any[] = []
    for (let index = 0; index < lista_prioridad.length; index++) {
      inputsDinamic.push({
        label: lista_prioridad[index],
        type: 'radio',
        value: lista_prioridad[index],
        checked: this.data.prioridad === lista_prioridad[index] ? true:false
      },)

    }
    const alert =  await this.alertController.create({
      header:"Seleccionar una prioridad",
      inputs: inputsDinamic,
      buttons: [
        {
          text: "Ok",
          handler: async (value: any) => {
            this.data.prioridad = value
            this.updateTarea.emit(this.data)
          }
        }
      ]
    })
    alert.present()
  }

  async seleccionarDias(){
    const lista_dias = Utilities.listaDias()
    let inputsDinamic: any[] = []
    for (let index = 0; index < lista_dias.length; index++) {
      const find = this.data.dias.filter((row: Dias_Activos) => row === lista_dias[index]).length
      inputsDinamic.push({
        label: lista_dias[index],
        type: 'checkbox',
        value: lista_dias[index],
        checked: find === 1 ? true : false
      },)

    }

    const alert = await this.alertController.create({
      header: "Seleccionar uno o mas dias",
      inputs: inputsDinamic,
      buttons: [
        {
          text: "Ok",
          handler: async (value: any) => {
            this.data.dias = value
            this.updateTarea.emit(this.data)
          }
        }
      ]
    })

    alert.present()
  }

  toggleChange($event: any){
    this.data.activa = $event.detail.checked
    this.updateTarea.emit(this.data)
  }

  async estaRealizada() {
    const lista_tareas_realizada = await this.tareasService.getTareaRealizada()
    if (lista_tareas_realizada === null) return false;
    const find = lista_tareas_realizada.filter((row:ITareaRealizada) => row.id === this.data.id  &&  row.dia === Utilities.fecha() ).length
    return find === 0 ? false: true
  }

  async tareaRealizada(){
    const id: any = this.data.id
    await this.tareasService.addTareaRealizada({ id: id, dia: Utilities.fecha() })
    this.realizada = await this.estaRealizada()
  }

}
