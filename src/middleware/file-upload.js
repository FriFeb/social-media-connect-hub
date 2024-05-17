import { fileURLToPath } from 'node:url';
import { dirname, join, extname, basename } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getFileName(file) {
  const imgExt = extname(file.name);
  const imgName = basename(file.name, imgExt);

  return `${imgName}_${Date.now()}${imgExt}`;
}

export function uploadFile(file) {
  const uploadPath = join(__dirname, '/../static/images', getFileName(file));

  file.mv(uploadPath, (err) => {
    // if (err) return res.status(500).send(err);
    return err;
  });

  console.log('File uploaded successfully!');
}
