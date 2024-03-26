import multer from "multer";
import path from "path";
import crypto from "crypto";

const MAX_SIZE_IMAGE = 5 * 1024 * 1024 // 5 MB

export const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "uploads"),
  
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {callback(err, "")}

        const filename = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, filename);
      });
    },
  }),
  limits: {
    fileSize: MAX_SIZE_IMAGE
  },
  fileFilter: (req: any, file: any, callback: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjeg",
      "image/jpj",
      "image/png",
    ];

    if(allowedMimes.includes(file.mimetype)) {
      callback(null, true); 
    } else {
      callback(new Error("Invalid file type."))
    }
  }
}