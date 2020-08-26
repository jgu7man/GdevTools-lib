export class CheckboxModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public info?: string
    ) {
        
    }
}