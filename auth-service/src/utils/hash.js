import bcrypt from 'bcrypt'

export const hash = async(password)=>{
try {
    const saltRound = 10
    return await bcrypt.hash(password,saltRound)
} catch (error) {
    console.error(error)
}
}

export const compare = async(plainPassword,hashedPassword)=>{
    try {
      return  await bcrypt.compare(plainPassword,hashedPassword)
    } catch (error) {
        console.error(error);
    }
}