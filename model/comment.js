import commentModel from "../database/commentSchema";

const all = async () => {
  const response = await commentModel.find();
  return response;
};

const allByGame = async (gameId) => {
  const response = await commentModel.find({ gameId: gameId });
  return response;
};

const count = async () => {
  await commentModel.count({}, (err, result) => {
    if (err) {
      return err;
    } else {
      return result;
    }
  });
};

const create = async ({ gameId, username, email, text }) => {
  let doc = new commentModel({
    gameId: gameId,
    username: username,
    email: email,
    text: text,
    createdDate: new Date(),
  });
  await doc.save();
};

export default {
  all,
  allByGame,
  create,
};
