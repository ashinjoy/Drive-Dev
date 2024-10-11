export class ErrorHelper{
    static async createError(status,message){
        const error = new Error()
        error.message = message
        error.status = status
        console.error("err in createEroor",error);
        return error
    }
}