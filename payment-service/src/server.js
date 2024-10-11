import { app } from "./app.js";

const PORT = process.env.PORT



const startServer = ()=>{
    try {
        app.listen(PORT,()=>console.log('Payment server started at PORT',PORT))
    } catch (error) {
        console.error(error);
    }
}
startServer()