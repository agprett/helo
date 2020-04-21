import React from 'react'
import './form.css'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Form extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      img: '',
      content: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleClick(){
      const  title = this.state.title
      const img = this.state.img
      const content = this.state.content
  

    axios.post('/api/post', {title, img, content})
    .then(() => this.props.history.push('/dashboard'))
    .catch(() => alert('Failed to post!'))
  }

  render(){
    return(
      <div className='form-back'>
        <div className='form'>
          <span className='form-title'>New Post</span>
          <div className='form-section'>
            <p className='form-label'>Title:</p>
            <input name='title' onChange={event => this.handleChange(event)}/>
            <img
              className='form-img'
              src={this.state.img ? this.state.img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKOmHNxnOQuvVSoUnFWg6-PEIbUviw_a88siDC1KCIgYEUTAya&usqp=CAU'}
              alt='img'
            />
            <p className='form-label'>Image URL:</p>
            <input name='img' onChange={event => this.handleChange(event)}/>
            <p className='form-label'>Content:</p>
            <textarea className='form-content' name='content' onChange={event => this.handleChange(event)}></textarea>
          </div>
          <button className='form-post' onClick={() => this.handleClick()}>Post</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Form)