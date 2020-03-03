const sendEmail = require('./email');

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  const saltRounds = 10;

  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, null, function(err, hash) {
        db.transaction(trx => {
          trx.insert({
            hash: hash,
            email: email
          })
          .into('login')
          .returning('email')
          .then(loginEmail => {
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
              })
              .then(user => {
                res.json(user[0]);
              })
          })
          .then(trx.commit)
          .catch(trx.rollback)

          // send email confirmation
          .then(sendEmail(email, name, password))
          .catch(err => console.log(err))
        })
        .catch(err => res.status(400).json('unable to register'))
    });
  });
}

module.exports = {
  handleRegister: handleRegister
};