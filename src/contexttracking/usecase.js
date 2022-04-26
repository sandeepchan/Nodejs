// we will make our logger inform us about the path of request and time delta between the request start and log call.
import  express from "express"
const app = express()

import { AsyncLocalStorage } from "async_hooks"

import  {v4 as uuid }from "uuid"
const context = new AsyncLocalStorage();
function requestLogger(...args) {
    const store = context.getStore();
    const id = store.get("id");
    const timeStart = store.get("timeStart");
    const { originalUrl } = store.get("request");
    console.log(`${id}, ${originalUrl}, ${+new Date() - timeStart}ms`, args);
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  app.use((req, res, next) => {
    const store = new Map();
    context.run(store, () => {
      store.set("id", uuid());
      store.set("timeStart", +new Date());
      store.set("request", req);
      requestLogger("request started");
      next();
    });
  });
app.get("/data", (req, res, next)=>{
    try{
     res.status(200).json("Server started")
     next()
    }catch(e)
    {
        console.log("err", e)
    }
})
app.use((req, res, next) => {
    requestLogger("request ended");
    next();
  });
  app.listen(3000, ()=>{
      console.log("Server started")
  })