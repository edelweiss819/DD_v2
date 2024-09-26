import {Router} from 'express';
import {usersController} from '../controllers/usersController';
import {authenticateToken} from '../middlewares/authMiddleware';

const router = Router();


router.post('/users', (req, res) => {
    usersController.addUser(req, res);
});

router.delete('/users/:index', authenticateToken(['admin']), (req, res) => {
    const index = parseInt(req.params.index);
    usersController.deleteUser(index, req, res);
});

router.put('/users/:index', authenticateToken([
                                                  'user',
                                                  'admin'
                                              ]), (req, res) => {
    const index = parseInt(req.params.index);
    usersController.updateUser(index, req.body, res);
});

router.get('/users/:index', authenticateToken([
                                                  'user',
                                                  'admin'
                                              ]), (req, res) => {
    const index = parseInt(req.params.index);
    usersController.getUser(index, res);
});

router.get('/users', authenticateToken([
                                           'user',
                                           'admin'
                                       ]), (req, res) => {
    usersController.getAllUsers(res);
});


export default router;