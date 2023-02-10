import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

// Create User with Address
router.post('/user', userController.createAccount);

// Get Users
router.get('/users', userController.getUsers);

// Get User by Id
router.get('/user/:id', userController.getUsersById);

// Update User
router.put('/user/:id', userController.updateUsers);

// Delete User by Id
router.delete('/user/:id', userController.deleteUsers);

export default router;
