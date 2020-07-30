
 
const weatherForm=document.querySelector('form')
const search =document.querySelector('input')

const message1=document.querySelector('#m1')

message1.textContent=('')

const message2=document.querySelector('#m2')
message1.textContent=('')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    
fetch('http://localhost:3000/weather?address='+location).then((response)=>{

    response.json().then((data)=>{
        if(data.error){
        console.log(data.error)
        message1.textContent=(data.error)
        message2.textContent=('')


    }
    else{
    console.log(data.location)
    console.log(data.forcast)
    message2.textContent=(data.location)
    message1.textContent=(data.forcast)

    }
    
    })
    })

})

