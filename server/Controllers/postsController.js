const bcrypt = require('bcryptjs')

module.exports = {
  getPosts: async(req, res) => {
    const db = req.app.get('db')
    const {userid} = req.params

    const user_id = parseInt(userid)

    const posts = await db.get_posts([user_id])

    res.status(200).send(posts)
  },
  
  getPost: async(req, res) => {
    const db = req.app.get('db')
    const {postid} = req.params

    const post_id = parseInt(postid)

    const [post] = await db.get_post([post_id])

    res.status(200).send(post)
  },
  
  deletePost: async(req, res) => {
    const db = req.app.get('db')
    const {postid} = req.params

    const post_id = parseInt(postid)
    
    await db.delete_post([post_id])

    res.sendStatus(200)
  },
  
  addPost: async(req, res) => {
    const db = req.app.get('db')
    const {title, img, content} = req.body
    const {userid} = req.params

    const user_id = parseInt(userid)

    await db.add_post([title, img, content, user_id])

    res.sendStatus(200)
  },
  
  updatePost: async(req, res) => {
    const db = req.app.get('db')
    const {title, img, content} = req.body
    const {postid} = req.params

    const post_id = parseInt(postid)


    await db.update_post([title, img, content, post_id])

    res.sendStatus(200)
  }
}