import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { isAuth } from '../middleware/auth.middleware';

const router = express.Router();

const signInValidateCredential = [
  body('email').trim().notEmpty().withMessage('Email should be email format'),
  body('password').trim().isLength({ min: 8 }).withMessage('password should be at least 8 characters'),
];

const signUpValidateCredential = [
  body('email').trim().isEmail().withMessage('Email should be email format'),
  body('password').trim().isLength({ min: 8 }).withMessage('password should be at least 8 characters'),
  body('confirm_password').trim().isLength({min: 8}).custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
  body('first_name').trim().isLength({min:1 , max: 25}),
  body('last_name').trim().isLength({min: 1 , max: 25}),
  body('postal_code').trim().isPostalCode('CA').withMessage('Invalid Postal Code'),
  body('phone_number').trim().isNumeric().isLength({min:10, max:10}).withMessage('Invalid Phone Number'),
  body('address_line').trim().notEmpty().withMessage('Must enter an address'),
  body('city').trim().notEmpty().withMessage('Must enter a city'),
  body('province').trim().notEmpty().withMessage('Must enter a province'),
  body('country').trim().notEmpty().withMessage('Must enter a country'),

];

/*
const reservationValidateCredential = [
  body('type').notEmpty(),
]
*/
router.post('/signin', signInValidateCredential, authController.signin);

router.post('/signup', signUpValidateCredential, authController.signUp);

//router.post('/auth/newreservation', reservationValidateCredential, authController.newReservation);

router.get('/me', isAuth, authController.me);

export default router;
