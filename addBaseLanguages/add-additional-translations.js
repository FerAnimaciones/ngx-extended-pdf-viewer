const folder = process.argv[2];
const fs = require('fs');
const file = fs.readFileSync('../projects/ngx-extended-pdf-viewer/src/' + folder + '/locale/locale.properties');
const content = file.toString().split('\n');

const languages = {};
for (let i = 0; i < content.length; i++) {
  const key = content[i];
  if (key.startsWith('[')) {
    const lang = key.substring(1, key.length - 1);
    languages[lang] = true;
  }
}

for (let lang in languages) {
  const shortcode = lang.substring(0, 2);
  let additionalFilename = '../projects/ngx-extended-pdf-viewer/src/assets/additional-locale/' + shortcode + '.properties';
  if (!fs.existsSync(additionalFilename)) {
    additionalFilename = '../projects/ngx-extended-pdf-viewer/src/assets/additional-locale/en.properties';
  }
  const originalFilename = '../projects/ngx-extended-pdf-viewer/src/' + folder + '/locale/' + lang + '/viewer.properties';
  if (fs.existsSync(additionalFilename) && fs.existsSync(originalFilename)) {
    const original = fs.readFileSync(originalFilename);
    const additional = fs.readFileSync(additionalFilename);
    if (original.includes(additional)) {
      console.log('The add-additional-translations script has already run for ' + lang);
    } else {
      const complete = original + '\n\n' + additional;
      console.log('Added custom translations to ' + lang);
      fs.writeFileSync(originalFilename, complete);
    }
  }
  const filename27 = '../projects/ngx-extended-pdf-viewer/src/bleeding-edge/locale/' + lang + '/viewer.properties'
  if (filename27 != originalFilename && fs.existsSync(filename27) && fs.existsSync(originalFilename)) {
    const originalLines = fs.readFileSync(originalFilename);
    const additionalLines = fs.readFileSync(filename27).toString().split("\n");
    let additions = "";

    for (const line of additionalLines) {
      if (line.trim().length > 0 && (!line.startsWith("#"))) {
        const pos = line.indexOf("=");
        const key = line.substring(0, pos+1);
        if (!originalLines.includes(key)) {
          additions += line + "\n";
        }
      }
    }

    if (additions.length > 0) {
      const complete = originalLines + '\n\n# Translations added from pdf.js 2.7\n\n' + additions;
      console.log('Added 2.7 translations to ' + lang);
      fs.writeFileSync(originalFilename, complete);
    }
  }
  const filename27English = '../projects/ngx-extended-pdf-viewer/src/bleeding-edge/locale/en-US/viewer.properties';
  if (fs.existsSync(originalFilename)) {
    const originalLines = fs.readFileSync(originalFilename);
    const additionalLines = fs.readFileSync(filename27English).toString().split("\n");
    let additions = "";

    for (const line of additionalLines) {
      if (line.trim().length > 0 && (!line.startsWith("#"))) {
        const pos = line.indexOf("=");
        const key = line.substring(0, pos+1);
        if (!originalLines.includes(key)) {
          additions += line + "\n";
        }
      }
    }

    if (additions.length > 0) {
      const complete = originalLines + '\n\n# Translations added from the English translations of pdf.js 2.7\n\n' + additions;
      console.log('Added English 2.7 translations to ' + lang);
      fs.writeFileSync(originalFilename, complete);
    }
  }
}
