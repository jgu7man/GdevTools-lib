import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { MessageAlertModel, PreguntaAlertaModel } from './alerts.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertaPopupComponent } from './alerta-popup/alerta-popup.component';


@Injectable({ providedIn: 'root' })
export class AlertService {
    
    messageAlert$ = new Subject<MessageAlertModel>()
    requestAlert$ = new Subject<MessageAlertModel>()
    responseAlert$ = new Subject<boolean>()

    

    constructor(private dialog: MatDialog) { }

    // Función que envía un mensaje de alerta
    // y espera la confirmación de la lectura del usuario
    sendMessageAlert(message: MessageAlertModel | string): Observable<any> {
        var msgModel: MessageAlertModel =
            typeof message != 'string' ?  message :
                new MessageAlertModel( message, 'mensaje' )
        
        if (!msgModel.trueMsg) msgModel.trueMsg = 'aceptar'

        this.dialog.open( AlertaPopupComponent, {
            minWidth: '450px',
            data: msgModel,
            role:'alertdialog'
        })
        
        return this.responseAlert$
    }


    // Función que envía una pregunta como alerta
    // y espera la respuesta true o false del usuario
    sendRequestAlert( request: MessageAlertModel | string ): Observable<any> {
        
        var preguntaModel: MessageAlertModel = 
            typeof request != 'string' ? request :
                new MessageAlertModel(request, 'pregunta')

        if (!preguntaModel.trueMsg) preguntaModel.trueMsg = 'aceptar'
        if (!preguntaModel.falseMsg) preguntaModel.falseMsg = 'cancelar'
        
        this.requestAlert$.next(preguntaModel)

        return this.responseAlert$
    }

    

    
    

    
}