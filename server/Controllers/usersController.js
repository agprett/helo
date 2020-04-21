const bcrypt = require('bcryptjs')

module.exports = {
  login: async(req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body

    const [existingUser] = await db.check_user([username])

    if(!existingUser){
      return res.status(404).send('Username or password incorrect')
    }

    const authenticated = bcrypt.compareSync(password, existingUser.password)

    if(authenticated){
      delete existingUser.password

      req.session.userid = existingUser.user_id
      req.session.user = existingUser

      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('Username or password incorrect')
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },
  
  register: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body

    const [existingUser] = await db.check_user([username])

    if(existingUser){
      return res.status(409).send('Username taken')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const [id] = await db.register_user([username, hash])

    const profile_pic = `https://robohash.org/${id.user_id}`

    const [newUser] = await db.add_photo([id.user_id, profile_pic])

    req.session.userid = id.user_id

    req.session.user = newUser

    res.status(200).send(req.session.user)
  },

  getUser: async (req, res) => {
    if(req.session.user){
      res.status(200).send(req.session.user)
    } else {
      res.sendStatus(404)
    }
  }
}