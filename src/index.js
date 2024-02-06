const express = require('express');
require('express-async-errors')
const cors = require('cors');
const dotenv = require('dotenv');
const routerApp = require('./routes.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use('/', routerApp);

app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    } else if (typeof err === 'string') {
        return res.status(400).json({
            error: err,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
});


app.listen(port, () => {
    console.log(`Servidor on in port: ${port}`);
});
