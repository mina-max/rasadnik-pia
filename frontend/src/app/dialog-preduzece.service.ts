import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './PreduzeceStrana/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogPreduzeceService {

  constructor(private Dialog: MatDialog) { }

  openConfirmDialog() {
    return this.Dialog.open(ConfirmDialogComponent, {
      width: '270px',
      disableClose: true
    });
  }
}
