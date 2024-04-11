import { Router } from "express";
const router = new Router();
import postsController from "../controllers/posts.controller.js";
import { uploadPosts } from "../middleware/uploadPosts.js";

router.post('/createPost/:id', uploadPosts.single('image'), postsController.createPost)
router.post('/searchPosts', postsController.searchPosts);
router.get('/onePost/:id', postsController.getOnePost)
router.get('/allPosts', postsController.getAllPosts)
router.get('/allPosts/:id', postsController.getAllPostsID)

export default router