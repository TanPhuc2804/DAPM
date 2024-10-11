/**
 * @swagger
 * components:
 *  schemas:
 *      Products:
 *          type: object
 *          required:
 *              -name
 *              -price 
 *              -quantity
 *              -description
 *              -image
 *              -category
 *              -supplier
 *          properties:
 *              _id:
 *                  type: string
 *                  description: ID của product
 *              name:
 *                  type: string     
 *                  description: Tên sản phẩm
 *              price:
 *                  type: number     
 *                  description: Giá tiền của sản phẩm
 *              quantity:
 *                  type: number     
 *                  description: Số lượng sản phẩm
 *              description:
 *                  type: number     
 *                  description: Giới thiệu sản phẩm
 *              image:
 *                  type: []     
 *                  description: Hình sản phẩm
 *              size:
 *                  type: string     
 *                  description: Size của sản phẩm
 *              category:
 *                  type: string     
 *                  description: ID danh mục sản phẩm
 *              supplier:
 *                  type: string
 *                  description: ID của nhà cung cấp    
 */

/**
* @swagger
* tags:
*   name: Products
*   description: API của sản phẩm
* /products/list-product:
*   get:
*     summary: Danh sách tất cả sản phẩm
*     tags: [Products]
*     responses:
*       200:
*         description: Danh sách sản phẩm
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Products'
*
* /products/create-product:
*   post:
*     summary: Tạo sản phẩm
*     tags: [Products]
*     requestBody:
*       required: true
*       content:
*         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       200:
 *         description: Thêm sản phẩm thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products' 
 *       400:
 *          description: Thêm sản phẩm không thành công
 * /products/list-product/{id}:
 *  get:
 *    sumary: Xem chi tiết sản phẩm
 *    tags: [Products]
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Xem chi tiết sản phẩm
 *    responses:
 *      200:
 *          description: Lấy dữ liệu thành công
 *          contents:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Products'
 *      404: 
 *          description: Sản phẩm không tồn tại 
 * /products/update-product/{id}:
 *  post:
 *      sumary: Cập nhật sản phẩm
 *      tags: [Products]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           required: true
 *           description: Lấy sản phẩm
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Products'
 *      responses: 
 *            200:
 *              description: Cập nhật thành công
 *              contents:
 *                  application/json: 
 *                     schema:
 *                        $ref: '#/components/schemas/Products'
 *            401:
 *               description: Bạn chưa có quyền admin
 *            404:
 *               description: The book was not found
 *            500:
 *               description: Some error happened
*/      


const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const { verifyAdmin } = require('../services/jwt')
const router = express.Router();
 
// Public routes
router.get('/list-product', getAllProducts);
router.get('/list-product/:id', getProductById);
router.post('/create-product', verifyAdmin, createProduct);
router.post('/update-product/:id', verifyAdmin, updateProduct);
router.delete('/delete-product/:id', verifyAdmin, deleteProduct);
module.exports = router;