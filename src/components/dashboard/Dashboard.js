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
        <div key={post.post_id} className='dash-post' onClick={() => this.props.history.push(`/post/${post.post_id}`)}>
          <p className='dash-pt'>{post.title}</p>
          <div className='dash-author'>
            <p>by {post.username}</p>
            <img className='dash-pi' src={post.profile_pic} alt='author'/>
          </div>
        </div>
      )
    })

    return(
      <div className='dash-back'>
        <div className='dash-search'>
          <input className='search-input' placeholder='Search by title' value={this.state.tempSearch} onChange={event => this.handleChange(event)}/>
          <img
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC'
            alt='search'
            className='search-button'
            onClick={() => this.handleClick()}
          />
          <button className='dash-reset' onClick={() => this.resetSearch()}>Reset</button>
          <p className='my-posts' >My Posts</p>
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