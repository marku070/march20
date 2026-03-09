const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'gallery-images');
const files = fs.readdirSync(dir).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const items = files.map((file, index) => {
  const name = path.parse(file).name;
  const caption = name.replace(/[_\.]/g, ' ').trim();
  return `  { id: ${index + 1}, src: '/gallery-images/${file}', caption: '${caption}' },`;
});

const output = ['// GENERATED - do not edit by hand', 'export const galleryItems = [', ...items, '];'].join('\n');
console.log(output);
