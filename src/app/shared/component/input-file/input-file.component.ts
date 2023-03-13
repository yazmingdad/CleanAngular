import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fileTypes } from 'src/app/core/constants/files';
import { FileHelper } from '../../utility/file';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent {
  @Input() label: string;
  @Input() extension: string = 'png';
  @Input() control: FormControl;

  fileName = 'File';
  imageSrc: string;

  ngOnInit() {
    this.getImageSrc(this.control.value);
  }

  getImageSrc(value: string = '') {
    if (value === '') {
      if (this.extension === 'png') {
        this.imageSrc = 'assets/images/no-image.png';
      } else {
        this.imageSrc = 'assets/images/search-doc.png';
      }
      return;
    }

    if (this.extension === 'png') {
      this.imageSrc = value;
    }
  }

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return errors;
  }

  onFileSelected(files: File[]) {
    const file = files[0];
    if (file) {
      const fileName = file.name;
      const extension = fileName.split('.').pop()?.toLocaleLowerCase();
      const isAccepted = extension && extension === this.extension;

      if (!isAccepted) {
        console.log('not accepted');
        this.control.setErrors({ extension: true });
        console.log(this.control.errors);
        return;
      }
      this.fileName = fileName;
      FileHelper.getBase64(file).subscribe({
        next: (value) => {
          this.getImageSrc(value);
          this.control.setValue(value.split(',')[1]);
          this.control.setErrors(null);
          console.log(value.split(',')[1]);
        },
        error: (value) => this.control.setErrors({ upload: true }),
      });

      //this.control.setValue('blabla');
    }
  }
}
