import {Request, Response} from 'express'
import Cardapio from '../models/Cardapio'
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs';

class CardapioController {
    async create(req: Request, res: Response) {
        const {
            pp_1,
            pp_2,
            fast,
            grelha,
            veg,
            guarnicao,
            salad_cr,
            salad_cuz,
            sobremesa,
            suco,
        } = req.body;

        if(!req.user.manager) return res.sendStatus(401)

        try {
            const cardapio = await Cardapio.create({
                pp_1,
                pp_2,
                fast,
                grelha,
                veg,
                guarnicao,
                salad_cr,
                salad_cuz,
                sobremesa,
                suco,
            })

            return res.json(cardapio);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do cardapio"
            })
        }
    }

    async update(req: Request, res: Response) {
        const {
            pp_1,
            pp_2,
            fast,
            grelha,
            veg,
            guarnicao,
            salad_cr,
            salad_cuz,
            sobremesa,
            suco,
        } = req.body;

        const {
            id
        } = req.params;


        const prato = await Cardapio.findOne({
            id
        })

        if(!req.user.manager) return res.sendStatus(401)

        if(!prato) return res.sendStatus(400)


        try {
            await Cardapio.updateOne({
                id,
                pp_1,
                pp_2,
                fast,
                grelha,
                veg,
                guarnicao,
                salad_cr,
                salad_cuz,
                sobremesa,
                suco,
            }).then(result => {
                if(result) {

                    return res.status(200).json({
                        message: "Cardapio atualizado com sucesso"
                    });
                }
            }) 
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do Cardapio"
            })
        }
    }

    async index(req: Request, res: Response) {

        if(!req.user.manager) return res.sendStatus(401)

        try {
            const cardapios = await Cardapio.find()

            return res.json(cardapios);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do Cardapio"
            })
        }
    }

    async view(req: Request, res: Response) {
        const {
            id
        } = req.params;

        if(!req.user.manager) return res.sendStatus(401)

        try {
            const cardapio = await Cardapio.findOne({
                id
            })

            return res.json(cardapio);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do Cardapio"
            })
        }
    }

}

export default new CardapioController