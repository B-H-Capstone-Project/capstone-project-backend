import express from 'express';
import * as userController from '../controllers/user.controller';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

// Create User with Address
router.post('/user', authController.signUp);

// Get Users
router.get('/users', userController.getUsers);

// Get User by Id
router.get('/user/:id', userController.getUsersById);

// Get Users - Employee - Role=1 or 2
router.get('/users/employee', userController.getUsersEmployee);

// Get Users - Customer - Role=3
router.get('/users/customer', userController.getUsersCustomer);

// Get New Employees - week & %
router.get('/users/newemployee', userController.getNewEmployees);
router.get('/users/newemployee/percentage', userController.getNewEmployeesPercentage);

// Get New Customers - week & %
router.get('/users/newcustomer', userController.getNewCustomers);
router.get('/users/newcustomer/percentage', userController.getNewCustomersPercentage);

// Update User
router.put('/user/:id', userController.updateUsers);

// Delete User by Id
router.delete('/user/:id', userController.deleteUsers);

// ask email for reset password
router.post('/reset-password', userController.requestResetPassword);

router.post('/reset-password/:token', userController.resetPassword);

export default router;
