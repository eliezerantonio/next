const Portfolio = require('../models').Portfolio

const ResourceController = require("./resource_controller");

class PortfolioController extends ResourceController {

    constructor() {
        super()
        this.setModel(Portfolio)
    }
    async index(req, res, next) {
        req.query.userId = req.params.userId;
        return await super.index(req, res, next)
    }

    async update(req, res, next) {
        if (req.file) {
            req.body.pic = req.protocol + "//" + req.headers.host + "/uploads/" + req.fil.filename
        }

        return await super.update(req, res, next)
    }
    async store(req, res, next) {
        if (req.file) {
            req.body.pic = req.protocol + '://' + req.headers.host + '/uploads/' + req.file.filename
        }
        return await super.store(req, res, next)
    }

}

module.exports = new PortfolioController