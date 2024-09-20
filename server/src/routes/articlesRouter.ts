import {Router} from 'express';
import {
    getAllArticles,
    getArticleByIndex, getArticlesByGenreAndWords, getArticlesListByGenre
} from '../controllers/articlesController';

const router = Router();

router.get('/articles', getAllArticles)
router.get('/articles/:index', getArticleByIndex)
router.get('/articles/search/getArticlesListByGenre/:genre', getArticlesListByGenre)
router.get('/articles/search/getArticlesByGenreAndWords', getArticlesByGenreAndWords)

export default router;