import { fileURLToPath } from 'node:url';
import { dirname, join, extname, basename } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getFileName(file) {
  const imgExt = extname(file.name);
  const imgName = basename(file.name, imgExt);

  return `${imgName}_${Date.now()}${imgExt}`;
}

export async function uploadFile(file, path) {
  const fileName = getFileName(file);
  const uploadPath = join(__dirname, path, fileName);

  file.mv(uploadPath, (err) => {
    if (err) throw err;
  });

  return fileName;
}
