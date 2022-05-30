
const path = require ('path')
const hbs = require ('hbs')
const express = require ('express')
const geocode= require('./utils/geocode')
const forecast = require ('./utils/forecast') 
const chalk = require('chalk')
const port = process.env.PORT || 3000

const app = express ()

//Define paths for express config
const publicdirectory = path.join(__dirname,'../public/')
const partialspath = path.join(__dirname,'../src/partials')
const viewspath = path.join(__dirname,'../src/views')

//Setup handlebars engine and views location
app.use(express.static(publicdirectory))
app.set('view engine','hbs')
app.set ('views', viewspath)
hbs.registerPartials(partialspath)


console.log(partialspath)

app.get('',(req,res) =>{
    res.render('index', {
        title: 'The Rafiweather Channel',
        name: 'Ralph Ulrich'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Pagina de about',
        name:'Tu Padre'
    })
})


app.get('/help',(req,res) => {
    res.render('help', {
        text:'En que te puedo ayudar en esta pàgina',
        name: 'Don Ayuda',
        title:'Helpless'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:' Debes buscar algo'
        })

    }
    res.send({
        products: []
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'Debes proporcionar una locacion'
        }) 
    }
    geocode(req.query.address, (error, {latitud, longitud, locacion} ={}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(longitud,latitud, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                locacion,
                address: req.query.address
            })
        })

    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: 'help error',
        name:'ok',
        errorMessage : 'Pagina de help no encontrada'
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title: 404,
        name: 'OK',
        errorMessage: 'Pagina no Encontrada'
    })
})


app.listen(port, ()=>{
 console.log('El servidor esta arriba: '+ port)
})
