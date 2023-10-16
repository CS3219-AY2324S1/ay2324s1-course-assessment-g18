const socket = io('http://localhost:5001');
let currentRoom = '';
socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  if (currentRoom == '') {
    alert('join a room');
    return;
  }
  const message = $('#message').val();
  $('#chat').append(`<div>me: ${message}</div>`);
  const username = 'anonymous';
  socket.emit('message', { message, username, currentRoom });
}

function joinRoom() {
  const room = $('#room').val();
  socket.emit('joinRoom', { room, toLeaveRoom: currentRoom });
  $('#chat').html('');
  currentRoom = room;
  console.log(currentRoom);
}

// function createRoom() {

// }

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});
