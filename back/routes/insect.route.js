import {Router} from "express";
import InsectController from "../controllers/insect.controller.js";

const router = Router();

router.get('/', InsectController.getAllInsects)
router.get('/:id', InsectController.getInsectById)

export default router;