import {Router} from 'express';
import {
    getAllArticles,
    getArticleByIndex,
    getArticlesByGenreAndWords,
    getArticlesListByGenre,
    getTotalArticlesCountByGenresAndWords, toggleArticleFavStatus
} from '../controllers/articlesController';

const router = Router();

router.get('/articles', getAllArticles)
router.get('/articles/:index', getArticleByIndex)
router.get('/articles/search/getArticlesListByGenre/:genre', getArticlesListByGenre)
router.get('/articles/search/getArticlesByGenreAndWords', getArticlesByGenreAndWords)
router.get('/articles/search/getTotalArticlesCountByGenresAndWords', getTotalArticlesCountByGenresAndWords)
router.post('/articles/toggleArticleFavStatus', toggleArticleFavStatus)

export default router;