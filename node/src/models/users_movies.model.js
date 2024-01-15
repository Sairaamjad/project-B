// models/UserMovie.js
module.exports = (sequelize, DataTypes) => {
  const UserMovie = sequelize.define('UserMovie', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'movies',
        key: 'id',
      }
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true,
  });

  return UserMovie;
};
