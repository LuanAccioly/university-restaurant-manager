import {Request, Response} from 'express'
import Prato from '../models/Prato'
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs';

class PratoController {
    async create(req: Request, res: Response) {
        const {
            name,
            description,
            nutri_table,

        } = req.body;

        const { filename } = req.file

        try {
            const prato = await Prato.create({
                name,
                description,
                nutri_table,
                picture: filename,
            })

            return res.json(prato);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do usuário"
            })
        }
    }

    async update(req: Request, res: Response) {
        const {
            name,
            description,
            nutri_table,
        } = req.body;

        const {
            id
        } = req.params;

        const { filename } = req.file

        const prato = await Prato.findOne({
            id
        })

        const imagePath = `./images/${prato.picture}`;

        try {
            await Prato.updateOne({
                id,
                name,
                description,
                nutri_table,
                picture: filename,
            }).then(result => {
                if(result) {
                    fs.unlinkSync(imagePath);

                    return res.status(200).json({
                        message: "Prato atualizado com sucesso"
                    });
                }
            }) 
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do usuário"
            })
        }
    }

    async index(req: Request, res: Response) {
        const {
            id
        } = req.params;


        try {
            const pratos = await Prato.find()

            return res.json(pratos);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do usuário"
            })
        }
    }

    async view(req: Request, res: Response) {
        const {
            id
        } = req.params;


        try {
            const prato = await Prato.findOne({
                id
            })

            return res.json(prato);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do usuário"
            })
        }
    }

}

export default new PratoController