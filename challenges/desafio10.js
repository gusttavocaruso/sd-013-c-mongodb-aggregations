db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      mediaDuracao: {
        $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duration: 1,
      duracaoMedia: {
        $round: [{ $divide: ["$mediaDuracao", 1000 * 3600] }, 2],
      },
    },
  },
]);
