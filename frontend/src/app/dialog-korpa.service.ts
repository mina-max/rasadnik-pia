import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KorpaComponent } from './PoljoprivrednikStrana/korpa/korpa.component';

@Injectable({
  providedIn: 'root'
})
export class DialogKorpaService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog() {
    return this.dialog.open(KorpaComponent, {
      width: 'auto',
      height:'auto',
      disableClose:true
    })
  }
}
