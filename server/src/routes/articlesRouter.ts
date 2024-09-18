import {Router} from 'express';
import {
    getAllArticles,
    getArticleByIndex, getArticlesListByGenre
} from '../controllers/articlesController';

const router = Router();

router.get('/articles', getAllArticles)
router.get('/articles/:index', getArticleByIndex)
router.get('/articles/search/getArticlesListByGenre/:genre', getArticlesListByGenre)

export default router;