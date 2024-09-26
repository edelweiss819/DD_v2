import mongoose, {Model, Document, Schema, CallbackError} from 'mongoose';

export interface IFavoriteArticle {
    index: string;
    title: string;
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    favoriteArticles: IFavoriteArticle[];
    index: number;
    role: string;
}

const userSchema: Schema = new Schema({
                                          firstName: {
                                              type: String,
                                              required: true
                                          },
                                          lastName: {
                                              type: String,
                                              required: true
                                          },
                                          email: {
                                              type: String,
                                              required: true,
                                              // Поменять на тру
                                              unique: false,
                                          },
                                          password: {
                                              type: String,
                                              required: true
                                          },
                                          gender: {
                                              type: String,
                                              required: true
                                          },
                                          favoriteArticles: [
                                              {
                                                  index: {
                                                      type: String,
                                                      required: true
                                                  },
                                                  title: {
                                                      type: String,
                                                      required: true
                                                  }
                                              }
                                          ],
                                          index: {
                                              type: Number,
                                              required: true,
                                              unique: true
                                          },
                                          role: {
                                              type: String,
                                              enum: [
                                                  'user',
                                                  'admin'
                                              ],
                                              default: 'user'
                                          }
                                      });


const User: Model<IUser> = mongoose.model<IUser>('User', userSchema, 'users');

export default User;
