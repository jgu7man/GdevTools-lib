import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileImageInputModel } from './file-image-input.model';
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-file-image-field',
  templateUrl: './file-image.component.html',
  styleUrls: ['./file-image.component.scss']
})
export class FileImageComponent implements OnInit {

  /**
   * Espera el objeto. 
   * ```typescript 
   * class FileImageInputModel {
   * etiqueta: string //mostrada al usuario
   * ID: string //el identificador en la base de datos
   * requerido: boolean //si el campo será requerido
   * llamadoAccion: string //la leyenda dentro del botón
   * placeholder?: string //  mensaje de instrucción o ejemplo
   * info?: string, // información adicional flotante
   * multiple?: boolean // si recibe varios arichivos al mismo tiempo
   * }
   * ```
   */
  @Input() field: FileImageInputModel
  /** Recibe los valores por default del campo o precargados */  
  @Input() value
  /** Retorna el valor en forma de `string[]` de los archivos cargados */
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  imagesLoaded: any[] = []
  constructor(public main: FormConstructorService) {
    this.field = new FileImageInputModel('','',false, '')
   }

  ngOnInit() {
    $('body')
  }

  onFileSelected( files ) {
    var images = files.target.files 

    Object.keys( images ).forEach( image => {
      if ( image != 'length' ) {

        var reader = new FileReader()
        reader.onload = () => {
          var img: any;
          img = document.getElementById( images[image].name )
          img.src = reader.result
        }
        reader.readAsDataURL( images[ image ] )
        this.imagesLoaded.push( images[ image ])
      }
    })
    this.getValue.emit({key:this.field.etiqueta, value: this.imagesLoaded })
    
  }


  deleteFile(i) {
    this.imagesLoaded.splice( i, 1 )
    this.getValue.emit( { key: this.field.etiqueta, value: this.imagesLoaded })
  }

}
