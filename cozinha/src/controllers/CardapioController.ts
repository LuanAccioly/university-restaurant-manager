import {Request, Response} from 'express'
import Cardapio from '../models/Cardapio'
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs';
import Prato from '../models/Prato';

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
            turn,
            menu_date
        } = req.body;

        if(!req.user.manager) return res.sendStatus(401)

        try {
            const cardapioExists = await Cardapio.findOne({
                menu_date,
                turn
            })

            if(cardapioExists) {
                return res.status(403).json({
                    error: "error",
                    message: "Cardápio para a data e turno informado já existe"
                })
            }

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
                turn,
                menu_date
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
            turn: turn_update,
            menu_date: menu_date_update
        } = req.body;

        const {
            menu_date,
            turn
        } = req.params;


        const cardapio = await Cardapio.findOne({
            menu_date,
            turn
        })

        if(!req.user.manager) return res.sendStatus(401)

        if(!cardapio){
            return res.status(400).json({
                error: "error",
                message: "Cardápio não encontrado"
            })
        }

        const cardapioExists = await Cardapio.findOne({
            menu_date: menu_date_update,
            turn: menu_date_update
        })

        if(cardapioExists) {
            return res.status(403).json({
                error: "error",
                message: "Cardápio para a data e turno informado já existe"
            })
        }

        try {
            await Cardapio.updateOne({ 
                menu_date,
                turn 
            }, 
            {
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
                turn: turn_update,
                menu_date: menu_date_update
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

        try {
            const cardapios = await Cardapio.find().then(pratos => pratos.map(prato => prato.toJSON()))

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
            menu_date,
            turn
        } = req.params;


        try {
            const cardapio = await Cardapio.findOne({
                menu_date,
                turn
            })

            const pp1Doc = await Prato.findById(cardapio.pp_1);
            const pp2Doc = await Prato.findById(cardapio.pp_2);
            const fastDoc = await Prato.findById(cardapio.fast);
            const grelhaDoc = await Prato.findById(cardapio.grelha);
            const vegDoc = await Prato.findById(cardapio.veg);
            const guarnicaoDoc = await Prato.findById(cardapio.guarnicao);
            const saladCrDoc = await Prato.findById(cardapio.salad_cr);
            const saladCuzDoc = await Prato.findById(cardapio.salad_cuz);
            const sobremesaDoc = await Prato.findById(cardapio.sobremesa);
            const sucoDoc = await Prato.findById(cardapio.suco);

            Object.assign(cardapio, {
                ...cardapio,
                pp_1: pp1Doc,
                pp_2: pp2Doc,
                fast: fastDoc,
                grelha: grelhaDoc,
                veg: vegDoc,
                guarnicao: guarnicaoDoc,
                salad_cr: saladCrDoc,
                salad_cuz: saladCuzDoc,
                sobremesa: sobremesaDoc,
                suco: sucoDoc
            })

            return res.json(cardapio);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha na procura do Cardapio"
            })
        }
    }

    async delete(req: Request, res: Response) {
        const {
            menu_date,
            turn
        } = req.params;


        try {
            await Cardapio.findOneAndDelete({
                menu_date,
                turn
            })
        
            return res.status(200).json({
                message: "Cardapio excluido com sucesso"
            })
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha na exclusão do Cardapio"
            })
        }
    }

}

export default new CardapioController