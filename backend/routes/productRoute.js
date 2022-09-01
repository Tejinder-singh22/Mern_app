const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/new").post(isAuthenticatedUser,createProduct); /*so before adding user, it goes to middleware auth for checking if token stored in cookies is belongs to valid user or not  */ 

router.route("/product/:id").put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser, deleteProduct).get(getProductDetails);

module.exports = router