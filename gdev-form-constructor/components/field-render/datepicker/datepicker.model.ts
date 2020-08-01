export class DatepickerModel {
    constructor(
        public etiqueta: string,
        public ID: string,
        public placeholder?: string,
        public info?: string
    ) {
        
    }
}

export interface DateTime {
    year: number,
    month: number,
    day: number,
    hour: number,
    min: number,
}