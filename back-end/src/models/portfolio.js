'use strict';
const {
    Model,
    Op
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

    class Portfolio extends Model {

        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'User'
            })
        }

        static async search(query, limit, offset) {


            let where = {}
            where.userId = query.userId;

            if (query.title) where.title = {
                [Op.like]: `%${query.title}%`
            }
            const { rows, count } = await Portfolio.findAndCountAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: where,
                limit: limit < 100 && limit > 0 ? limit : 20,
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
            return await Portfolio.findByPk(id)
        }


    };
    Portfolio.init({
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
            }
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
            allowNull: false
        },
        pic: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Portfolio',
    });
    return Portfolio;
};