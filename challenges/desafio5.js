const actors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  { $match:
    {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: [actors] },
    },
  },
  { $addFields: { num_favs: { $size: { $setIntersection: ["$cast", actors] } } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: false, title: true } },
  { $skip: 24 },
  { $limit: 1 },
]);
// https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/
// https://docs.mongodb.com/manual/reference/operator/aggregation/size/
