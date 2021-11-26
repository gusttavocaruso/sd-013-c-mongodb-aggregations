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
  {
    $project: { // Filtrando campos
      _id: false,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: { // Ordenando resultados
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
]);
