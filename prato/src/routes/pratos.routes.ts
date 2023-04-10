import {Router} from 'express'
import PratoController from '../controllers/PratoController';
import {validateToken} from '../middlewares/AuthMiddleware'
import multer = require('multer');
import path = require('path')

const routes = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

routes.post("/create", validateToken, upload.single("image"), PratoController.create)
routes.put("/update/:id", validateToken, upload.single("image"), PratoController.update)
routes.get("/index", validateToken, PratoController.index)
routes.get("/:id", validateToken, PratoController.view)

export default routes;