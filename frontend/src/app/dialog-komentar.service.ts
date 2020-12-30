import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { KomentarComponent } from './PoljoprivrednikStrana/komentar/komentar.component';

@Injectable({
  providedIn: 'root'
})
export class DialogKomentarService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog() {
    return this.dialog.open(KomentarComponent, {
      width: '400px',
      height:'auto',
      disableClose: true
    })
  }

}
