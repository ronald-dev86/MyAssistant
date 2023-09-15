import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { TableStorageIndexedBD } from 'src/app/models/storage/table-storage-indexed-bd';
import { UUID } from 'uuid-generator-ts';

export enum Tipos_Prioridad{
  ALTA= 'alta',
  MEDIA = 'media',
  BAJA = 'baja'
}
export enum Dias_Activos{
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miercoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sabado',
  DOMINGO = 'Domingo'
}
export interface Ipage{
  show_details:boolean,
}

export interface ITareaRealizada{
  id: string,
  dia:string
}

export interface ITarea{
  id?:string
  titulo:string,
  descripcion:string,
  prioridad: Tipos_Prioridad,
  dias: Dias_Activos[],
  activa: boolean,
  realizada: boolean,
  page:Ipage
}

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private storageService: StorageService) { }

  async add(tarea: ITarea){
    const uuid = new UUID();
    let tareas = await this.storageService.get(TableStorageIndexedBD.TAREAS);
    if(tareas === null){
      tareas = []
    }
    tarea.id = uuid.getDashFreeUUID()
    tareas.push(tarea)
    await this.storageService.set(TableStorageIndexedBD.TAREAS, tareas)
  }

  async get(){
    return await this.storageService.get(TableStorageIndexedBD.TAREAS)
  }

  async update(tarea:ITarea){
    console.log(tarea)
    const lista_tareas = await this.storageService.get(TableStorageIndexedBD.TAREAS)

   const  lista_actulizada = lista_tareas.map((row:ITarea) =>{
     if (row.id === tarea.id) return tarea;
     return row
    })

    await this.storageService.set(TableStorageIndexedBD.TAREAS, lista_actulizada)
  }

  async delete(tarea: ITarea){
    const lista_Tarea = await this.storageService.get(TableStorageIndexedBD.TAREAS)
    const filter_lista_tarea = lista_Tarea.filter((row: ITarea)=> row.id !== tarea.id)
    await this.storageService.set(TableStorageIndexedBD.TAREAS, filter_lista_tarea)
    await this.deleteTareaRealizada(tarea)
  }

  async addTareaRealizada(data:ITareaRealizada){


    let lista = await this.storageService.get(TableStorageIndexedBD.TAREAS_REALIZADA);

    if (lista === null) {
      lista = []
    }

    lista.push(data)

    return await this.storageService.set(TableStorageIndexedBD.TAREAS_REALIZADA, lista)
  }

  async getTareaRealizada() {
    return await this.storageService.get(TableStorageIndexedBD.TAREAS_REALIZADA);
  }

  async deleteTareaRealizada(tarea:ITarea){
    const lista_Tarea_realizadas = await this.storageService.get(TableStorageIndexedBD.TAREAS_REALIZADA)
    const filter_lista_tarea_realizadas = lista_Tarea_realizadas.filter((row: ITarea) => row.id !== tarea.id)
    await this.storageService.set(TableStorageIndexedBD.TAREAS_REALIZADA, filter_lista_tarea_realizadas)
  }
}
