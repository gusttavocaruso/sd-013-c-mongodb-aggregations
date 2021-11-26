db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: {
      _id: -1,
      numeroFilmes: -1,
    },
  },
  {
    $project: {
      _id: true,
      numeroFilmes: true,
      mediaIMDB: {
        $round: ["$mediaIMDB", 1],
      },
    },
  },
]);
