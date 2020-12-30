import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-komentar',
  templateUrl: './komentar.component.html',
  styleUrls: ['./komentar.component.css']
})
export class KomentarComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private ref: MatDialogRef<KomentarComponent>) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      ocena: ['', Validators.required, Validators.min(1), Validators.max(10)],
      kom: ['', Validators.required]
    })
  }
  fg: FormGroup;
  
  posalji() {
    if(this.fg.value.kom == "" || this.fg.value.ocena == "" ||
    this.fg.value.ocena < 1 || this.fg.value.ocena > 10) return;
    this.ref.close(this.fg.value)
  }

}

/*interface kom{
    ocena: any,
    koment: any
  };*/