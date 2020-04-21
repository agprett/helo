import React from 'react'
import axios from 'axios'
import './dashboard.css'

class Dashboard extends React.Component {
  constructor(){
    super()

    this.state = {
      posts: [],
      tempSearch: '',
      search: '',
      userposts: true
    }

    this.toggleUserPosts = this.toggleUserPosts.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
  }

  getPosts(){
    const body = {
      search: this.state.search,
      userposts: this.state.userposts
    }
  
    axios.post('/api/posts', body)
    .then(res => {
      this.setState({posts: res.data})
    })
  }

  componentDidMount(){
    this.getPosts()
  }
  
  componentDidUpdate(prevProps, prevState){
    if(prevState.search !== this.state.search || prevState.userposts !== this.state.userposts){
      this.getPosts()
    }
  }
  
  toggleUserPosts(){
    this.setState({userposts: !this.state.userposts})
  }

  handleChange(event){
    this.setState({tempSearch: event.target.value})
  }

  handleClick(){
    this.setState({search: this.state.tempSearch})
  }

  resetSearch(){
    this.setState({search: '', tempSearch: ''})
  }

  render(){
    const posts = this.state.posts.map(post => {
      return (
        <div key={post.post_id} className='dash-post'>
          <p className='dash-pt'>{post.title}</p>
          <p>by {post.username}</p>
          <img src={post.profile_pic} alt='author'/>
        </div>
      )
    })

    return(
      <div className='dash-back'>
        <div className='dash-search'>
          <input placeholder='Search by title' value={this.state.tempSearch} onChange={event => this.handleChange(event)}/>
          <button onClick={() => this.handleClick()}>Search</button>
          <button onClick={() => this.resetSearch()}>Reset</button>
          <p>My Posts</p>
          <input type='checkbox' checked={this.state.userposts} onChange={() => this.toggleUserPosts()}/>
        </div>
        <div className='posts-display'>
          {posts}
        </div>
      </div>
    )
  }
}

export default Dashboard