const axios = require("axios");

let PORT: string = "https://pokeapi.co/api/v2/pokemon/";

function getUniqueRandomNumbers(num: number, limit: number) {
  let arr: number[] = [];
  while (arr.length < num) {
    let r = Math.floor(Math.random() * limit);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

type Moves = {
  name: string;
  id: number;
  accuracy: number;
  power: number;
  type: string;
};

type Pokemon = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  moves: Moves[];
};

exports.getData = async (req: any, res: any, next: any) => {
  try {
    let pokemon: Pokemon[] = [];
    const arr = getUniqueRandomNumbers(1, 500);
    for (let i = 0; i < arr.length; i++) {
      const { data } = await axios.get(`${PORT}${arr[i]}`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      });
      const moveArr = getUniqueRandomNumbers(4, data.moves.length);
      let moves: Moves[] = [];
      for (let j = 0; j < moveArr.length; j++) {
        const result = await axios.get(`${data.moves[moveArr[j]].move.url}`, {
          headers: { "Accept-Encoding": "gzip,deflate,compress" },
        });
        let filteredData: Moves = {
          name: result.data.name,
          id: result.data.id,
          accuracy: result.data.accuracy,
          power: result.data.power,
          type: result.data.type.name,
        };
        moves.push(filteredData);
      }
      let poke = {
        name: data.name,
        id: data.id,
        sprites: {
          front_default: data.sprites.front_default,
          back_default: data.sprites.back_default,
        },
        stats: data.stats,
        types: data.types,
        moves: moves,
      };
      pokemon.push(poke);
    }
    res.status(200).json({
      status: "success",
      data: pokemon,
    });
  } catch (error: any) {
    return next(new ErrorResponse(500, error.message));
  }
};
