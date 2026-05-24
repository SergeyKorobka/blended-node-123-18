import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
},
    {
        timestamps: true,
        versionKey: false
})



userSchema.methods.toJSON = function () {
    const object = this.toObject();
    delete object.password;
    return object;
}

export const User = model('User', userSchema);
