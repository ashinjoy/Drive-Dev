import mongoose from 'mongoose'

export const dbConnect = async()=>{
    try {
        const mongoString = process.env.MONGO_STRING
      console.log("mongoString in Auth===?",mongoString);

      const connection =   await mongoose.connect(mongoString)
      if(connection){
        console.log('Db connected Succesfully')
      }
    } catch (error) {
        console.error(error);
    }
}