const fs = require('fs');
const PDFDocument = require('pdfkit');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

// Path to JSON files
const leadsFilePath = path.join(__dirname, '../data/leadsData.json');

// Generate combined PDF and CSV report
exports.generateCombinedReport = async (req, res) => {
    try {
        // Read leads data from local JSON file
        const leads = JSON.parse(fs.readFileSync(leadsFilePath, 'utf-8'));

        // Create the CSV file
        const csvPath = 'lead_report.csv';
        const writer = csvWriter({
            path: csvPath,
            header: [
                { id: 'name', title: 'NAME' },
                { id: 'email', title: 'EMAIL' },
                { id: 'status', title: 'STATUS' }
            ]
        });

        await writer.writeRecords(leads);

        // Create the PDF file
        const pdfPath = 'lead_report.pdf';
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfPath));
        doc.fontSize(25).text('Lead Report', { align: 'center' });

        leads.forEach(lead => {
            doc.text(`${lead.name}, ${lead.email}, ${lead.status}`);
        });

        doc.end();

        // After both files are created, zip them together
        const zipPath = 'reports.zip';
        const output = fs.createWriteStream(zipPath);
        const archiver = require('archiver')('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            res.download(zipPath, 'reports.zip');
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);

        // Append files to the zip
        archive.file(csvPath, { name: 'lead_report.csv' });
        archive.file(pdfPath, { name: 'lead_report.pdf' });

        // Finalize the zip
        await archive.finalize();
    } catch (err) {
        res.status(500).send('Error generating combined report');
    }
};