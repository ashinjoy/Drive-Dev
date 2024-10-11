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
    try {
    return await userModel.findById({ _id: id });
      
    } catch (error) {
      throw error
    }
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
  async updateWalletBalance (userId,data){
    try {
    return await userModel.findByIdAndUpdate({_id:userId},{$inc:data})
    } catch (error) {
      console.error(error);
      throw error
      
    }
  }
  async deductWalletBalance(userId,data){
    console.log("inDedductddbbdbdbdb",userId,data);
    return await userModel.findByIdAndUpdate({_id:userId},{$inc:data},{$new:true})
  }
}
