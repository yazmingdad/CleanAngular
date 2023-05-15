import { Report, Reporter } from 'src/app/shared/utility/reporter';
import { MissionCard } from '../schema/mission';

export class MissionOrder extends Reporter<MissionCard> {
  protected override CreateReport(): Report {
    let docDefinition = {
      content: [
        {
          canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 },
          ],
        },
        {
          layout: 'noBorders', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [50, 400],

            body: [
              [
                {
                  image:
                    'data:image/png;base64,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',
                  width: 50,
                },
                {
                  text: 'The Clean Corporation',
                  fontSize: 20,
                  alignment: 'center',
                  bold: true,
                  margin: [0, 10, 0, 10],
                },
              ],
            ],
          },
        },
        {
          canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 },
          ],
        },

        {
          text: 'Mission Order',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 40, 0, 10],
        },
        {
          text: this.input.title,
          fontSize: 14,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10],
        },
        {
          layout: 'noBorders', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [100, 'auto'],

            body: [
              [
                {
                  text: 'Mission details',
                  style: 'sectionHeader',
                },
                '',
              ],
              [{ text: 'Department', bold: true }, this.input.department.name],
              [{ text: 'Code', bold: true }, this.input.code],
              [{ text: 'Departure', bold: true }, this.input.startCity.name],
              [
                { text: 'Start Date', bold: true },
                this.input.startDate.toString().substring(0, 10),
              ],
              [
                { text: 'End Date', bold: true },
                this.input.endDate.toString().substring(0, 10),
              ],
            ],
          },
        },
        {
          text: 'Participants',
          style: 'sectionHeader',
        },
        {
          // to treat a paragraph as a bulleted list, set an array of items under the ul key
          ul: [
            ...this.input.participants.map((p) => {
              return { text: p.fullName, bold: true };
            }),
          ],
        },
        {
          text: 'Destinations',
          style: 'sectionHeader',
        },
        {
          // for numbered lists set the ol key
          ol: [
            ...this.input.destinations.map((d) => {
              return { text: d.name, bold: true };
            }),
          ],
        },
        {
          text: 'Description',
          style: 'sectionHeader',
        },
        {
          text: this.input.description,
        },
        {
          text: 'Validated',
          fontSize: 12,
          bold: true,
          alignment: 'center',
          margin: [0, 15, 0, 15],
        },
        {
          qr: 'Validated',
          alignment: 'center',
          fit: '80',
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };

    return docDefinition;
  }
}
