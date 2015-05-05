# Mongo Web Replica

**Very early development stage**

This is an attempt to build a framework which targets having synchronized / realtime / offline
data on a web client.

The principle is to have a Node backend listening to the Mongo oplog and sending changes
through Web Sockets to web clients.

Web clients should use modern client side storing for offline persistence.

All will be written in ES6 with Babel.

The project is splitted in 3 sub projects:

- **mongo-web-replica-client** The client library
- **mongo-web-replica-console** A test app using the client
- **mongo-web-replica-server** The server library
