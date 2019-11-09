const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaDR3azN5ZSIsImEiOiJjazFrb2R6cmYxOWZ4M3BqeW9vdGR6dzhoIn0.NOc8RqNXy7kXsxT7eUu3NA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({
                error: "Unable to connect to geolocation service!"
            }, undefined)
        } else if (!body.features.length) {
            callback({
                error: 'Unable to find location'
            }, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode