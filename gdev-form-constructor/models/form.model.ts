export class FormModel {
    constructor(
        public nombre: string,
        public collection: string,
        public fields: any,
        public path?: string,
        public atributes?: {},
        public id?: string,
    ){}
}
