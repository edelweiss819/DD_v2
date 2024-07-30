import mongoose, {Model, Document, Schema} from 'mongoose';

interface IArticle extends Document {
    title: string;
    genres: Array<string>;
    content: string;
    index: number
}

const articleSchema: Schema = new Schema({
    title: {type: String, required: true},
    genres: {type: Array, required: true},
    content: {type: String, required: true},
    index: {type: Number, required: true},
})


const Article: Model<IArticle> = mongoose.model<IArticle>('Article', articleSchema, 'xlibs');

export default Article;