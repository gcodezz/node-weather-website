const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d8b801b549a3cc73b8313e1cc1097622/'+ latitude + ',' + longitude    

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect weather services', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            var temp = body.currently.temperature
            temp = (temp - 32) * (5/9)
            temp = parseFloat(temp).toFixed(2)
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ temp + ' degree celsius. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast;