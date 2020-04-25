import React from 'react'
import axios from 'axios'
import './post.css'
import Edit from './Edit'

class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      post: {},
      isEditting: false
    }
  }

  componentDidMount() {
    axios.get(`/api${this.props.location.pathname}`)
    .then(res => this.setState({post: res.data}))
    .catch(() => {
      alert('Cannot get post')
      this.props.history.push('/dashboard')
    })
  }

  render() {
    return (
      <div className='post-back'>
        {this.state.isEditting ? (
          <Edit />
        ) : (
          <div className='post'>
            <div className='post-title-section'>
              <div className='post-title'>{this.state.post.title}</div>
              <div className='post-user'>
                <p>by {this.state.post.username}</p>
                <img
                className='post-profile-pic'
                src={this.state.post.profile_pic}
                alt='user pic'
                />
              </div>
            </div>
            <div className='post-content'>
              <img
              className='post-image'
              src={this.state.post.img ? this.state.post.img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKOmHNxnOQuvVSoUnFWg6-PEIbUviw_a88siDC1KCIgYEUTAya&usqp=CAU'}
              alt='post'
              />
              <p>{this.state.post.content}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Post