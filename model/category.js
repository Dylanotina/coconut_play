import gameModel from "../database/gameSchema";

const all = async () => {
  const response = await gameModel.find({}, "category");
  const unique = [];
  response.forEach((element) => {
    if (!unique.includes(element.category)) {
      unique.push(element.category);
    }
  });
  return unique;
};

const isExist = async (category) => {
  const response = await gameModel.find({}, "category");
  const unique = [];
  response.forEach((element) => {
    if (!unique.includes(element.category)) {
      unique.push(element.category);
    }
  });
  if (unique.includes(category)) {
    return true;
  } else {
    return false;
  }
};

export default {
  all,
  isExist,
};
