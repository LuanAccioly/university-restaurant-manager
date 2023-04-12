import {Router} from 'express'
import pratosRoutes from './pratos.routes';
import cardapiosRoutes from './cardapio.routes';

const routes = Router();

routes.use("/pratos", pratosRoutes)
routes.use("/cardapio", cardapiosRoutes)

export default routes;