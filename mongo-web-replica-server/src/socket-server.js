import SocketIo from 'socket.io';

const io = SocketIo(8000);

export const directory = new Map();

io.on('connection', (socket) => {
  console.log('New socket.io connection', socket.id);
  directory.set(socket, { socket, listening: new Set() });

  socket.on('listen', (namespace) => {
    console.log('Client', socket.id, 'listen to namespace', namespace);
    directory.get(socket).listening.add(namespace);
  });

  socket.on('unlisten', (namespace) => {
    console.log('Client', socket.id, 'stop listening to collection', namespace);
    directory.get(socket).listening.remove(namespace);
  });

  socket.on('disconnect', () => {
    console.log('Client', socket.id, 'disconnected');
    directory.delete(socket);
  });
});
