export class NumberFieldModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public info?: string,
        public placeholder?: string,
        public minCant?: number,
        public maxCant?: number,
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