const Application = require('../models').Application
const errorRes = require('../responses/error_response')

module.exports = async(req, res, next) => {
    try {


        const application = await Application.getId(req.params.id)

        if (application.userId !== req.body.user.id) {
            return errorRes(res, 400, 'Você não tem permissão para acessar esse recurso.')
        }

        next()
    } catch (error) {
        console.log(error)
        return errorRes(res, 404, 'Application não encontrado.', error)
    }
}