// models/Movie.js
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
    },
    picture: {
      type: DataTypes.STRING, 
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true,
  });

  return Movie;
};
