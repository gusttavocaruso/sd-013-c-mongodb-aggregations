// Referências para filtrar arrays com apenas 1 elemento: https://stackoverflow.com/questions/7811163/query-for-documents-where-array-size-is-greater-than-1

db.movies.aggregate([
  {
    $sort: {
      title: 1,
    },
  },
  {
    $project: {
      _id: 0,
      title_spĺit: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      "title_spĺit.1": { $exists: false },
    },
  },
]);
