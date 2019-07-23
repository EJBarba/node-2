let id = 0;

module.exports = {
  add: function(req, res) {
    const db = req.app.get("db");
    const { email, password } = req.body;

    let userDetails = { id, email, password };
    db.users.data.push(userDetails);
    db.profiles.data.push({ id });
    console.log(db.users.data[0]);
    id++;
  },
  patch: function(req, res) {
    const db = req.app.get("db");
    const { userId, fName, lName } = req.body;

    let userDetails = { fName, lName };
    db.profiles.data[userId] = { ...db.profiles.data[userId], userDetails };
  }
};
