db.movies.aggregate([
  {
    $sort: { // Ordenando resultados primeiro
      title: 1,
    },
  },
  {
    $project: { // Criando novo campo
      _id: false,
      title_split: {
        $split: ["$title", " "], // Quebrar "palavras" onde espaço for encontrado
      },
    },
  },
  {
    $match: { // Filtrando documentos baseado no tamanho do array title_split
      title_split: { $size: 1 },
    },
  },
]);
