import userModel from "../database/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const blackListToken = [];
const JWT_SECRET =
  "gTwfgbk5yZoEhU5UvlsaYQMxvxMEil2Dm7FVvnZ9bMl5LzsdgC6RhptT1XbOsLU2GMj0oGy-QuwthoJWwgRV5xSUo10o6BfsIJtDZgjDdsIqr7IvKBjtfZJ_x6BWDcD-UnDVADZtVXrncZN4xO830PcVAYw6oxWGFNpHYZw_aTbDvO8cWaByvMjLxEdcZTJeQpV5klsOmrLLxh2Hyf7EQ2AznbgyqSScT6b5aWplnuo4nH5aultl2i_CEjY5uWVfKfVw3nj0KxK2amW2tOurnIyi21dCC63tyusNwBeP4OJ6TeYmWMUbHGFDlq_soqOw6GkxEkVtNs33DbGXn1-7gw";

export function register(req, res) {
  // Conversion des identifiants de base64 en ascii

  let auth = req.headers.authorization || req.headers.Authorization;
  let data = auth.split(" ")[1];
  let buff = Buffer.from(data, "base64");
  let text = buff.toString("ascii");
  let authUsername = text.split(":")[0];
  let authPassword = text.split(":")[1];
  let hash = bcrypt.hashSync(authPassword, 10);
  let { email, firstname, lastname, birthdate } = req.body;

  if (
    email === undefined ||
    authUsername === undefined ||
    authPassword === undefined
  ) {
    res
      .status(401)
      .send("Certaines informations nécessaires n'ont pas été saisies.");
  }

  let doc = new userModel({
    username: authUsername,
    email: email,
    password: hash,
    firstname: firstname,
    lastname: lastname,
    birthdate: birthdate,
    statut: "membre",
  });

  doc
    .save()
    .then((user) =>
      res
        .status(201)
        .send({ success: true, message: "User added.", data: user })
    );
}

export function login(req, res) {
  // Conversion des identifiants de base64 en ascii

  let auth = req.headers.authorization || req.headers.Authorization;
  let data = auth.split(" ")[1];
  let buff = Buffer.from(data, "base64");
  let text = buff.toString("ascii");
  let authUsername = text.split(":")[0];
  let authPassword = text.split(":")[1];

  //Recherche de l'utilisateur dans la base de données

  userModel.findOne(
    { $or: [{ username: authUsername }, { email: authUsername }] },
    (err, data) => {
      if (err) {
        res.send(err);
      } else if (data !== null) {
        let payload = {
          username: data.username,
          email: data.email,
          statut: data.statut,
        };
        // Comparaison du mot de passe haché avec le hash de la base de donnée

        bcrypt.compare(authPassword, data.password, (err, result) => {
          if (result) {
            // Création du token
            jwt.sign(payload, JWT_SECRET, { expiresIn: 1800 }, (err, token) => {
              res.status(200).send({
                success: true,
                data: {
                  username: data.username,
                  statut: data.statut,
                  token: token,
                },
              });
            });

            // Retour si identifiants incorrects
          } else {
            res.status(401).send({
              success: false,
              message: "Accès refusé : identifiants non reconnu",
            });
          }
        });
      } else {
        res.status(401).send({
          success: false,
          message: "Accès refusé : user non inscrit dans la base de données",
        });
      }
    }
  );
}

export function logout(req, res) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    res.status(403).send("Acces non autorisé");
  }

  let authBearer = authHeader.split(" ")[0];
  let authToken = authHeader.split(" ")[1];
  if (authToken != null) {
    blackListToken.push(authToken);
    res
      .status(200)
      .send({ success: true, message: "Vous avez bien été déconnecté" });
  } else {
    res.status(403).send("Acces non autorisé");
  }
}

export function getSensibleData(req, res) {
  // Récupération  du token

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    res.status(403).send("Acces non autorisé");
  }

  let authBearer = authHeader.split(" ")[0];
  let authToken = authHeader.split(" ")[1];

  if (authBearer !== "Bearer") {
    res.status(403).send("Acces non autorisé");
  }
  if (blackListToken.includes(authToken)) {
    res.status(403).send("Acces non autorisé");
  }

  // Verification du token

  jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).send("Acces non autorisé");
    }

    // Recupération et envoi des données sensibles dans la base de données

    userModel.findOne(
      { $or: [{ username: decoded.username }, { email: decoded.email }] },
      (err, data) => {
        if (err) {
          res.send(err);
        }
        data.password = undefined;
        res.status(200).send({ success: true, data: data });
      }
    );
  });
}
