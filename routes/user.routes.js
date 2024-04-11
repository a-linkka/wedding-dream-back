import { Router } from "express";
const router = new Router();
import userControllers from "../controllers/user.controllers.js";
import { uploadUser } from "../middleware/uploadUser.js";
import { uploadPortfolio } from "../middleware/uploadPortfolio.js";

router.post('/createUser', uploadUser.single('image'), userControllers.createUser);
router.get('/user/:id', userControllers.getOneUser);
router.post('/userPhone', userControllers.getOneUserPhone);
router.put('/user', userControllers.updateUser);
router.delete('/deleteUser/:id', userControllers.deleteUser);
router.post('/addPortfolio/:id', uploadPortfolio.single('image'), userControllers.addPortfolio)
router.get('/getPortfolio/:id', userControllers.getPortfolio)
router.put('/updateUser/:id', userControllers.updateUser)

export default router