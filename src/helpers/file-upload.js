import { fileURLToPath } from 'node:url';
import * as path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getFileName(file) {
  const imgExt = path.extname(file.name);
  const imgName = path.basename(file.name, imgExt);

  return `${imgName}_${Date.now()}${imgExt}`;
}

export async function uploadFile(file, filePath) {
  const fileName = getFileName(file);
  const uploadPath = path.join(__dirname, filePath, fileName);

  file.mv(uploadPath, (err) => {
    if (err) throw err;
  });

  return fileName;
}
