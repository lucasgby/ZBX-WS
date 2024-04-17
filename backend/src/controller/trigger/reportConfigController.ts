import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

import PDFMake from 'pdfmake';

import { templatePDF } from "../../template/reportTemplate";
import { converterTimestamp } from "../../utils";

import { loadTrigger } from "./loadTrigger";
import { fonts } from "../../template/font.pdf";

interface SaveReportProps {
  groupid: number,
  lastChangeSince: string,
  lastChangeTill: string,
  title: string
}

async function sendReport({ groupid, lastChangeSince, lastChangeTill, title }: SaveReportProps) {
  const dateSice = converterTimestamp(lastChangeSince);
  const dateTill = converterTimestamp(lastChangeTill);

  let configSubTitle = `${dateSice} á ${dateTill}`

  const loadInfo = await loadTrigger({ groupId: groupid, lastChangeSince, lastChangeTill });
  
  const pdf = templatePDF({ subtitle: configSubTitle, descriptionHeader: title, topTrigger: loadInfo.topTriggers, triggerHost: loadInfo.triggers });
  
  const pdfMake = new PDFMake(fonts);

  const pdfDoc = pdfMake.createPdfKitDocument(pdf);
  const uuid = uuidv4();

  pdfDoc.pipe(fs.createWriteStream(`./reports/${uuid}.pdf`));

  pdfDoc.end();

  return `${uuid}.pdf`;
}

export { sendReport };