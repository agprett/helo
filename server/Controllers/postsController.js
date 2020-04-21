module.exports = {
  getPosts: async(req, res) => {
    const db = req.app.get('db')
    const {search, userposts} = req.body
    const user_id = req.session.userid
    let posts = []
    
    if(!userposts){
      if(search){
        posts = await db.get_some_posts([user_id, search])
      } else {
        posts = await db.get_posts([user_id])
      }
    } else {
      if(search){
        posts = await db.get_some_posts([0, search])
      } else {
        posts = await db.get_posts([0])
      }
    }
    
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
    const user_id = req.session.userid

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