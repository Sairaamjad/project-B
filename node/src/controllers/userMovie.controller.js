// controllers/userMovieController.js
const db = require("../models/index.js");


exports.manageFavorites = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.user.id;
    const existingFavorite = await db.UserMovie.findOne({
      where: { user_id: userId, movie_id: movieId }
    });

    if (existingFavorite) {
      await db.UserMovie.destroy({ where: { user_id: userId, movie_id: movieId } });
      res.status(200).json({ message: 'Removed from favorites successfully' });
    } else {
      await db.UserMovie.create({ user_id: userId, movie_id: movieId, isFavorite: true });
      res.status(200).json({ message: 'Added to favorites successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

