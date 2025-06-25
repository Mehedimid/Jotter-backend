import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import { userMiddlewares } from './user.middlewares';

export const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

// pre and post hooks practice (active users finding, duplicate email finding , make names uppercase) ===
userMiddlewares();

const User = model<IUser>('User', userSchema);

export default User;
