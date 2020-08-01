export class MensajeAlertaModel {
    constructor(
        public mensaje: string,
        public type: 'mensaje' | 'pregunta',
        public confirmacion?: boolean,
        public trueMsj?: string,
        public falseMsj?: string
    ){}
}

export class PreguntaAlertaModel {
    constructor(
        public mensaje: string,
        public respTrue?: string,
        public respFalse?: string
    ){}
}