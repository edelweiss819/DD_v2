export interface IArticle {
    title?: string;
    genres?: Array<string>;
    content?: string;
    index?: number
    onClick?: () => void,
}