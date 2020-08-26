export const FieldTypes:FieldTYPE[] = [
    { type: 'text', displayName: 'Texto' },
    { type: 'email', displayName: 'Email' },
    { type: 'password', displayName: 'Constraseña' },
    { type: 'phone', displayName: 'Teléfono' },
    { type: 'number', displayName: 'Número' },
    { type: 'textarea', displayName: 'Parrafo' },
    { type: 'select', displayName: 'Menu de opciones' },
    { type: 'tags', displayName: 'Etiquetas' },
    { type: 'radius', displayName: 'Opciones' },
    { type: 'multiple', displayName: 'Opciones múltiples' },
    { type: 'checkbox', displayName: 'Casilla de verificacion' },
    { type: 'switch', displayName: 'Activado/Desactivado' },
    { type: 'range', displayName: 'Rango' },
    { type: 'level', displayName: 'Nivel' },
    { type: 'date', displayName: 'Fecha' },
    { type: 'time', displayName: 'Hora' },
    { type: 'file', displayName: 'Archivo' },
    { type: 'images', displayName: 'Imagen(es)' },
]

export interface FieldTYPE {
    type: string,
    displayName: string
}