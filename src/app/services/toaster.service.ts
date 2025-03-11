import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(public msgService: MessageService) {}

  successToaster(detail: string) {
    this.msgService.add({
      severity: 'success',
      summary: 'Success',
      detail: detail,
    });
  }

  errorToaster(detail: string) {
    this.msgService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail,
    });
  }

}
