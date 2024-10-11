import { userModel } from "../../database/schema/userSchema/userSchema.js";
export class UserRepository {
  constructor() {}
  async createUser(userData) {
    return await userModel.create(userData);
  }
  async findUserByEmail(email) {
    return await userModel.findOne({ email: email });
  }
  async findUserById(id) {
    return await userModel.findById({ _id: id });
  }
  async findByIdUpdate(id, dataToUpdate) {
    return await userModel
      .findByIdAndUpdate({ _id: id }, {$set:dataToUpdate}, { new: true })
      .lean();
  }
  async getAllUsers(filter,page,limit) {
try {
  console.log('f',filter,page,limit);
  
 const result =  await userModel.find(filter, { password: 0 }).skip(page-1).limit(limit);
 console.log(result);
 
 return result
} catch (error) {
  console.error(error);
  
}
    
  }

  async getTotalDocs(){
    try {
      const  totalDocs = await userModel.countDocuments()
      return totalDocs
    } catch (error) {
      
    }
  }

  async getPhoneFromSavedContacts(userId){
    try { 
      const data = await userModel.aggregate([{$match:{_id:userId}},{$unwind:"$savedContacts"},{$project:{_id:0,phone:"$savedContacts.phone"}}])
      console.log("data",data);
      return data
    } catch (error) {
      console.error(error);
      
    }
  }
}
