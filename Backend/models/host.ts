import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../config/db';

interface HostAttributes {
  name: string;
  email: string;
  mobile: number;
  password: string;
}

class Host extends Model<HostAttributes> {}

Host.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
  }
);

export default Host;
