import { CheckboxModel } from '../field-render/checkbox/checkbox.model';
import { TagsModel } from '../field-render/etiquetas/etiquetas.model';
export class FieldModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public tipo: string,
        public requerido: boolean,
        public estado: 'nuevo' | 'guardado' | 'edit' | 'editID' | 'deleted',
        public oculto?: boolean,
        public errorMsg?: string,
        public placeholder?: string,
        public info?: string,
        public index?: number,
        // Select, checkbox, multiple
        public opciones?: any[],
        // Etiquetas
        public tags?: string[],
        // File, Images
        public llamadoAccion?: string,
        public multiple?: boolean,
        // Level, Number
        public minCant?: number,
        public maxCant?: number,
        // Level
        public minText?: string,
        public maxText?: string,
        public oldID?: string
    ) {
        
    }
}

