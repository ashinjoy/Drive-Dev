import { app } from "./app.js";

const PORT = process.env.PORT



const startServer = ()=>{
    try {
        app.listen(PORT,()=>console.log('Chat server started at',PORT))
    } catch (error) {
        console.error(error);
    }
}
startServer()