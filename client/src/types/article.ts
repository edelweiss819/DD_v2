export interface IArticle {
    _id?: string;
    title?: string;
    genres?: Array<string>;
    content?: string;
    index?: number
    onClick?: () => void,
}