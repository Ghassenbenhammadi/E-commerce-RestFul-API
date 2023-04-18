const express = require('express');
const {createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObj
} = require('../services/subCategoryService');
const{createSubCategoryValidator,
    getSubCategoryValidator}= require("../utils/validators/subCategoryValidator")


// mergeParams: allow us to accees parameters on other router
const router = express.Router({mergeParams : true});
router.route("/").post(setCategoryIdToBody,createSubCategoryValidator,createSubCategory)
.get(createFilterObj,getSubCategories);
router.route("/:id").get(getSubCategoryValidator,getSubCategory)
.put(updateSubCategory)
.delete(deleteSubCategory);
module.exports = router;