const express = require('express');
const { User, Product } = require('../../models/product');
const router = express.Router();

router.get("/", (req, res) => {
   res.render('Home')
})
router.get('/allProducts', async (req, res) => {
   await Product.find().then((result) => {
      res.render('allProducts', { products: result })
   })
      .catch(err => console.log(err));
});


router.get("/addNewProduct", async (req, res) => {
   res.render('addNewProduct');
})

router.post("/addNewProduct", async (req, res) => {
   const product = new Product(req.body);
   await product.save().then((result) => {
      res.redirect('/products/allProducts');
   })
      .catch(err => console.log(err));
})

router.get("/getProductById", async (req, res) => {
   const id = req.query.id;
   if (!id || id.length != 24) {
      return res.render('getProduct', { products: null });
   }
   await Product.findById(id).then((result) => {
      res.render('getProduct', { products: result });
   })
      .catch(err => console.log(err));
})
router.get("/getProductByName", async (req, res) => {
   const name = req.query.Name;
   await Product.findOne({ Name: name }).then((result) => {
      res.render('getProduct', { products: result });
   })
      .catch(err => console.log(err));
})
router.get("/getProductByCategory", async (req, res) => {
   const category = req.query.Category;
   await Product.find({ Category: category }).then((result) => {
      if (result.length === 0) {
         result = null;
      }
      res.render('getProduct', { products: result });
   })
      .catch(err => console.log(err));
})
router.delete("/deleteProduct/:id", async (req, res) => {
   id = req.params.id;
   await Product.findByIdAndDelete(id).then((result) => {
      res.json({ redirect: "/products/allProducts" });
   })
      .catch(err => console.log(err));
})

module.exports = router;