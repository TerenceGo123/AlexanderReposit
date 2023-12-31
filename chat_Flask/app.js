let PORT = 5000;


let token = localStorage.getItem('token');

let userEl = document.querySelector('.login .user');


const screen = {
   user: {
      info:  document.querySelector('.info'),
      input:  userEl.querySelector('#input'),
   },
   messages: {
      input: document.querySelector('.messages-send #input'),
      list:  document.querySelector('.mesages-list'),
   },
}

url = 'http://localhost:'

authButton.addEventListener('click', async () => {

    let res = await fetch(`${url}${PORT}/auth?name=${screen.user.input.value}`, {
        method: 'GET',  })
     if (!res.ok){
        console.error(res);        
        return
     }

     token  = await res.text()
     localStorage.setItem('token', token)
     screen.user.info.innerHTML = token
})



msgButton.addEventListener('click', async () => {

   let res = await fetch(`${url}${PORT}/send?text=${screen.messages.input.value}&token=${token}`, {
       method: 'GET',  })
    if (!res.ok){
       console.error(res);        
       return
    }

    screen.user.info.innerHTML = await res.text()

    console.log(res);


})

document.querySelector('.messages img').addEventListener('click', async () => {

   let res = await fetch(`${url}${PORT}/getall?token=${token}`, {
      method: 'GET',  })
   if (!res.ok){
      console.error(res);        
      return
   } 
  
   res = JSON.parse( await res.text())
   console.log(res);
   screen.messages.list.innerHTML = ''

   res.forEach(item => {
      let newEl = document.createElement('div')
      
      let nameEl = document.createElement('span')
      let textEl = document.createElement('span')
      let sepEl = document.createElement('span')

      nameEl.innerHTML = item.name
      sepEl.innerHTML = ': '
      textEl.innerHTML = item.text
      nameEl.style.color = 'red'

      newEl.appendChild(nameEl)
      newEl.appendChild(sepEl )
      newEl.appendChild(textEl)

      screen.messages.list.appendChild(newEl)
   });

   console.log(res);
   
})