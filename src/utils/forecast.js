const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/23541c028e1f2eb41855b2a97d008c96/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({
                error: "Unable to connect to weather service!"
            }, undefined)
        } else if (body.error) {
            callback({
                error: "Unable to find location"
            }, undefined)
        } else {
            callback(
                undefined,
                body.daily.data[0].summary +
                " Current Temperature is: " + body.currently.temperature +
                ". Chances of rain " + body.currently.precipProbability +
                "%." + "\nThe highest temperature is going to be " +
                body.daily.data[0].temperatureHigh + " with a low of " +
                body.daily.data[0].temperatureLow + "."
            )
        }
    })
}

module.exports = forecast;