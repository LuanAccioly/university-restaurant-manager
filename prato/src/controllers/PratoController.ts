import {Request, Response} from 'express'
import Prato from '../models/Prato'
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs';
import { Types } from 'mongoose';

class PratoController {
    async create(req: Request, res: Response) {
        const {
            name,
            description,
            nutri_table,
            type
        } = req.body;

        const { filename } = req.file

        try {
            const prato = await Prato.create({
                name,
                description,
                nutri_table: JSON.parse(nutri_table),
                picture: filename,
                type
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
            type,
        } = req.body;

        const {
            id
        } = req.params;

        const prato = await Prato.findOne({
            id
        })


        if(!req.file) {
            try {
                await Prato.updateOne({
                    id,
                    name,
                    description,
                    nutri_table,
                    picture: prato.picture,
                    type
                }).then(result => {
                    if(result) {    
                        return res.status(200).json({
                            message: "Prato atualizado com sucesso"
                        });
                    }
                }) 
            } catch (error) {
                return res.status(400).json({
                    error: error,
                    message: "Falha no registro do prato"
                })
            }
            return
        }

        const { filename } = req.file

        const imagePath = `./images/${prato.picture}`;

        try {
            await Prato.updateOne({
                id,
                name,
                description,
                nutri_table,
                picture: filename,
                type
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
                message: "Falha no registro do prato"
            })
        }
    }

    async index(req: Request, res: Response) {
        const {
            id
        } = req.params;


        try {
            const pratos = await Prato.find().lean().exec()

            console.log(pratos)

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

        console.log(id)

        try {
            const prato = await Prato.findOne({
                _id: new Types.ObjectId(id)
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