import socketIo from 'socket.io-client';

let socket;

export function connect(url) {
  console.log('Mongo web replica client connecting to', url, '...');

  socket = socketIo(url);

  socket.on('operation', (operation) => {
    console.log('Received server operation', operation);
  });

  return new Promise((resolve) => {
    socket.on('connect', () => {
      console.log('Mongo web replica connected!');
      resolve();
    });
  });
}

export function listen(namespace) {
  console.log('Listening to namespace', namespace);
  socket.emit('listen', namespace);
}
