import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

const signInValidateCredential = [
  body("email").trim().notEmpty().withMessage("Email should be email format"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password should be at least 8 characters"),
];

const signUpValidateCredential = [
  body("email").trim().notEmpty().withMessage("Email should be email format"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password should be at least 8 characters"),
];

router.post("/signin", signInValidateCredential, authController.signin);

router.post("/signup", signUpValidateCredential, authController.signUp);


export default router;
