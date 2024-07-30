import {Router} from 'express';
import {
    getAllArticles,
    getArticleByIndex
} from '../controllers/articlesController';

const router = Router();

router.get('/articles', getAllArticles)
router.get('/articles/:index', getArticleByIndex)

export default router;