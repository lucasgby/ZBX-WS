import fs from "fs";
import qrCode from "qr-image";

function saveQRCode(qr: string) {
  const qr_png = qrCode.imageSync(qr, { type: 'png' });

  const filePath = './uploads/qrcode.png';

  fs.writeFileSync(filePath, qr_png);

}

function deleteQRCode() {

  fs.unlink('./uploads/qrcode.png', (error) => {
    if (error) {
      console.log("Erro ao excluir imagems.");
    }
    console.log("Imagem excluida com sucesso.");
  });

}

export {
  deleteQRCode,
  saveQRCode,
}