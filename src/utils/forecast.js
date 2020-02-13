const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d8b801b549a3cc73b8313e1cc1097622/'+ latitude + ',' + longitude    

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect weather services', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            tempConverter = temp => {
                temp = (temp - 32) * (5/9)
                return parseFloat(temp).toFixed(2)
            }

            temp1 = tempConverter(body.currently.temperature)
            temp3 = tempConverter(body.daily.data[0].temperatureLow)
            temp2 = tempConverter(body.daily.data[0].temperatureHigh)
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ temp1 + ' degree celsius. The high today is ' + temp2 + ' with a low of ' + temp3 + '. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast;