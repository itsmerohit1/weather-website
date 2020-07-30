
const path= require('path')
const express =require('express')
const hbs= require('hbs')
const geocode= require('./utilis/geocode')
const forecast=require('./utilis/forecast')

const app=express()
const port=process.env.PORT ||3000
//define paths for express configAS79 

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//setup handlebars engine and views locations
app.set('view engine','hbs')

app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))




app.get('',(req,res ) =>{
  res.render('index',{
    title:'weather',
    name: 'rohit'

  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
      title:'about me ',
      name: 'ROHIT ANAND'
  
  })
})


app.get('/help',(req,res)=>{

  res.render('help',{
      helptext:'this is some useful text ',
      title:'help' ,
    name:'Rohit Anand'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
  return  res.send(
    'i think you forgot to provide an address!')
 
  }
  
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
   
  if(error){
    return res.send({error})
  }
 

forecast(latitude,longitude,(error,{forcast}={})=>{
 
if(error){
  return res.send({error})
}

   
    
    res.send({
     
   
    location:  location,
 //   address_you_search_for: req.query.address,
    forcast: forcast
    
    })
  })
})
})






app.get('/products',(req,res)=>{
if (!req.query.search){
 return  res.send({
    error:'you must provide some search term'
  })
}

  console.log(req.query.search)
  res.send({
    products:[]
})
})

app.get('/help/*', (req,res)=>{
  res.render('404',{
    title:'404',
    name:'Rohit Anand',

    errormessage:'help article not found'
  })
})

app.get('*',(req,res)=>{
 res.render('404',{
   title:'404',
   name:'Rohit Anand',
   errormessage:'page not found'

 })
})

app.listen(3000,()=>{
    console.log('server is up  on the port 3000')
})
