module.exports = {
  add: function(req, res) {
    const db = req.app.get("db");
    const { email, password } = req.body;

    //sign-up
    let userDetails = { userId: db.users.id, email, password };
    db.users.data.push(userDetails);

    //empty profile
    let initProfile = { userId: db.profiles.id, thumbnail: "", about: "" };
    db.profiles.data.push(initProfile);
    db.users.id++;
    db.profiles.id = db.users.id;
  },
  patch: function(req, res) {
    const db = req.app.get("db");

    const userIdObject = { userId: parseInt(req.params.id) };
    const { thumbnail, about } = req.body;

    db.profiles.data[req.params.id] = {
      ...db.profiles.data[req.params.id],
      ...userIdObject,
      thumbnail,
      about
    };
  },
  post: function(req, res) {
    const db = req.app.get("db");
    const { userId, content } = req.body;

    //incrementing postId for each unique user
    const numOfPosts = db.posts.data.filter(data => data.userId == userId);

    db.posts.data.push({
      userId: parseInt(userId),
      postId: numOfPosts.length,
      content: content
    });
    db.posts.id++;
  },
  comment: function(req, res) {
    const db = req.app.get("db");
    const { postId, userId, comment } = req.body;
    db.comments.data.push({
      postId: parseInt(postId),
      userId: parseInt(userId),
      comment: comment
    });
    db.comments.id++;
  },
  fetch: function(req, res) {
    const db = req.app.get("db");
    if (req.query.userId) {
      const { userId } = req.query;

      const findProfile = db.profiles.data.find(data => data.userId == userId);

      res.status(200).send(findProfile);
    }
    if (req.query.email) {
      const { email } = req.query;
      const findEmail = db.users.data.find(data => data.email == email);

      res.status(200).send(findProfile);
    }
  },
  allpost: function(req, res) {
    const db = req.app.get("db");
    const { userId } = req.params;
    const getPosts = db.posts.data.filter(data => data.userId == userId);

    res.status(200).send(getPosts);
  },
  viewpost: function(req, res) {
    const db = req.app.get("db");
    const { postId } = req.params;

    // comments are empty or does not exist
    if (db.comments.data === undefined || db.comments.data.length == 0) {
      //used filter since the nature of the database shows
      //different userIds but with incrementing PostId
      //can be fixed by also checking userId, but not
      //really within the scope of the problem
      const findPost = db.posts.data.filter(data => data.postId == postId);
      res.status(200).send(findPost);
    } else {
      const viewPost = db.comments.data.filter(data => data.postId == postId);
      res.status(200).send(viewPost);
    }
  }
};
