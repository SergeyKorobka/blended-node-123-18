import { celebrate, Joi, Segments } from "celebrate";

export const registerValidation = celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
})

export const loginValidation = celebrate({
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
},
    {
        abortEarly: false
})
