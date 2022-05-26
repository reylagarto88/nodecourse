const request = require ('postman-request')
const tiza = require ('chalk')
const forecast = (lat,lon , callback) => {
    const furl = 'http://api.weatherstack.com/current?access_key=e67591b38036c9f74058c2f9d38cb417&query='+lat+','+lon+''
    
    request ({url: furl, json:true },(error,{ body }) => {
        if(error){
        callback('No se pudo conectar con el servidor',undefined)
        }   else if(body.error){
            console.log(lat,lon)
             callback('No se pudo encontra esa ciudad',undefined)
            }  else{
                callback(undefined,'La ciudad que consultaste es: '+body.location.name+ ', '+ body.location.region +'. La temperatura actual es de: '+body.current.temperature+' grados centìgrados, con un porcentaje de humedad del: %'+body.current.humidity)
                  }
    })
}

module.exports =forecast
