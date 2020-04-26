import generator from "./gameGenerator";
import gameModel from "../database/gameSchema";

// Array provide game objects
// these one are build as :
// {id. title, author, bannerPath, name, grade, category, content, createdDate}

const generate = async () => {
  return await generator.generate();
};

const all = async () => {
  const response = await gameModel.find();
  return response;
};

const publicAll = async () => {
  const response = await gameModel.find({ statut: "public" });
  return response;
};

const allByCategory = async (category) => {
  const response = await gameModel.find({ category: category });

  return response;
};

const count = async () => {
  await gameModel.count({}, (err, result) => {
    if (err) {
      return err;
    } else {
      return result;
    }
  });
};

const find = async (id) => {
  const response = await gameModel.findById(id);
  return response;
};

const isExist = async (id) => {
  const response = await gameModel.findById(id);
  if (response) {
    return true;
  } else {
    return false;
  }
};

const create = async ({
  title,
  author,
  bannerPath,
  name,
  grade,
  category,
  content,
  statut,
}) => {
  let doc = new gameModel({
    title: title,
    author: author,
    bannerPath: bannerPath,
    name: name,
    grade: grade,
    category: category,
    content: content,
    statut: statut,
  });
  await doc.save();
};

export default {
  all,
  allByCategory,
  find,
  isExist,
  count,
  create,
  generate,
  publicAll,
};
