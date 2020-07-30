
const request=require('request')

const geocode= (address,callback)=>{
    const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiaXRzbWV4IiwiYSI6ImNrY244bHJ6ZzAwOXYydnFrNXJnZnFraG0ifQ.856qNCL1n1LftEO1SYrHKQ&limit=1'
   
    request({url,json:true},(error,{body})=>{
      
       if(error){
        callback('unable to connect to network',undefined)}
    
        else if(body.features.length===0)  {
           callback('unable to find location,try another search',undefined)
        }
        else {
           callback(undefined,{
           latitude: body.features[0].center[1],
           longitude : body.features[0].center[0],
           location : body.features[0].place_name
            } )
    
        }
       })
    }

    module.exports=geocode