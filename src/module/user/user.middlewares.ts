import { IUser } from "./user.interface";
import User, { userSchema } from "./user.model";

export const userMiddlewares = () => { 
    // pre hooks ===
    userSchema.pre('find', async function (this, next) {
      this.find({ userStatus: { $eq: 'active' } });
      next();
    });
    
    // avoid duplicate email ===
    // userSchema.pre('save', async function (this, next) {
    //   const existingUser = await User.findOne({ email: this.email });
    //   if (existingUser) {
    //     const error: any = new Error('Email already exists!');
    //     next(error);
    //   }
    //   next(); 
    // });

    userSchema.pre("findOneAndUpdate", async function (next) {
      const update = this.getUpdate() as Record<string, any>;
    
      if (update?.email) {
        return next(new Error("Updating email is not allowed!"));
      }
    
      next();
    });
    
    
    // post hook for showing name in uppercase after saving file ===
    userSchema.post("find", async function (docs, next) {
      docs.forEach((element : IUser) => {
        element.name = element.name.toUpperCase()
      });
      next()
    })
    
 }