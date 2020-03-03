const rankingsGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').orderBy('entries','desc').limit(3)
      .then(users => {
          res.json(users)
      })
      .catch(err => res.status(400).json('error getting users'))
  }
  
module.exports = {
    rankingsGet
}