import {
  getGames,
  getGamesByCategory,
  getGamesCount,
  getGame,
  putGame,
  getPublicGames,
} from "./controller/games.js";

import { getCommentsByGame, putComment } from "./controller/comments.js";

import { getCategories } from "./controller/categories.js";

import {
  register,
  login,
  logout,
  getSensibleData,
} from "./controller/users.js";

const routes = (app) => {
  app.route("/api/games").get(getGames);

  app.route("/api/games/public").get(getPublicGames);

  app.route("/api/games/category/:category").get(getGamesByCategory);

  app.route("/api/games/count").get(getGamesCount);

  app.route("/api/game/:id").get(getGame);

  app.route("/api/game").put(putGame);

  app.route("/api/game/:gameId/comments").get(getCommentsByGame);

  app.route("/api/game/:gameId/comment").put(putComment);

  app.route("/api/categories").get(getCategories);

  app.route("/api/register").post(register);

  app.route("/api/login").post(login);

  app.route("/api/logout").get(logout);

  app.route("/api/profile/me").get(getSensibleData);
};

export default routes;
