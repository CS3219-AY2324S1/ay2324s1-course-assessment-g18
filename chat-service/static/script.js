const socket = io('http://localhost:5001');
socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  console.log('send');
  const message = $('#message').val();
  console.log(message);
  $('#chat').append(`<div>me: ${message}</div>`);
  const username = 'anonymous';
  socket.emit('message', { message, username });
}

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});
