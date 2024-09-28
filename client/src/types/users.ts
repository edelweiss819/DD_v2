export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    favoriteArticles: [
        {
            index: {
                type: string,
            },
            title: {
                type: string,
            }
        }
    ],
    index: string
}