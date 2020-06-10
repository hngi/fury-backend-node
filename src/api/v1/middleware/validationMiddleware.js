import Joi from 'joi';
import CustomError from '../../utils/customError'

const validationMiddleware = (schema) => {
    return (req, res, next) => {

        const result = Joi.validate(req.body, schema)
        const { error } = result;
        const valid = error == null;
        if (valid) {
            next()
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            const err = new CustomError(401, message)
            next(err)
        }
    }
}

export default validationMiddleware