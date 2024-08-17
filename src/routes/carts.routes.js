import { Router } from "express"; // Importación del router de Express
import { passportCall, authorization } from "../middlewares/passport.middleware.js";//Importamos el middleware de rol de usuario
import cartsController from "../controllers/carts.controllers.js"//Import controlador carritos
import { checkProductAndCart } from "../middlewares/checkProductsAndCarts.middleware.js"//Import de validación de productos y carritos

const router = Router();// Creación del router

router.post("/", passportCall("jwt"), authorization("user"), cartsController.createCart );// Ruta para crear un nuevo carrito

router.get("/:cid", passportCall("jwt"), authorization("user"), cartsController.getCartById);// Ruta para obtener los productos de un carrito por su ID

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsController.addProductToCart );// Ruta para agregar un producto a un carrito

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsController.updateQuantityProductInCart);//Ruta para modificar la quantity del producto por parametro

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsController.deleteProductInCart);//Ruta para borrar un producto del carrito por ID

router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsController.deleteAllProductsInCart);//Ruta para vaciar el carrito por ID

router.get("/:cid/purchase", passportCall("jwt"), authorization("user"), cartsController.purchaseCart );//Ruta para 

export default router;//Export el router