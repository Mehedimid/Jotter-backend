import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, immutable: true },
  password: { type: String, required: true },
  photo: String,
  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
    default:"active"
  },
});

userSchema.post('find', function (doc, next) {
  doc.forEach((elelemt: TUser) => {
    elelemt.name = elelemt.name.toUpperCase();
  });
  next();
});

export const User = model<TUser>('users', userSchema);
