import express from 'express';
import * as uploadController from '../controllers/upload.controller';
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

// Upload images
router.post('/uploads', upload.single('file'), uploadController.uploadFile);

export default router;