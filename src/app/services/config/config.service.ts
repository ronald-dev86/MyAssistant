import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { TableStorageIndexedBD } from 'src/app/models/storage/table-storage-indexed-bd';


export interface IconfigItem{
  key: keyConfig,
  value:any
}

export enum keyConfig{
  COLOR_SCHEME_DARK = 'color-scheme-dark'
}


@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor(private storageService: StorageService) { }

  async add(item: IconfigItem){
    let config = await this.storageService.get(TableStorageIndexedBD.CONFIG)

    if(config === null){
      config = new Object()
    }

    config[item.key] = item.value;
    await this.storageService.set(TableStorageIndexedBD.CONFIG, config)

  }

  async find(key: keyConfig) {
    const config = await this.storageService.get(TableStorageIndexedBD.CONFIG)

    if(config === null) return undefined;
    return config[key]
  }
}
