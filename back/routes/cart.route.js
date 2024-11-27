import {Router} from "express";
import CartController from "../controllers/cart.controller.js";

const router = Router();

router.get('/', CartController.getCarts);
router.post('/', CartController.createOrUpdateCart);
router.delete('/:id', CartController.deleteCart);

export default router;