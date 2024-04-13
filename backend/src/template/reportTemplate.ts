import { TDocumentDefinitions } from "pdfmake/interfaces";
import { ReportResult, TopTriggerResult } from "../model/report";

interface PDFProps {
  descriptionHeader: string,
  subtitle: string;
  triggerHost: ReportResult;
  topTrigger: TopTriggerResult
}

const templatePDF = ({ subtitle, descriptionHeader, triggerHost, topTrigger }: PDFProps) => {
  const pdf: TDocumentDefinitions = {
    content: [
      { text: 'RELATÓRIO', style: 'header' },

      { text: descriptionHeader, style: 'titleTable' },
      { text: subtitle, style: 'subtitle' },

      triggerHost.result.map((value) => [
        {
          columns: [
            { text: value.header.title, width: 'auto', style: 'titleTableTrigger'},
            { text: `${value.header.quantity}`, style: 'titleTableTrigger' },
          ],
          columnGap: 20,
        },
        {
          layout: 
          {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
            defaultBorder: false
          },

          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto'],

            body: [
              [
                { text: 'Tigger', style: 'headerTypeTrigger' },
                { text: 'Host', style: 'headerTypeTrigger' },
                { text: 'horario', style: 'headerTypeTrigger' },
              ],

              ...value.hosts
            ],
          },
        }
      ]),

      [
        { text: 'QUANTIDADE DE EVENTOS POR HOSTS', style: 'titleTableHost' },

        {
          layout: 'lightHorizontalLines',

          table: {
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              [
                { text: 'Evento', style: 'columnTitle'},
                { text: 'Host', style: 'columnTitle' },
                { text: 'Prioridade', style: 'columnTitle' },
                { text: 'Quantidade', style: 'columnTitle'},
              ],
              
              ...topTrigger.result

            ]
          },

        },
      ]
    ],

    defaultStyle: {
      font: 'Helvetica'
    },

    styles: {
      header: {
        fontSize: 28,
        bold: true,
        marginBottom: 20,
        italics: true,
        alignment: 'center',
      },

      headerTypeTrigger: {
        fillColor: '#F37016', 
        color: '#FFF', 
        bold: true,
        margin: 4
      },

      titleTable: {
        fontSize: 18,
        color: '#2E2E2E',
      },

      subtitle: {
        bold: true,
        fontSize: 12,
        marginBottom: 6,
        marginTop: 2
      },

      columnTitle: {
        bold: true,
        fontSize: 14,
        fillColor: '#02A0B9',
        color: '#FFF',
        margin: 4
      },

      titleTableTrigger: {
        bold: true,
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5
      },

      titleTableHost: {
        bold: true, 
        alignment: 'center', 
        marginTop: 16, 
        marginBottom: 6
      },

      quantityIncident: {
        bold: true,
        alignment: 'center'
      },

      valueTable: {
        margin: 4
      },
      
      disaster: {
        color: '#FFF',
        bold: true,
        fillColor: '#FF2D2D',
        alignment: 'center'
      },

      notClassified: {
        color: '#FFF',
        bold: true,
        fillColor: '#97AAB3',
        alignment: 'center'
      },

      information: {
        color: '#FFF',
        bold: true,
        fillColor: '#7499FF',
        alignment: 'center'
      },

      warning: {
        color: '#FFF',
        bold: true,
        fillColor: '#FFC859',
        alignment: 'center',
      },

      average: {
        color: '#FFF',
        bold: true,
        fillColor: '#FFA059',
        alignment: 'center'
      },

      high: {
        color: '#FFF',
        bold: true,
        fillColor: '#E97659',
        alignment: 'center'
      },
    }
  }

  return pdf;
};

export { templatePDF };