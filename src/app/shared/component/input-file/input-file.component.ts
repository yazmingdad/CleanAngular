import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { fileTypes } from 'src/app/core/constants/files';
import {
  Extention,
  FileInfo,
  FileConverter,
  FileReaderMethod,
} from '../../utility/file';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent {
  @Input() label: string;
  @Input() extension: string = Extention.Png;
  @Input() method: FileReaderMethod = FileReaderMethod.DataUrl;
  @Input() control: FormControl;

  loader$: FileConverter;

  fileName = 'File';
  imageSrc: string;

  ngOnInit() {
    this.loader$ = new FileConverter(
      this.extension.toUpperCase() as Extention,
      this.method
    );

    this.loader$.file$.subscribe((fileInfo: FileInfo) => {
      const { name, imgSrc, isRejected, reason } = fileInfo;

      this.fileName = name;
      this.imageSrc = imgSrc;

      if (isRejected) {
        if (reason === 'extension') {
          this.control.setErrors({ extension: true });
        } else {
          this.control.setErrors({ unknown: true });
        }
      } else {
        this.control.setErrors(null);
        this.control.setValue(fileInfo.content);
      }
    });

    this.loader$.loadContent(this.control.value);
  }

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return errors;
  }

  onFileSelected(files: File[]) {
    const file = files[0];
    this.loader$.loadFile(file);
  }
}
