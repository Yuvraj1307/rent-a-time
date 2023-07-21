import { DataTypes, Model, Sequelize, Optional  } from 'sequelize';
import db from '../config/db';
import Host from './host';

enum Types{
   delux= "Delux",
   superd= "Super delux",
   platinum= "Platinum"
}

interface PropertyAttributes {
    id: number; 
    name: string;
    address: string;
    album: string[];
    price: number;
    type:Types;
    availableroom:number;
    currating:number;
    hostId: number;
  }

//   interface PropertyCreationAttributes extends Optional<PropertyAttributes, 'id'> {}


//   class Property extends Model<PropertyAttributes>  {
    // public id!: number;
    // public name!: string;
    // public address!: string;
    // public album: string[];
    // public price: number;
    // public type:Types;
    // public availableroom:number;
    // public currating:number;


    // public hostId!: number;
  
    //  public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
  
    // // Define associations with other models
    // // Here, we define the association with the Host model
    // // Property belongs to one Host (1:1 relationship)
    // public readonly host?: Host;

    
//   }


class Property extends Model<PropertyAttributes>{}

  Property.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      album: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue:[]
       },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },    
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availableroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      // Other property attributes...
      hostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Host,
          key: 'id',
        },
      },
    },
    {
      sequelize: db,
      tableName: 'properties',
    }
  );




//   Property.belongsTo(Host, {
//     foreignKey: 'hostId',
//   });
  
  // Define the reverse association (optional) - Host has many Properties (1:N relationship)
//   Host.hasMany(Property, {
//     foreignKey: 'hostId',
//   });
  
  export default Property
  