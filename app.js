const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const sgMail = require('@sendgrid/mail');

require('dotenv').config();  

const colors = require('colors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // change later to only allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
});

app.get('/api', (req, res, next) => {
    res.send('API status running. It\'s awesome');
});

app.post('/api/email', (req, res, next) => {

    const { name, email, message } = req.body;
    console.log(req.body);
 
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: "obasco4@gmail.com", // Change to your recipient
        from: "hello@triocephkiddies.com",  // Change to your verified sender
        subject: "Website Contact",
        text: req.body.name.concat(req.body.message)
    }

    sgMail.send(msg)
        .then((result) => {
            res.status(200).json({
                success: true
            });
        })
        .catch((err) => {
            console.log('error: ', err);
            res.status(401).json({
                success: false
            });
        });
});

app.listen(process.env.PORT || '5000', () => {
    console.log((`App running on port ${process.env.PORT}`).yellow.bold);
});