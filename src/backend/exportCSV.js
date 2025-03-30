const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

const dataDir = './data'; // Adjust to match your actual storage directory
const outputFile = 'exported_data.csv';

// 1. Read all JSON files in the directory
fs.readdir(dataDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const allData = [];

    files.forEach((file) => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(dataDir, file);
            try {
                const rawData = fs.readFileSync(filePath, 'utf-8');
                const jsonData = JSON.parse(rawData);

                // 2. Extract only the needed fields (customize this part)
                allData.push({
                    uuid: path.basename(file, '.json'), // Use filename (UUID)
                    timestamp: jsonData.timestamp || '', // If you store a timestamp
                    formVersion: jsonData.formVersion || '', // Optimized vs. Material
                    userData: JSON.stringify(jsonData.userResponses || {}), // Store responses as JSON string
                });

            } catch (err) {
                console.error(`Error reading file ${file}:`, err);
            }
        }
    });

    // 3. Convert to CSV and save
    if (allData.length > 0) {
        const csv = parse(allData, { fields: ['uuid', 'timestamp', 'formVersion', 'userData'] });
        fs.writeFileSync(outputFile, csv);
        console.log(`Exported ${allData.length} records to ${outputFile}`);
    } else {
        console.log('No data files found.');
    }
});
