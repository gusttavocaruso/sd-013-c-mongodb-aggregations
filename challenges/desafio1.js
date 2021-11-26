db.movies.aggregate([
  {
    $match: { // Filtrando documentos
      "imdb.rating": {
        $gte: 7,
      },
      genres: {
        $nin: ["Crime", "Horror"],
      },
      rated: {
        $in: ["PG", "G"],
      },
      languages: {
        $all: ["English", "Spanish"],
      },
    },
  },
]);
