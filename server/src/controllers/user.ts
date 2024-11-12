import { DataTypes } from 'sequelize';

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
};

module.exports = {
  initiliaze: function (sequelize: any) {
    this.model = sequelize.define('User', UserModel);
  },
  createUser: function (user: any) {
    return this.model.create(user);
  },
};
