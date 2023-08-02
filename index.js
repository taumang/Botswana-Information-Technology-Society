const zlib = require('zlib');
const fs = require('fs');

const directoryPath = 'https://bits.org.bw/';

const htmlFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file=>{
    const filePath = `${directoryPath}/${file}`;
    const html = fs.readFileSync(filePath);

    zlib.gzip(html,(error,compressedData)=>{
        if(error){
            console.error(`Compression error for file ${file}`,error);
            return;
        }

        const compressedFilePath = `${filePath}.gz`;
        fs.writeFileSync(compressedFilePath,compressedData);

        console.log(`Compression successful for file ${file}`)
    })
})