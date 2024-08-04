import mongoose, {Model, Document, Schema} from 'mongoose';

export interface IArticle extends Document {
    title: string;
    genres: Array<string>;
    content: string;
    index: number
}

const articleSchema: Schema = new Schema({
    title: {type: String, required: true},
    genres: {type: [String], required: true},
    content: {type: String, required: true},
    index: {type: Number, required: true},
})

//Индексация частоиспользуеммых сценариев получения данных.
articleSchema.index({title: 1});
articleSchema.index({title: 'text', content: 'text'});


const Article: Model<IArticle> = mongoose.model<IArticle>('Article', articleSchema, 'xlibs');

export default Article;