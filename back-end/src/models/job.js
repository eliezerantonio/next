'use strict';
const {
    Model,
    Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Job extends Model {

        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
                as: "Hirer" //contratante
            })

            this.belongsToMany(models.Skill, {
                through: "JobSkills", // pra quem
                foreignKey: "jobId",
                targetKey: "id",
                as: "Skills"
            })
        }

        static async search(query) {

            const limit = query.limit ? parseInt(query.limit) : 20;
            const offset = query.offset ? parseInt(query.offset) : 0

            let where = {}
            if (query.title) where.title = {
                [Op.like]: `%${query.title}%`
            }

            if (query.userId) where.userId = query.userId

            const { rows, count } = await Job.findAndCountAll({
                include: [{
                    model: this.sequelize.models.User,
                    as: "Hirer"
                }, {
                    model: this.sequelize.models.Skill,
                    as: "Skills"
                }],
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
            };

        }
        static async getId(id) {
            return await Job.findByPk(id, {
                include: [{
                    model: this.sequelize.models.User,
                    as: "Hirer"
                }, {
                    model: this.sequelize.models.Skill,
                    as: "Skills"
                }]
            })
        }

        //subescrevendo create

        static async create(data) {
                const job = await super.create(data)
                if (data.Skills) {
                    await job.setSkills(data.Skills)
                }
                return job;

            }
            //subescrevendo update
        async update(data) {
            const job = await super.update(data)
            if (data.Skills) {
                await job.setSkills(data.Skills)
            }
            return job;

        }

    };
    Job.init({
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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O título deve ser informado.'
                }
            }
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
        },
        deadline: {
            type: DataTypes.DATE
        },
        selectedApplicationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {

                async isInApplications(value) {
                    try {
                        if (!value) return
                        const application = await this.sequelize.models.Application.getId(value)
                        if (!application) {
                            throw new Error('Candidatura associada não pode ser encontrada');
                        }

                        if (application.jobId !== this.id) {
                            throw new Error('Candidatura associada não está relacionada a este projeto');
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            }
        }

    }, {
        sequelize,
        modelName: 'Job',
    });
    return Job;
};