const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ3JlYXRlc3Rib3NzIiwiYSI6ImNrNXZidTY4aTBhZXIzaG4zaXR1cGsxNnMifQ.payJW0RyAV5N60NF5YR95w';
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length < 1){
            callback("Invalid location", undefined)
        } else{
            callback(undefined, {
            latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            place_name : body.features[0].place_name
            });
        }
    }) 
}

module.exports = geocode;