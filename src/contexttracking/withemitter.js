
import Emitter from "events"
import { AsyncLocalStorage } from 'async_hooks';
const asyncLocalStorage = new AsyncLocalStorage();
const emitter = new Emitter()
const store = {
    data: 1
}
emitter.on('my-event', () => {
    asyncLocalStorage.enterWith(store);
  });
emitter.on('my-event', () => {
   console.log("inside",  asyncLocalStorage.getStore()) // Returns the same object
  });
  
  console.log("before",asyncLocalStorage.getStore())  // Returns undefined
  emitter.emit('my-event');
  console.log("after",asyncLocalStorage.getStore()) // Returns the same object

