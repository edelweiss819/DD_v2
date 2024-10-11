export const articlesCountToPagesCount = (
    articlesCount: number,
    articlesPerPage: number = 10
): number => {
    const pagesCount = Math.ceil(articlesCount / articlesPerPage);
    return pagesCount;
};
