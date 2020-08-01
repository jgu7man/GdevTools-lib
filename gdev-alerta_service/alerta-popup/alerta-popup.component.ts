import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajeAlertaModel, PreguntaAlertaModel } from '../alertas.model';

@Component({
  selector: 'gdev-alerta-popup',
  templateUrl: './alerta-popup.component.html',
  styleUrls: ['./alerta-popup.component.scss']
})
export class AlertaPopupComponent implements OnInit {

  constructor (
    public dialog: MatDialogRef<AlertaPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public alerta: MensajeAlertaModel
  ) {
   }

  ngOnInit(): void {  
  }

}
