import mongoose, { Schema } from "mongoose";

export interface Prato {
    name: string;
    description: string;
    picture: string;
    nutri_table: any;
    type: string;
}

export interface PratoDocument extends Prato, mongoose.Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

const pratoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: true,
    },
    nutri_table:{
        type: Schema.Types.Mixed,
        /* {
            morning: Number,
            night: Number,
        } */
        required: true,
    },
},{timestamps: true}
); 


export default mongoose.model<PratoDocument>("Prato", pratoSchema)