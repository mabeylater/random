import { Component, OnInit } from '@angular/core';
import { BaseSnippetsComponent } from '../../base-snippets/base-snippets.component';

@Component({
  selector: 'app-scss',
  templateUrl: '../../base-snippets/base-snippets.component.html'
})
export class ScssComponent extends BaseSnippetsComponent implements OnInit {
  override basePath = 'stylesheets';

  ngOnInit() {
    this.storage.getStyleSheetSnippets()
      .then(files => {
        return this.storage.toFileList(files as any)
      })
      .then(files => {
        this.files = files;
      })
  }
}
