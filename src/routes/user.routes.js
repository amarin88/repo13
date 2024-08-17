import { Router } from "express"; //Import router de express
import usersControllers from "../controllers/users.controllers.js";

const router = Router(); //Inicializador del router de express

router.post("/email/reset-password", usersControllers.sendEmailResetPassword);
router.post("/reset-password", usersControllers.resetPassword);



export default router;