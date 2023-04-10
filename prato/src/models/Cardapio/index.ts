import mongoose, { Schema } from "mongoose";

export interface Cardapio {
    pp_1: string;
    pp_2: string;
    fast: string;
    grelha: string;
    veg: string;
    guarnicao: string;
    salad_cr: string;
    salad_cuz: string;
    sobremesa: string;
    suco: string;
}

export interface CardapioDocument extends Cardapio, mongoose.Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

const cardapioSchema = new mongoose.Schema({
    pp_1:{
        type: String,
        required: true,
    },
    pp_2:{
        type: String,
        required: true,
    },
    fast:{
        type: String,
        required: true,
    },
    grelha:{
        type: String,
        required: true,
    },
    veg:{
        type: String,
        required: true,
    },
    guarnicao:{
        type: String,
        required: true,
    },
    salad_cr:{
        type: String,
        required: true,
    },
    salad_cuz:{
        type: String,
        required: true,
    },
    sobremesa:{
        type: String,
        required: true,
    },
    suco:{
        type: String,
        required: true,
    },
},{timestamps: true}
); 


export default mongoose.model<CardapioDocument>("Cardapio", cardapioSchema)