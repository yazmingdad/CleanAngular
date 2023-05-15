import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface Report {
  content: any;
  styles: any;
}
export abstract class Reporter<T> {
  constructor(protected input: T) {
    console.log('inner input', this.input);
  }

  protected abstract CreateReport(): Report;
  public OpenReport(): void {
    // Call the factory method to create a Product object.
    const report = this.CreateReport();
    // do something else
    //....
    pdfMake.createPdf(report).open();
  }
  public DownloadReport(title: string): void {
    // Call the factory method to create a Product object.
    const report = this.CreateReport();
    // do something else
    //....
    pdfMake.createPdf(report).download(title);
  }
}
