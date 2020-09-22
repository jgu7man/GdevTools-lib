import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../../../alerts/alert.service';

@Component({
  selector: 'gdev-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent implements OnInit {

  @Input() displayAction: string
  @Input() folder: string
  @ViewChild('imagePreview') public imagePreview: ElementRef

  imgPreview: any[] = []
  imageLoadPercent: number
  image: imageEl

  @Output() imageURL: EventEmitter<imageEl> = new EventEmitter()

  constructor (
    private storage: AngularFireStorage,
    private _alerta: AlertService
  ) { }

  ngOnInit(): void {
    if ( !this.displayAction ) this.displayAction = 'Cargar'
    if ( !this.folder ) this._alerta.sendMessageAlert( 'falta agregar un folder' )
  }

  onFileSelected( files ) {
    var image = files.target.files[0]
      var reader = new FileReader()
      reader.onload = () => {
        var img: any;
        img = document.getElementById('imagePreview' )
        img.src = reader.result
      }
    reader.readAsDataURL( image )
    this.uploadStorage(image)
  }

  async uploadStorage(file) {
    const
      path = `${this.folder}/${ file.name }`,
      ref = this.storage.ref( path ),
      task = this.storage.upload( path, file );

    await task.percentageChanges().subscribe( res => {
      return this.imageLoadPercent = res
    } )

    await task.snapshotChanges().pipe(
      finalize( async () => {
        await ref.getDownloadURL()
          .subscribe( res => {
            this.image = { url: res, alt: file.name }
            this.imageURL.emit( this.image )
          } )
        return
      } )
    ).subscribe()
  }

  deleteFile(  ) {
    this.imagePreview.nativeElement().src = ''
    this.storage.storage.refFromURL(this.image.url).delete()
  }

}

export interface imageEl {
  url: string,
  alt?: string
}