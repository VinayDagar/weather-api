const axios = require("axios");

exports.getWeatherLocation = async (req, res, next) => {
    try {
        const { location } = req.params;

        const result = await axios.get(`${process.env.META_BASE_URL}/location/search/?query=${location}`);
        let { data } = result;

        if(data && data.length) {
            data = data[0];
        }
        
        return res.status(200).json(data);

    } catch (err) {
        next(err);
    }
};

exports.getWeatherForcast = async (req, res, next) => {
    try {
        const { location } = req.params;
        console.log(location)

        const result = await axios.get(`${process.env.META_BASE_URL}/location/${location}`);
        let { data } = result;

        // if(data && data.length) {
        //     data = data[0];
        // }
        console.log({data})
        
        return res.status(200).json(data);

    } catch (err) {
        next(err);
    }
};