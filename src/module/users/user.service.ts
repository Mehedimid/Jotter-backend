import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) : Promise<TUser> => {
    const result = await User.create(payload);
    return result;
  };

  const getUser = async () => {
    const result = await User.find();
    return result;
  };
  
  const getSingleUser = async (paramId: string) => {
    const result = await User.findById(paramId);
    return result;
  };
  
  const updateUser = async (userId:string, payload: Partial<TUser>) => {
    const result = await User.findByIdAndUpdate(userId, payload, {new:true})
    return result;
  };

  const deleteUser = async (userId:string) => {
    const result = await User.findByIdAndDelete(userId)
    return result;
  };
  

  export const userServices = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
  }