import { inject } from '@angular/core';
import { StorageReference } from 'firebase/storage';
import { from, map, of } from 'rxjs';
import { BaseTemplateComponent } from 'src/app/shared/base-template/base-template.component';
import { FileResponse, StorageService } from 'src/app/storage/storage.service';

export class BaseSnippetsComponent extends BaseTemplateComponent {
  basePath!: string;
  protected storage = inject(StorageService);
  files?: FileResponse[];
}
