export class LevelModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public minCant: number,
        public maxCant: number,
        public minText?: string,
        public maxText?: string,
        public info?: string
    ) {
        
    }
}