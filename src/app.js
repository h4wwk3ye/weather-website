const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.Port || 3000

// Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Farhan Tahir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Farhan Tahir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'No help available!',
        title: 'Help',
        name: 'Farhan Tahir'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Provide an address!"
        })
    }

    const address = req.query.address

    geocode(address, (error, response) => {
        if (error) {
            return res.send({ error })
        }
        forecast(response.latitude, response.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: response.location,
                address,
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404page.hbs', {
        msg: "Page not found",
        title: '404',
        name: 'Farhan Tahir',
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})