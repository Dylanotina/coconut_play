import gameGenerator from "../model/gameGenerator";
import userGenerator from "../model/userGenerator";
import gameSchema from "../database/gameSchema";
import userModel from "../database/userSchema";
import bcrypt from "bcrypt";

export async function generate() {
  const games = await gameGenerator.generate();
  games.forEach(async (element) => {
    let doc = new gameSchema({
      title: element.title,
      author: element.author,
      bannerPath: element.bannerPath.download_url,
      name: element.name,
      grade: element.grade,
      category: element.category,
      content: element.content,
      statut: element.statut,
    });
    await doc.save();
  });

  const users = userGenerator.getList();
  users.forEach(async (element) => {
    let doc = new userModel({
      username: element.username,
      email: element.email,
      password: element.password,
      firstname: element.firstname,
      lastname: element.lastname,
      birthdate: element.birthdate,
      statut: element.statut,
    });
    await doc.save();
  });
  console.log("Data inserted");
}
