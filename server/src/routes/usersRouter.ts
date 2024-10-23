import {Router} from 'express';
import {usersController} from '../controllers/usersController';
import {authenticateToken} from '../middlewares/authMiddleware';

const router = Router();


router.post('/users', (req, res) => {
    usersController.addUser(req, res);
});

router.delete('/users/:index', authenticateToken(['admin']), (req, res) => {
    usersController.deleteUser(req, res);
});

router.put('/users/:index', authenticateToken([
                                                  'user',
                                                  'admin'
                                              ]), (req, res) => {
    const index = parseInt(req.params.index);
    usersController.updateUser(index, req.body, res);
});

router.get('/users', authenticateToken([
                                           'user',
                                           'admin'
                                       ]), (req, res) => {
    usersController.getUser(req, res);
});

router.get('/users/all', authenticateToken([
                                               'user',
                                               'admin'
                                           ]), (req, res) => {
    usersController.getAllUsers(req, res);
});
router.get('/users/favorites/getUserFavoriteArticlesList', authenticateToken([
                                                                                 'admin'
                                                                             ]), (req,
                                                                                  res) => {
    usersController.getUserFavoriteArticlesList(req, res);
});
router.post('/users/favorites/toggle', authenticateToken([
                                                             'user',
                                                             'admin'
                                                         ]), (req, res) => {
    usersController.toggleArticleFavStatus(req, res);
});

router.post('/users/lastsArticles/postLastArticle', authenticateToken([
                                                                          'user',
                                                                          'admin'
                                                                      ]), (req,
                                                                           res) => {
    usersController.addArticleToLastArticlesList(req, res);
});

router.get('/users/lastArticles/getLastArticlesList',
           authenticateToken([
                                 'user',
                                 'admin'
                             ]),
           (req, res) => usersController.getUserLastArticlesList(req, res)
);
router.get('/users/avatar/getUserAvatar', (req,
                                           res) => usersController.getUserAvatar(req, res))
export default router;