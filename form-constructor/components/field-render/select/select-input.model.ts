export interface OPCION { value: string, index: number }

export class SelectModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public opciones: OPCION[],
        public placeholder?: string,
        public info?: string,
    ) {
        
    }
}