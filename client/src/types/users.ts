export interface IFavoriteArticle {
    index: number,
    title: string,
}

export type FavoriteArticlesList = IFavoriteArticle[]


export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string | undefined,
    favoriteArticles: FavoriteArticlesList
    index: number
    registrationDate: number,
}