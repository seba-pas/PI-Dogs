const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "temperaments",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
    },
    {
      timestamps: false
      
    }
  );
};
