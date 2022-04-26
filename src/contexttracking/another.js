import { AsyncLocalStorage } from 'async_hooks';
const asyncLocalStorage = new AsyncLocalStorage();

const store = {
    id: 1
}
/*
asyncLocalStorage.disable()  
console.log(asyncLocalStorage.getStore())  // return undefined because we've disable instance of asynclocalstorage
*/

console.log(asyncLocalStorage.getStore())  // Returns the current store

// Replaces previous store with the given store object
asyncLocalStorage.enterWith(store);
console.log(asyncLocalStorage.getStore()) // Returns the store object


let data = {
    id: 6
}
try {
  asyncLocalStorage.run(data, () => {
    console.log("try",  asyncLocalStorage.getStore()) // Returns the store object
    setTimeout(() => {
      console.log("timer",asyncLocalStorage.getStore()) // Returns the store object
    }, 200);
    throw new Error();
  });
} catch (e) {
  asyncLocalStorage.getStore(); // Returns undefined
  // The error will be caught here
}

// The store is not accessible within the callback function or the asynchronous operations created within the callback
try {
    console.log("before exit",asyncLocalStorage.getStore()) // Returns the store object or value
    asyncLocalStorage.exit(() => {
      console.log("exit",asyncLocalStorage.getStore()) // Returns undefined
      throw new Error();
    });
  } catch (e) {
    console.log("error",asyncLocalStorage.getStore()) // Returns the same object or value
    // The error will be caught here
  }

  async function fn() {
    await asyncLocalStorage.run(new Map(), () => {
      asyncLocalStorage.getStore().set('key', value);
      return foo(); // The return value of foo will be awaited
    });
  }