import {Router} from 'express';
import {
    getMetadata, getArticlesTotalCount,
    updateTotalArticlesCount
} from '../controllers/metadataController';

const router = Router();

router.get('/metadata', getMetadata);
router.get('/metadata/getArticlesTotalCount', getArticlesTotalCount);
router.get('/metadata/updateTotalArticles', updateTotalArticlesCount);

export default router;
