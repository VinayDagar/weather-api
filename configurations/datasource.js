/**
 @author: Vinay Dagar
 configuration is define to make connection with the database for the different environment.
*/
const dotenv = require('dotenv');

module.exports = () => {
    dotenv.config({
        path: `${__dirname}/../env/${process.env.NODE_ENV}.env`,
    });

    const options = {
        useNewUrlParser: true,
        socketTimeoutMS: 10000,
        useUnifiedTopology: true,
    };
    const URL = process.env.DB_URL;

    Mongoose.connect(URL, options);

    if (process.env.ENABLE_DB_LOG) {
        Mongoose.set('debug', true);
    }

    const db = Mongoose.connection;

    db.on('error', (err) => {
        console.error(err);
    });

    db.on('open', () => {
        console.info('Database connected!');
    });

    return db;
};
