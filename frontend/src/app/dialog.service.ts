import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './PoljoprivrednikStrana/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private Dialog: MatDialog) { }

  openConfirmDialog() {
    return this.Dialog.open(MatConfirmDialogComponent, {
      width: '320px',
      disableClose: true,
    });
  }
}
