// server/src/services/resume.service.js

import * as fs from 'fs/promises';
import mammoth from 'mammoth';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

export async function extractText(file) {
    if (file.mimetype === 'application/pdf') {
        // Read the file data which returns a Node.js Buffer
        const buffer = await fs.readFile(file.path);
        
        // ** THE FIX IS HERE **
        // Convert the Buffer to a Uint8Array before passing it to the library
        const data = new Uint8Array(buffer);

        const pdfDoc = await pdfjs.getDocument(data).promise;
        let fullText = '';
        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }
        return fullText;
    }

    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const { value } = await mammoth.extractRawText({ path: file.path });
        return value;
    }

    throw new Error('Unsupported file format');
}