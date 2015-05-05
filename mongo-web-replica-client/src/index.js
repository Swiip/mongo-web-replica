import socketIo from 'socket.io-client';

let socket;

const listening = new Set();

export function connect(url) {
  console.log('Mongo web replica client connecting to', url, '...');

  socket = socketIo(url);

  socket.on('operation', (operation) => {
    console.log('Received server operation', operation);
  });

  return new Promise((resolve) => {
    socket.on('connect', () => {
      console.log('Mongo web replica connected!');
      listening.forEach((namespace) => {
        socket.emit('listen', namespace);
      });
      resolve();
    });
  });
}

export function listen(namespace) {
  console.log('Listening to namespace', namespace);
  listening.add(namespace);
  if(socket.connected) {
    socket.emit('listen', namespace);
  }
}

export function unlisten(namespace) {
  console.log('Stop listening to namespace', namespace);
  listening.delete(namespace);
  if(socket.connected) {
    socket.emit('unlisten', namespace);
  }
}
