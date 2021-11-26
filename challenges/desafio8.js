db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        airlines: "$airlines",
      },
      pipeline: [
        { $match: {
          $expr: {
            $eq: ["$$airlines", "$airline.name"],
          },
        },
        },
        {
          $project: {
            _id: false,
            airplane: "$airplane",
          },
        },
      ],
      as: "routes",
    },
  },
  {
    $unwind: "$routes",
  },
  {
    $match: {
      "routes.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
