const socket = io()
//conventiont o have dollar sign preceding variable when getting value from DOM

//Elements
const  $messageForm = document.querySelector('#message-form')
const $messageSubmit = $messageForm.querySelector('button')
const $messageIn = $messageForm.querySelector('input')
const $locationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Templates
//to get html inside template - innerHTML
const messageTemplate = document.querySelector('#messages-template').innerHTML
const locationTemplate = document.querySelector('#location-message-template').innerHTML


socket.on('message', (message) => {
    console.log(message.text)
    const html = Mustache.render(messageTemplate, {
      message: message.text,
      createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    $messageSubmit.setAttribute('disabled','disabled')

    socket.emit('sendMessage', message, (error) => {
      $messageSubmit.removeAttribute('disabled')
      $messageIn.value = ""
      $messageIn.focus()
      if (error) {
        return console.log(error);
      }
      console.log("Message delivered");
    })
})

socket.on('locationMessage', (location) => {
  console.log(location)
  const html = Mustache.render(locationTemplate, {
    location: location.text,
    createdAt: moment(location.createdAt).format('h:mm a')
  })
  $messages.insertAdjacentHTML('beforeend', html)
})


$locationButton.addEventListener('click', () => {
    $locationButton.setAttribute('disabled','disabled')
    if ( !navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
          $locationButton.removeAttribute('disabled')
          console.log("Location was sent!");
        })
    })
})
