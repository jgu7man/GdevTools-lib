import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileInputModel } from './file-input.model';
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-file-field',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() field: FileInputModel
  @Input() value
  @Output() getValue: EventEmitter<any[]> = new EventEmitter()
  filesLoaded: any[] = []
  constructor(public main: FormConstructorService) {
    this.field = new FileInputModel('','',false, '')
   }

  ngOnInit() {
  }

  onFileSelected( files ) {
    
    var files = files.target.files

    Object.keys( files ).forEach( file => {
      if ( file != 'length' ) {
        this.filesLoaded.push( files[ file ] )
      }
    })
    this.getValue.emit( this.filesLoaded )
    
  }

  deleteFile( i ) {
    this.filesLoaded.splice( i, 1 )
    this.getValue.emit( this.filesLoaded )
  }
}
