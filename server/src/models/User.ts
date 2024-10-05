import mongoose, {Model, Document, Schema} from 'mongoose';

export interface IFavoriteArticle {
    index: number;
    title: string;
}

export interface ILastArticles extends IFavoriteArticle {
    timestamp: number;
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    favoriteArticles: IFavoriteArticle[];
    lastArticles: ILastArticles[];
    index: number;
    role: string;
    registrationDate: number;
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
                                              unique: true,
                                          },
                                          password: {
                                              type: String,
                                              required: true
                                          },
                                          favoriteArticles: [
                                              {
                                                  index: {
                                                      type: Number,
                                                      required: true
                                                  },
                                                  title: {
                                                      type: String,
                                                      required: true
                                                  }
                                              }
                                          ],
                                          lastArticles: [
                                              {
                                                  index: {
                                                      type: Number,
                                                      required: true
                                                  },
                                                  title: {
                                                      type: String,
                                                      required: true
                                                  },
                                                  timestamp: {
                                                      type: Number,
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
                                          },

                                          registrationDate: {
                                              type: Number,
                                              required: true
                                          },
                                      });


const User: Model<IUser> = mongoose.model<IUser>('User', userSchema, 'users');

export default User;
