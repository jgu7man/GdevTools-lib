export class FileImageInputModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public llamadoAccion: string,
        public placeholder?: string,
        public info?: string,
        public multiple?: boolean,
    ) {
        
    }
}