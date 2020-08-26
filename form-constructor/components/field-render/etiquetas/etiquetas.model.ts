export class TagsModel {
    constructor (
        public etiqueta: string,
        public ID: string,
        public requerido: boolean,
        public tags: string[],
        public info?: string
    ) {}
}