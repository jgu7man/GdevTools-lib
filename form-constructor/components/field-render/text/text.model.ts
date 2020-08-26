export class TextInputModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public errorMsg?: string,
        public placeholder?: string,
        public info?: string,
        public minLength?: number,
        public maxLength?: number,
    ) {
        
    }
}

export interface Colores {
    primary?: string,
    secondary?: string,
    label?: string,
    text?: string,
    background?: string
}