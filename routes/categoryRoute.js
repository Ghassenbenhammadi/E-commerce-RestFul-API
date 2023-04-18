
const express = require('express');
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} = require("../utils/validators/categoryValidator")
const {getCategories,getCategory,createCategory,updateCategory,deleteCategory} = require('../services/categoryService')
const subcategoriesRoute = require('./subCategoryRoute')


const router = express.Router();

router.use('/:categoryId/subCategories', subcategoriesRoute)

router.route('/')
.get(getCategories)
.post(createCategoryValidator,createCategory);
router.route('/:id')
.get(
// middleware => catch errors from rules if exist
getCategoryValidator,
getCategory)
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory);




module.exports= router;