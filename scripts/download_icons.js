const fs = require('fs');
const path = require('path');
const https = require('https');

const iconsToDownload = [
  { tech: 'react', styles: ['original', 'plain'] },
  { tech: 'nodejs', styles: ['original', 'plain'] },
  { tech: 'php', styles: ['original', 'plain'] },
  { tech: 'javascript', styles: ['original', 'plain'] },
  { tech: 'express', styles: ['original', 'plain'] },
  { tech: 'java', styles: ['original', 'plain'] },
  { tech: 'mysql', styles: ['original', 'plain'] },
  { tech: 'mongodb', styles: ['original', 'plain'] },
  { tech: 'firebase', styles: ['original', 'plain'] },
  { tech: 'c', styles: ['original', 'plain'] },
  { tech: 'cplusplus', styles: ['original', 'plain'] },
  { tech: 'kotlin', styles: ['original', 'plain'] },
  { tech: 'figma', styles: ['original', 'plain'] }
];

const outputDir = path.join(__dirname, '..', 'public', 'icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        // Fallback for cases where original/plain might not exist
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Failed to download ${url}: Status code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function start() {
  console.log('Starting download of devicon SVGs...');
  for (const item of iconsToDownload) {
    for (const style of item.styles) {
      const filename = `${item.tech}-${style}.svg`;
      const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.tech}/${item.tech}-${style}.svg`;
      const dest = path.join(outputDir, filename);

      try {
        await downloadFile(url, dest);
        console.log(`Successfully downloaded: ${filename}`);
      } catch (err) {
        console.warn(`Could not download ${url}: ${err.message}`);
        // Let's try downloading plain style if original failed or vice-versa as fallback
        const altStyle = style === 'original' ? 'plain' : 'original';
        const altUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.tech}/${item.tech}-${altStyle}.svg`;
        try {
          console.log(`Trying fallback for ${item.tech}-${style}.svg using ${altStyle}...`);
          await downloadFile(altUrl, dest);
          console.log(`Successfully downloaded fallback: ${filename}`);
        } catch (fallbackErr) {
          console.error(`Failed to download fallback for ${filename}:`, fallbackErr.message);
        }
      }
    }
  }
  console.log('All downloads completed!');
}

start();
