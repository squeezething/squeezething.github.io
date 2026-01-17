const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'assets/gallery');

fs.readdir(galleryDir, (err, files) => {
  if (err) {
    console.error('Error reading gallery directory:', err);
    return;
  }

  // Filter for image files
  const images = files.filter(file => /\.(jpg|jpeg|png|gif|JPG)$/i.test(file)).sort();

  let html = '        <div class="gallery-grid reveal">\n';

  images.forEach((img, index) => {
    html += `            <div class="gallery-item">\n`;
    html += `                <img src="assets/gallery/thumbnails/${img}" alt="Gallery Image ${index + 1}" onerror="this.src='https://placehold.co/500x500?text=Image+${index + 1}'">\n`;
    html += `            </div>\n`;
  });

  html += '        </div>';

  // Read index.html
  const indexPath = path.join(__dirname, 'index.html');

  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return;
    }

    // Replace the gallery-grid section
    const regex = /        <div class="gallery-grid reveal">[\s\S]*?<\/div>/;
    const newData = data.replace(regex, html);

    fs.writeFile(indexPath, newData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing index.html:', err);
        return;
      }
      console.log(`Gallery updated with ${images.length} images!`);
    });
  });
});