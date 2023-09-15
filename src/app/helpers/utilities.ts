import { IListaTarea } from "../pages/tareas/tareas.page"
import { Dias_Activos, ITarea, Tipos_Prioridad } from "../services/tareas/tareas.service"

export class Utilities {

  static hoyEs(): Dias_Activos {

    const ordenDias = this.listaDias()
    const day = new Date().getDay().toLocaleString()

    return ordenDias[Number(day)]
  }

  static listaDias(): Dias_Activos []{
    return [
      Dias_Activos.DOMINGO,
      Dias_Activos.LUNES,
      Dias_Activos.MARTES,
      Dias_Activos.MIERCOLES,
      Dias_Activos.JUEVES,
      Dias_Activos.VIERNES,
      Dias_Activos.SABADO
    ]
  }

  static tareasDeHoy(listaTareas:ITarea[]): IListaTarea{
    let lista_Tarea: IListaTarea

    const hoy = this.hoyEs()

    if (!listaTareas) return {hoy:[], ignorar:[]}

    lista_Tarea = listaTareas.reduce((acc: any, item: any) => {

      if (item.dias.length === 1) {
        if (hoy === item.dias[0]) {
          acc.hoy.push(item);
          return acc
        }
      }
      if (item.dias.length > 1) {
        const find = item.dias.find((row: any) => row === hoy)
        console.log(find)
        if (find) {
          acc.hoy.push(item);
          return acc
        }
      }
      acc.ignorar.push(item);
      return acc;
    }, { hoy: [], ignorar: [] });

    return lista_Tarea
  }

  static listaPrioridades():Tipos_Prioridad[]{
    return [
      Tipos_Prioridad.ALTA,
      Tipos_Prioridad.MEDIA,
      Tipos_Prioridad.BAJA
    ]
  }

  static fecha(): string{
    const fecha = new Date().toISOString().split('T')
    return fecha[0]
  }
}