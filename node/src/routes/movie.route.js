const express= require('express');
const movieRouter=express.Router();
const {movieCreate, movieAll,getOne,movieDel,movieUpdate}=require('../controllers/movies.controller.js')
// const { validateBlogCreate } =require('../middleware/blogJoi.js') ;
const upload =require('../middleware/multer.js')

movieRouter.post('/create',upload.single('picture'),movieCreate)
movieRouter.get('/',movieAll)
movieRouter.get('/:id',getOne)
movieRouter.delete('/:id',movieDel)
movieRouter.put('/:id',upload.single('picture'),movieUpdate)

module.exports=movieRouter     