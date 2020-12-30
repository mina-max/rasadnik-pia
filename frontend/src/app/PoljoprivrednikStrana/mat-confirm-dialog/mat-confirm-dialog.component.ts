import { Component, OnInit } from '@angular/core';
import { PoljoprivrednikService } from 'src/app/poljoprivrednik.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(private servis: PoljoprivrednikService,
    private dialogRef: MatDialogRef<MatConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

}
