const request=require('request')
const { patch } = require('request')

const forecast = (latitude,longitude, callback)=>{
  
const url= 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=ae011e5db3020104509e604d01b3fe9e'
 
request ({url,json:true},(error,{body}) =>{
   

 if(error){
    callback('unable to connect to weather sevices!',undefined)
 }
 else if (body.error){
    callback('unable to find the location',undefined)
 }
 else{
    const f1=parseInt(body.main.temp)-273
    const f2=parseInt(body.main.feels_like)-273

    const g="here we go! the current temperaute of the location is "+f1+" degree celcius and it feels_like nearly "+f2+" degree celcius "
   callback(undefined ,{forcast:g})
     
 }   
   

 })
 } 

 module.exports = forecast