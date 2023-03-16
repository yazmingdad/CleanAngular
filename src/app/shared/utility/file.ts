import {
  catchError,
  map,
  merge,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

export enum Extention {
  Png = 'PNG',
  Jpg = 'JPG',
  Jpeg = 'JPEG',
  Pdf = 'PDF',
  Xlsx = 'XLSX',
}

export enum FileReaderMethod {
  ArrayBuffer,
  Binary,
  DataUrl,
  Text,
}

export interface FileInfo {
  name: string;
  imgSrc: string;
  content: string;
  isRejected?: boolean;
  reason?: string;
}

export class FileConverter {
  private dataUrlInput$: Subject<string>;
  private fileInput$: Subject<File>;
  file$: Observable<FileInfo>;
  constructor(private extension: Extention, private method: FileReaderMethod) {
    this.dataUrlInput$ = new Subject<string>();
    this.fileInput$ = new Subject<File>();
    this.file$ = merge(
      this.dataUrlInput$.pipe(
        map((value) => {
          return {
            name: 'File',
            extension: this.extension,
            imgSrc: this.getDefaultImageSource(value),
            content: value,
          };
        })
      ),
      this.fileInput$.pipe(
        switchMap((file) => {
          const extension = file.name.split('.').pop()?.toUpperCase();
          const isAccepted = extension && extension === this.extension;
          if (isAccepted) {
            switch (this.method) {
              case FileReaderMethod.DataUrl:
                return this.ConvertFileToDataUrl(file);
              case FileReaderMethod.ArrayBuffer:
                return this.ConvertFileToArrayBuffer(file);
              case FileReaderMethod.Binary:
                return this.ConvertFileToBinary(file);
              default:
                return this.getText(file);
            }
          }

          return this.getRejected(file.name, 'extension');
        }),
        catchError((error) => this.getRejected('No File', 'upload'))
      )
    );
  }

  loadContent(data: string) {
    this.dataUrlInput$.next(data);
  }

  loadFile(file: File) {
    this.fileInput$.next(file);
  }

  private getRejected(
    fileName: string,
    reason: string = 'unknown'
  ): Observable<FileInfo> {
    return new Observable<FileInfo>((observer) =>
      observer.next({
        name: fileName,
        imgSrc: this.getDefaultImageSource(null),
        content: '',
        isRejected: true,
        reason,
      })
    );
  }

  private ConvertFileToArrayBuffer(file: File): Observable<FileInfo> {
    return new Observable<FileInfo>((observer) =>
      observer.next({
        name: 'string',
        imgSrc: 'string',
        content: 'string',
      })
    );
  }
  private ConvertFileToBinary(file: File): Observable<FileInfo> {
    return new Observable<FileInfo>((observer) =>
      observer.next({
        name: 'string',
        imgSrc: 'string',
        content: 'string',
      })
    );
  }
  private ConvertFileToDataUrl(file: File): Observable<FileInfo> {
    const reader = new FileReader();
    const fileInfo = {
      name: file.name,
      extension: this.extension,
      imgSrc: this.getDefaultImageSource(null),
      content: '',
    };

    return new Observable<FileInfo>((observer) => {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const encoded = reader.result as string;
        if (encoded) {
          fileInfo.content = encoded;
          switch (this.extension) {
            case Extention.Jpeg:
            case Extention.Jpg:
            case Extention.Png:
              fileInfo.imgSrc = encoded;
              break;
            case Extention.Pdf:
              fileInfo.imgSrc = 'assets/images/files/pdf.png';
              break;
            case Extention.Xlsx:
              fileInfo.imgSrc = 'assets/images/files/xls.png';
              break;
            default:
              fileInfo.imgSrc = 'assets/images/files/doc.png';
          }
          observer.next(fileInfo);
        } else {
          observer.error("Couldn't encode file");
        }
      };
    });
  }
  private getText(file: File): Observable<FileInfo> {
    return new Observable<FileInfo>((observer) =>
      observer.next({
        name: 'string',
        imgSrc: 'string',
        content: 'string',
      })
    );
  }

  private getDefaultImageSource(value: string | null) {
    let source = 'assets/images/no-image.png';

    if (value) {
      switch (this.extension) {
        case Extention.Png:
          return `data:image/png;base64,${value}`;
        case Extention.Jpeg:
          return `data:image/jpeg;base64,${value}`;
        case Extention.Jpg:
          return `data:image/jpg;base64,${value}`;
        case Extention.Pdf:
          return 'assets/images/files/pdf.png';
        case Extention.Xlsx:
          return 'assets/images/files/xls.png';
      }
    } else {
      switch (this.extension) {
        case Extention.Pdf:
          source = 'assets/images/files/pdf.png';
          break;
        case Extention.Xlsx:
          source = 'assets/images/files/xls.png';
          break;
      }
    }

    return source;
  }
}
