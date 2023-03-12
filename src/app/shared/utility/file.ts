import { Observable, ReplaySubject } from 'rxjs';

export class FileHelper {
  static getBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const encoded = reader.result as string;
      if (encoded) {
        result.next(encoded);
      } else {
        result.error("Couldn't encode file");
      }
    };
    reader.onerror = (error) => result.error("Couldn't encode file");
    return result;
  }

  static getArrayBuffer(file: File): Observable<ArrayBuffer> {
    const result = new ReplaySubject<ArrayBuffer>(1);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      if (arrayBuffer) {
        result.next(arrayBuffer);
      } else {
        result.error("Couldn't load file");
      }
    };
    reader.onerror = (error) => result.error("Couldn't load file");
    return result;
  }

  static stripExtension(encoded: string) {}
}
