export const API_ROUTES = {
    'ARTICLES_LIST': '/articles',
    'ARTICLES_LIST_BY_GENRE': '/articles/search/getArticlesListByGenre/:genre',
    'SINGLE_ARTICLE_BY_INDEX': '/articles/:index',
    'METADATA': '/metadata',
    'ARTICLES_TOTAL_COUNT': '/metadata/getArticlesTotalCount',
    'ARTICLES_TOTAL_COUNT_BY_GENRE': '/metadata/getArticlesTotalCountByGenre/:genre',
    'SEARCH_ARTICLES_BY_GENRE_AND_WORDS': '/articles/search/getArticlesByGenreAndWords',
    'TOTAL_ARTICLES_COUNT_BY_GENRE_AND_WORDS': '/articles/search/getTotalArticlesCountByGenresAndWords'
}