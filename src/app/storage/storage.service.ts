import { Injectable, inject } from '@angular/core';
import { getStorage, ref, listAll, StorageReference, getDownloadURL, getBlob } from "firebase/storage";
import { app } from '../api/api.service';
import { forkJoin, from, lastValueFrom, map, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const stylesheetsPath = 'stylesheets'

export interface FileResponse {
  url: string;
  text: string;
  name?: string;
  showText?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private https = inject(HttpClient)

  constructor() { }

  storage = getStorage(app);

  files?: any[];

  async toFileList(files: StorageReference[]) {
    console.log(JSON.stringify(files[0], null, 2));
    return await lastValueFrom(
      forkJoin(files.map(x => this.getFileResponseData(x)))
    );
  }

  private async getFileResponseData(data: StorageReference) {
    const url = await getDownloadURL(ref(this.storage, data.fullPath));
    const text = await (await this.readFile(url)).text();
    return<FileResponse> {
      url,
      text,
      name: data.name
    }
  }

  async readFile(url: string) {
    return await getBlob(ref(this.storage, url))
  }

  async getStyleSheetSnippets() {
    return await this.getSnippets(stylesheetsPath);
  }

  async getSnippets(path: string) {
    // Create a reference under which you want to list
    const listRef = ref(this.storage, 'snippets/' + path);
    // Find all the prefixes and items.
    try {
      const res = await listAll(listRef);
      return res.items;
    } catch (error) { }
    return undefined;
  }

}
