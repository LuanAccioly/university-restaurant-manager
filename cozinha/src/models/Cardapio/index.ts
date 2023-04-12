import mongoose, { Schema } from "mongoose";

export interface Cardapio {
    pp_1: any;
    pp_2: any;
    fast: any;
    grelha: any;
    veg: any;
    guarnicao: any;
    salad_cr: any;
    salad_cuz: any;
    sobremesa: any;
    suco: any;
    turn: string;
    menu_date: string;
}

export interface CardapioDocument extends Cardapio, mongoose.Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

const cardapioSchema = new mongoose.Schema({
    pp_1:{
        type: Schema.Types.Mixed,
        required: true,
    },
    pp_2:{
        type: Schema.Types.Mixed,
        required: true,
    },
    fast:{
        type: Schema.Types.Mixed,
        required: true,
    },
    grelha:{
        type: Schema.Types.Mixed,
        required: true,
    },
    veg:{
        type: Schema.Types.Mixed,
        required: true,
    },
    guarnicao:{
        type: Schema.Types.Mixed,
        required: true,
    },
    salad_cr:{
        type: Schema.Types.Mixed,
        required: true,
    },
    salad_cuz:{
        type: Schema.Types.Mixed,
        required: true,
    },
    sobremesa:{
        type: Schema.Types.Mixed,
        required: true,
    },
    suco:{
        type: Schema.Types.Mixed,
        required: true,
    },
    turn:{
        type: String,
        required: true,
    },
    menu_date:{
        type: String,
        required: true,
    },
},{timestamps: true}
); 


export default mongoose.model<CardapioDocument>("Cardapio", cardapioSchema)