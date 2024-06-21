import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const dbFilePath = path.join(__dirname, '../db.json');

app.use(bodyParser.json());

// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.send(true);
});

// Endpoint to submit data
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required');
    }

    const newSubmission = { name, email, phone, github_link, stopwatch_time };

    // Read the existing submissions
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }

        const submissions = data ? JSON.parse(data) : [];
        submissions.push(newSubmission);

        fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving submission');
            }
            res.status(200).send('Submission saved successfully');
        });
    });
});

// Endpoint to read a submission by index
app.get('/read', (req, res) => {
    const { index } = req.query;

    if (index === undefined) {
        return res.status(400).send('Index query parameter is required');
    }

    const indexNumber = parseInt(index as string, 10);

    // Read the existing submissions
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }

        const submissions = data ? JSON.parse(data) : [];

        if (indexNumber < 0 || indexNumber >= submissions.length) {
            return res.status(404).send('Submission not found');
        }

        res.status(200).send(submissions[indexNumber]);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
