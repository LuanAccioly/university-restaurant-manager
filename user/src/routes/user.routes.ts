import {Router} from 'express'
import UserController from '../controllers/UserController';
import {validateToken} from '../middlewares/AuthMiddleware'

const routes = Router();

routes.post("/", UserController.create)
routes.get("/", validateToken, UserController.index)

export default routes;