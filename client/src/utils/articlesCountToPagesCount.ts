export const articlesCountToPagesCount = (
    articlesCount: number,
    articlesPerPage: number = 20
): number => {
    const pagesCount = Math.ceil(articlesCount / articlesPerPage);
    return pagesCount;
};
