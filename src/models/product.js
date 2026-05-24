import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['books', 'electronics', 'clothing', 'other'],
        default: 'other'
    },
    description: {
        type: String,
        default: ""
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})
export const Product = model("Product", productSchema);
