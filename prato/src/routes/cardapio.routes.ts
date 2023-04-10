import {Router} from 'express'
import CardapioController from '../controllers/CardapioController';
import {validateToken} from '../middlewares/AuthMiddleware'


const routes = Router();


routes.post("/create", validateToken,  CardapioController.create)
routes.put("/update/:id", validateToken,  CardapioController.update)
routes.get("/index", validateToken, CardapioController.index)
routes.get("/:id", validateToken, CardapioController.view)

export default routes;