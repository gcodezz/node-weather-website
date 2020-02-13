const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ayodeji Afolabi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayodeji Afolabi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help page',
        title: 'Help',
        name: 'Ayodeji Afolabi'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'No address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, place_name} ={})=> {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            console.log(forecastData)
            res.send({
                forecast: forecastData,
                place_name,
                address: req.query.address
            })
        })
    })
})
 
app.get('/help/*', (req, res) => {
    res.render('404HelpErrors', {
        title: 'Error 404',
        name: 'Ayodeji Afolabi',
        errorMessage: 'Help article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404Errors', {
        title: 'Error 404',
        name: 'Ayodeji Afolabi',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server don start o, check port:3000')
})