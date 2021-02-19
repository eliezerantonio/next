'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserSkill extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                    foreignKey: 'userId',
                    targetKey: 'id',
                    as: 'User'
                }),

                this.belongsTo(models.Skill, {
                    foreignKey: 'skillId',
                    targetKey: 'id',
                    as: 'Skill'
                })
        }

        static async search(query) {


        }

        static async getId(id) {
            return await UserSkill.findByPk(id)
        }

        toJSON() {
            const values = Object.assign({}, this.get())

            console.log(values)
            const levels = [
                '',
                'Iniciante',
                'Intermediário',
                'Avançado'
            ]

            return {
                id: values.id,
                skillId: values.Skill ? values.Skill.dataValues.id : '',
                name: values.Skill ? values.Skill.dataValues.name : '',
                level: values.level,
                levelName: levels[values.level]
            }
        }
    };
    UserSkill.init({
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
        skillId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O skillId deve ser informado.'
                },
                async isInSkills(value) {
                    try {
                        const skill = await this.sequelize.models.Skill.getId(value)
                        if (!skill) {
                            throw new Error('Skill associado não pode ser encontrado');
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            },
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                notNull: {
                    msg: 'O nível deve ser informado.'
                },
                isIn: {
                    args: [
                        [
                            1, //Básico
                            2, //Intermediário
                            3 //Avançado
                        ]
                    ],
                    msg: 'São aceitos apenas perfis 1 - Básico, 2 - Intermediário e 3 - Avançado.'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'UserSkill',
    });
    return UserSkill;
};