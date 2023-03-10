import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileHelper } from '../../utility/file';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent {
  @Input() extension: string = 'image';
  @Input() fileImage: string = '';
  @Input() control: FormControl;
  fileName: string;

  get imageSrc() {
    switch (this.extension) {
      case 'image':
        return this.fileImage;
      default:
        return 'assets/images/files/doc.png';
    }
  }

  onFileSelected(files: File[]) {
    const file = files[0];
    if (file) {
      this.fileName = file.name;
      
      FileHelper.getBase64(file).subscribe({
        next:(value)=> this.control.setValue(value),
        error:(value)=> this.control.setErrors({"input-file":})
      })
  
      this.control.setValue('blabla');
    }
  }
}
