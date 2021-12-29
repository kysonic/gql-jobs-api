db.jobs
  .aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
  ])
  .pretty();

db.jobs
  .aggregate([
    {
      $match: {
        $text: {
          $search: "Hey, we don't have",
        },
      },
    },
  ])
  .pretty();
