export class MessageAlertModel {
    constructor(
        public message: string,
        public type: 'mensaje' | 'pregunta',
        public confirmation?: boolean,
        public trueMsg?: string,
        public falseMsg?: string
    ){}
}

export class PreguntaAlertaModel {
    constructor(
        public mensaje: string,
        public respTrue?: string,
        public respFalse?: string
    ){}
}