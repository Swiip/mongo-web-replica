import MongoOplog from 'mongo-oplog';
import SocketIo from 'socket.io';

const oplog = MongoOplog('mongodb://127.0.0.1:27017/local', 'test.test');
const io = SocketIo(8000);

const directory = new Map();

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
});

oplog.tail(function() {
  console.log('Oplog stream started');
});

oplog.on('op', function (operation) {
  console.log('Operation received', operation);
  dispatch(operation);
});

oplog.on('error', function (error) {
  console.log('Oplog error', error);
});

oplog.on('end', function () {
  console.log('Oplog stream ended');
});

oplog.stop(function () {
  console.log('Oplog server stopped');
});

function dispatch(operation) {
  directory.forEach((entry) => {
    if(entry.listening.has(operation.ns)) {
      console.log('Emit operation to', entry.socket.id);
      entry.socket.emit('operation', operation);
    }
  });
}
