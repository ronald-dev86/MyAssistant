import { Injectable } from '@angular/core';
import { Drivers } from '@ionic/storage';
import { Storage } from '@ionic/storage-angular';
import { asyncScheduler } from 'rxjs';
import { TableStorageIndexedBD } from 'src/app/models/storage/table-storage-indexed-bd';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = this.storage
    this._storage.create()
  }

  public set(key: TableStorageIndexedBD, value: any) {
    console.log(value)
    this._storage?.set(key, value);
  }

  public async get(key: TableStorageIndexedBD) {
    return await this._storage?.get(key);
  }

  public async remove(key: TableStorageIndexedBD) {
    return await this._storage?.remove(key);
  }

  public async clear() {
    return await this._storage?.clear();
  }
}
