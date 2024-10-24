const fs = require('fs');
const path = require('path');
const leadsFilePath = path.join(__dirname, '../data/leadsData.json');
const campaignsFilePath = path.join(__dirname, '../data/campaignsData.json');

// Helper function to write data to a JSON file
function writeToFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ETL Process
exports.fetchAndStoreData = (req, res) => {
    try {
        // Extract leads and campaigns from the existing dummy data
        const leadsData = JSON.parse(fs.readFileSync(leadsFilePath, 'utf-8'));
        const campaignsData = JSON.parse(fs.readFileSync(campaignsFilePath, 'utf-8'));

        // Modify or add more data to the leads and campaigns if needed (For the example, we just read the existing data)

        // Save the modified or new data back to the JSON files
        writeToFile(leadsFilePath, leadsData);
        writeToFile(campaignsFilePath, campaignsData);

        res.status(200).send('Data fetched and stored successfully in local JSON files');
    } catch (err) {
        res.status(500).send('Error in ETL process');
    }
};