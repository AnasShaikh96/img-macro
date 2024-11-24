import mongoose from 'mongoose';
import { DataTypes } from 'sequelize';

const CompanyModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
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
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
};
