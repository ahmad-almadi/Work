const express = require("express");
const blogController = require('../controller/blogController');
const router = express.Router(); 

router.get('/all-blog',blogController.blog_index);
router.get('/new-blog', blogController.blog_creat_get);
router.post('/all-blog', blogController.blog_creat_post);
// router.get('/all-blog/:id', blogController.blog_detail);
router.delete('/all-blog/:id',blogController.blog_delete);

module.exports = router;