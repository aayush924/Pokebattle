"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require("axios");
let PORT = "https://pokeapi.co/api/v2/pokemon/";
function getUniqueRandomNumbers(num, limit) {
    let arr = [];
    while (arr.length < num) {
        let r = Math.floor(Math.random() * limit);
        if (arr.indexOf(r) === -1)
            arr.push(r);
    }
    return arr;
}
exports.getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pokemon = [];
        const arr = getUniqueRandomNumbers(1, 500);
        for (let i = 0; i < arr.length; i++) {
            const { data } = yield axios.get(`${PORT}${arr[i]}`, {
                headers: { "Accept-Encoding": "gzip,deflate,compress" },
            });
            const moveArr = getUniqueRandomNumbers(4, data.moves.length);
            let moves = [];
            for (let j = 0; j < moveArr.length; j++) {
                const result = yield axios.get(`${data.moves[moveArr[j]].move.url}`, {
                    headers: { "Accept-Encoding": "gzip,deflate,compress" },
                });
                let filteredData = {
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
    }
    catch (error) {
        return next(new ErrorResponse(500, error.message));
    }
});
