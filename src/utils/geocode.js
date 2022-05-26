const request = require('postman-request')

const geocode = (adress, callback) =>{
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoicmV5bGFnYXJ0bzg4IiwiYSI6ImNsMzh6YWIwZTA0dzIzY3Bwczk4YnRkNjIifQ.AN9ylhjvowfSiwZ138GziA'
  request({ url: geourl, json:true},(error, {body}) =>{
      if(error){
          callback('No se pudo conectar con los servicios',undefined)

      }else if(body.features.length === 0){
           callback('No se encontro la locacion',undefined)
      }else{
          
          callback(undefined, {
              latitud: body.features[0].center[0],
              longitud: body.features[0].center[1],
              locacion: body.features[0].place_name
          })
          
      }
  })

}

module.exports = geocode