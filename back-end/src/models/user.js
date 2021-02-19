'use strict';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = 'DSFGSD453435sdgfhdfg%&¨*#¨$%#sdgfsd';
const {
    Model,
    Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {


        static associate(models) {
            this.hasMany(models.UserSkill, {
                as: 'UserSkills'
            })
        }

        static async search(query) {
            const limit = query.limit ? parseInt(query.limit) : 20;
            const offset = query.offset ? parseInt(query.limit) : 0

            let where = {}

            if (query.name) where.name = {
                [Op.like]: `%${query.name}%` //filtrando pelo nome

            }
            if (query.email) where.email = q.query.email;

            const entities = await User.findAndCountAll({
                where: where,
                limit: limit,
                offset: offset
            })

            return {
                entities: entities.rows,
                meta: {
                    count: entities.count,
                    limit: limit,
                    offset: offset
                }
            };
        }

        static async getId(id) {
            return await User.findByPk(id, {
                include: [{
                    model: this.sequelize.models.UserSkill,
                    as: "UserSkills",

                    include: [{
                        model: this.sequelize.models.Skill,
                        as: "Skill",

                    }]
                }]
            })
        }

        static async verifyLogin(email, password) {
            try {
                let user = await User.findOne({
                    where: {
                        email: email
                    }
                });
                if (!user) {
                    throw new Error("Email nao enontrado");
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    throw new Error("Senha nao confere");
                }

                //verificar se usuario esta logado
                let token = jwt.sign({
                    id: user.id
                }, SECRET, {
                    expiresIn: '1d'
                })

                return {
                    user: user,
                    token: token
                }
            } catch (error) {
                throw error;

            }

        }
        static async verifyToken(token) {
                return await jwt.verify(token, SECRET)
            }
            //sconde
        toJSON() {
            const values = Object.assign({}, this.get());
            delete values.password;
            return values;
        }

    };
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: " O nome dever informado"
                }
            }

        },
        description: DataTypes.STRING,
        pic: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: " O E-mail dever informado"
                },
                isEmail: {
                    msg: "Digite E-mail valido"
                }
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                notNull: {
                    msg: "A senha dever informada"
                }
            }

        }
    }, {
        sequelize,
        modelName: 'User',
        underscored: false,
        hooks: {
            beforeSave: (user, options) => {
                try {

                    bcrypt.getRounds(user.password)
                } catch (error) {
                    user.password = bcrypt.hashSync(user.password, 10)
                }
            }
        }
    });




    return User;
};