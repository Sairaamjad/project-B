const db = require("../models/index.js");


const movieCreate = async (req, res) => {
  const { title,  releaseYear, favorite } = req.body;
  const image = req?.file?.filename;

   console.log(image,"image here")
  try {
    const movie = await db.Movie.create({
      title,
      releaseYear,
      favorite,
      picture:image,
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const movieAll = async (req, res) => {
  const { page = 1, limit = 8} = req.query;

  try {
    const offset = (page - 1) * limit;
    const data = await db.Movie.findAndCountAll({
      offset,
      limit: parseInt(limit), // Ensure limit is a number
    });
    const totalPages = Math.ceil(data.count / limit);
    res.status(200).json({
      movies: data.rows,
      totalPages,
      currentPage: page,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong" + e,
    });
  }
};


const getOne = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await db.Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ movie });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong" + err,
    });
  }
};

// Update record
const movieUpdate = async (req, res) => {
  const id = req.params.id;
  const { title,  releaseYear, favorite} = req.body;
  const image = req?.file?.filename;

  const updateMovie = {
    title,
    releaseYear,
    favorite,
    picture:image,
  };

  try {
    const [updatedRowsCount] = await db.Movie.update(updateMovie, {
      where: { id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const updatedMovie = await db.Movie.findByPk(id);
    res.status(200).json(updatedMovie);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" + err });
  }
};

const movieDel = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedRowsCount = await db.Movie.destroy({
      where: { id },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" + err });
  }
};

module.exports = { movieCreate, movieAll, getOne, movieDel, movieUpdate };
