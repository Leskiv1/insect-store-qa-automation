import { Router } from "express";
import insectController from "../controllers/insect.controller.js";

const router = Router();

router.post('/', insectController.createInsect);
router.delete('/:id', insectController.deleteInsect);
router.put('/:id', insectController.updateInsect);
router.get('/', insectController.getInsects);
router.get('/count', insectController.countWeight);


export default router;
