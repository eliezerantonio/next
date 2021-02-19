'use strict';
const {
    Model,
    Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Application extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'Freelancer'
            })

            this.belongsTo(models.Job, {
                foreignKey: 'jobId',
                targetKey: 'id',
                as: 'Job'
            })
        }

        static async search(query) {
            const limit = query.limit ? parseInt(query.limit) : 20
            const offset = query.offset ? parseInt(query.offset) : 0

            let where = {}
            if (query.jobId) where.jobId = query.jobId
            if (query.freelancerId) where.userId = query.freelancerId

            const rows = await Application.findAll({
                where: where,
                limit: limit,
                offset: offset,
                include: [{
                        model: this.sequelize.models.User,
                        as: 'Freelancer',
                        include: [{
                            model: this.sequelize.models.UserSkill,
                            as: 'UserSkills',
                            include: [{
                                model: this.sequelize.models.Skill,
                                as: 'Skill',
                            }]
                        }]
                    },
                    {
                        model: this.sequelize.models.Job,
                        as: 'Job',
                        include: [{
                                model: this.sequelize.models.User,
                                as: 'Hirer',
                            },
                            {
                                model: this.sequelize.models.Skill,
                                as: 'Skills'
                            }
                        ]
                    }
                ]
            })

            const count = await Application.count({
                where: where,
                limit: limit,
                offset: offset
            })

            return {
                entities: rows,
                meta: {
                    count: count,
                    limit: limit,
                    offset: offset
                }
            }
        }

        static async getId(id) {
            return await Application.findByPk(id, {
                include: [{
                        model: this.sequelize.models.User,
                        as: 'Freelancer',
                        include: [{
                            model: this.sequelize.models.UserSkill,
                            as: 'UserSkills',
                            include: [{
                                model: this.sequelize.models.Skill,
                                as: 'Skill',
                            }]
                        }]
                    },
                    {
                        model: this.sequelize.models.Job,
                        as: 'Job',
                        include: [{
                                model: this.sequelize.models.User,
                                as: 'Hirer',
                            },
                            {
                                model: this.sequelize.models.Skill,
                                as: 'Skills'
                            }
                        ]
                    }
                ]
            })
        }
    };
    Application.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O userId deve ser informado.'
                },
                async isInUsers(value) {
                    try {
                        const user = await this.sequelize.models.User.getId(value)
                        if (!user) {
                            throw new Error('Usuario associado não pode ser encontrado');
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            },
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O jobId deve ser informado.'
                },
                async isInJobs(value) {
                    try {
                        const job = await this.sequelize.models.Job.getId(value)
                        if (!job) {
                            throw new Error('Job associado não pode ser encontrado');
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'a descrição deve ser informado.'
                }
            }
        },
        budget: {
            type: DataTypes.NUMERIC
        }
    }, {
        sequelize,
        modelName: 'Application',
    });
    return Application;
};