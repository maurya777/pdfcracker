import fs from "fs";
import { PdfReader } from "pdfreader";

const pdfPath = process.argv[2];
fs.readFile(pdfPath, (err, pdfBuffer) => {
  // Bruteforce the password
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < (i === 3 ? 2 : 10); j++) {
      for (let k = 0; k < 2; k++) {
        for (let l = 0; l < (k === 0 ? 9 : 3); l++) {
          const password = `${i}${j}${k}${l}`;
          console.log("trying password", password);
          new PdfReader({ password }).parseBuffer(
            pdfBuffer,
            function (err, item) {
              if (item && !item.file) {
                console.log("password is", password, item);
                process.exit();
                throw new Error("Password found: " + password);
              }
            }
          );
        }
      }
    }
  }
});
