const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'gallery-images');
const allFiles = fs.readdirSync(dir);

// Only include files that browsers can render as images/videos.
const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.webm']);

// Prefer supported extensions (e.g. .jpg over .heic) by filtering.
const supportedFiles = allFiles
  .filter((file) => allowedExt.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const items = supportedFiles.map((file, index) => {
  const name = path.parse(file).name;
  const caption = name.replace(/[_\.]/g, ' ').trim();
  return `  { id: ${index + 1}, src: '/gallery-images/${file}', caption: '${caption}' },`;
});

const output = ['// GENERATED - do not edit by hand', 'export interface GalleryItem {', '  id: number;', '  src: string;', '  caption: string;', '}', '', 'export const galleryItems = [', ...items, '];'].join('\n');
console.log(output);
