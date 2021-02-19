const UserSkill = require('../models').UserSkill

const ResourceController = require('./resource_controller');

class UserSkillsController extends ResourceController {
    constructor() {
        super();
        this.setModel(UserSkill)
    }
}

module.exports = new UserSkillsController