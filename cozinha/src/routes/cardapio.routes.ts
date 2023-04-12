import {Router} from 'express'
import CardapioController from '../controllers/CardapioController';
import {validateToken} from '../middlewares/AuthMiddleware'


const routes = Router();


routes.post("/create", validateToken,  CardapioController.create)
routes.put("/update/:menu_date/:turn", validateToken,  CardapioController.update)
routes.get("/index", CardapioController.index)
routes.get("/:menu_date/:turn", CardapioController.view)

export default routes;