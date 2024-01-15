// routes/userMovieRoutes.js
const express = require('express');
const router = express.Router();
const userMovieController = require('../controllers/userMovie.controller');

router.post('/add-remove-favorites', userMovieController.manageFavorites);

module.exports = router;
