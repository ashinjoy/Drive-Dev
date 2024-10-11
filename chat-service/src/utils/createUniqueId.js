import { v4 as uuidv4 } from 'uuid';
export const generateRandomUniqueId = ()=>{
    const randomId = uuidv4()
    console.log(randomId);
}