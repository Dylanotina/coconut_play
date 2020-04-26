import bcrypt from "bcrypt";

const usernames = ["lild4437", "lebofred", "gatojunior", "chillbeatsdu51"];

const emails = [
  "test1@gmail.com",
  "test2@gmail.com",
  "test3@gmail.com",
  "test4@gmail.com",
];

const passwords = ["test123", "basketball", "ceciestuntest", "jeanne"];

const birthdate = ["02/17/1999", "01/28/2002", "07/21/1971", "03/15/1995"];

const noms = [
  "Dylan Otina",
  "Nathan Otina",
  "Juliette Ngole",
  "Sarah Mabialah",
];

const statut = ["admin", "membre"];

const fixIndex = (index, max) => index % max;

const getUsernames = (index) => usernames[fixIndex(index, usernames.length)];

const getEmails = (index) => emails[fixIndex(index, emails.length)];

const getPasswords = (index) => {
  return bcrypt.hashSync(passwords[fixIndex(index, passwords.length)], 10);
};

const getFirstname = (index) =>
  noms[fixIndex(index, noms.length)].split(" ")[0];

const getLastname = (index) => noms[fixIndex(index, noms.length)].split(" ")[1];

const getStatut = (index) => statut[fixIndex(index, statut.length)];

const get = (id) => ({
  username: getUsernames(id),
  email: getEmails(id),
  password: getPasswords(id),
  birthdate: new Date(birthdate[id]),
  firstname: getFirstname(id),
  lastname: getLastname(id),
  statut: getStatut(id),
});

const getList = () => {
  const users = [];
  const max = usernames.length;
  for (let i = 0; i < max; i += 1) {
    const user = get(i);
    users.push(user);
  }

  return users;
};

const userGenearator = { getList };

export default userGenearator;
