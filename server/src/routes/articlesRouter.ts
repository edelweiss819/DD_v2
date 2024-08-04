import {Router} from 'express';
import {
    getAllArticles,
    getArticleByIndex, getFilteredArticlesList
} from '../controllers/articlesController';

const router = Router();

router.get('/articles', getAllArticles)
router.get('/articles/:index', getArticleByIndex)
router.get('/search', getFilteredArticlesList)

export default router;