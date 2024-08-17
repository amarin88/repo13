import { Router } from "express"; // Import del router de Express
import productsController from "../controllers/products.controllers.js"; //Import controller de productos
import { authorization, passportCall } from "../middlewares/passport.middleware.js"; //Import el middleware de rol de usuario
import { productDataValidator } from "../validators/productData.validator.js"; //Import el validador de productos


const router = Router();//Creación del router

router.get("/", productsController.getAll );//Ruta para obtener todos los productos

router.get("/mockingproducts", productsController.createProductsMocks ); //Ruta de los products creados con faker

router.get("/:pid", productsController.getById);//Ruta para obtener un producto por su ID

router.post("/", passportCall("jwt"), authorization("admin"), productDataValidator, productsController.create);//Ruta para agregar un nuevo producto

router.put("/:pid", passportCall("jwt"), authorization("admin"), productsController.update);//Ruta para actualizar un producto existente

router.delete("/:pid", passportCall("jwt"), authorization("admin"), productsController.deleteOne); //Ruta para eliminar un producto por su ID


export default router;//Export del router
