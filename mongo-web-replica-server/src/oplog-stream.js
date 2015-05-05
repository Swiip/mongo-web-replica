import { directory } from './socket-server';

import MongoOplog from 'mongo-oplog';

export const oplog = MongoOplog('mongodb://127.0.0.1:27017/local', 'test.test');

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
