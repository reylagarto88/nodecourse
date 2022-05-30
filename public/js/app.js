console.log('JAVASCRIPT ESTA CARGADO')

const weatherForm = document.querySelector('form')
const searchterm = document.querySelector('input')
const msjone = document.querySelector('#msj-1')
const msjtwo = document.querySelector('#msj-2')


weatherForm.addEventListener('submit',(e) => {
  e.preventDefault()

  const loc = searchterm.value

  msjone.textContent='Cargando...'
  msjtwo.textContent=''
  fetch('/weather?address='+loc).then((response) =>{
  response.json().then((data) =>{
      if(data.error){
        msjone.textContent=data.error
      }
      else{
        msjone.textContent=data.location
        msjtwo.textContent=data.forecast
      }
    
  })

})
  
})