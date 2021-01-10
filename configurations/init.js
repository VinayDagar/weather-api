const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require("path");
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

App.use(express.json());
App.use(express.static(path.join(__dirname, 'public')));
App.use(bodyParser.json({ limit: '100mb' }));
App.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
App.use(helmet())
App.use(hpp())
App.use(cors())

module.exports = () => {
    console.log("process.env.PORT", process.env.PORT)
    App.listen(process.env.PORT, () => {
        Logger.info(`Express server starting at port ${process.env.PORT}, in ${process.env.NODE_ENV} environment`)
    })
}
