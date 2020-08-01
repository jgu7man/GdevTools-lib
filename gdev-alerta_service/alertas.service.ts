import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { MensajeAlertaModel, PreguntaAlertaModel } from './alertas.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertaPopupComponent } from './alerta-popup/alerta-popup.component';

export interface PREGUNTA {
    mensaje: string, respTrue?: string, respFalse?: string
}

export interface MENSAJE {
    mensaje: string, confirmacion?: string
}

@Injectable({ providedIn: 'root' })
export class AlertaService {
    
    mensajeAlerta$ = new Subject<MensajeAlertaModel>()
    preguntaAlerta$ = new Subject<PreguntaAlertaModel>()
    respuestaAlerta$ = new Subject<boolean>()

    

    constructor(private dialog: MatDialog) { }

    // Función que envía un mensaje de alerta
    // y espera la confirmación de la lectura del usuario
    enviarMensajeAlerta(mensaje: MensajeAlertaModel | string): Observable<any> {
        var mensajeModel: MensajeAlertaModel =
            typeof mensaje != 'string' ?  mensaje :
                new MensajeAlertaModel( mensaje, 'mensaje' )
        
        if (!mensajeModel.trueMsj) mensajeModel.trueMsj = 'aceptar'

        this.dialog.open( AlertaPopupComponent, {
            minWidth: '450px',
            data: mensajeModel,
            role:'alertdialog'
        })
        
        return this.respuestaAlerta$
    }


    // Función que envía una pregunta como alerta
    // y espera la respuesta true o false del usuario
    enviarAlertaPregunta( pregunta: MensajeAlertaModel | string ): Observable<any> {
        
        var preguntaModel: MensajeAlertaModel = 
            typeof pregunta != 'string' ? pregunta :
                new MensajeAlertaModel(pregunta, 'pregunta')

        if (!preguntaModel.trueMsj) preguntaModel.trueMsj = 'aceptar'
        if (!preguntaModel.falseMsj) preguntaModel.falseMsj = 'cancelar'
        
        this.preguntaAlerta$.next(preguntaModel)

        return this.respuestaAlerta$
    }

    

    
    

    
}