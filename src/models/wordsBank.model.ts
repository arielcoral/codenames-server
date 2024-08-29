import mongoose, { Document, Schema  } from "mongoose";

export interface WordBank extends Document {
    id: string;
    word: string ;
}

const WorkBankSchema = new Schema<WordBank>({
    word: {
        type: String,
        required: true,
    }
});


export const WorkBankModel = mongoose.model<WordBank>('Word', WorkBankSchema);