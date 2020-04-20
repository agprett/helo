import React from 'react'
import axios from 'axios'
import './nav.css'
import {Link, withRouter} from 'react-router-dom'
import {getUser, logoutUser} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Nav extends React.Component {
  constructor(props){
    super(props)

    this.logout = this.logout.bind(this)
  }
  componentDidMount(){
    axios.get('/api/auth/me')
    .then(res => {
      this.props.getUser(res.data)
    })
    .catch(err => {
      console.log(err)
      this.props.history.push('/')
    })
  }

  logout(){
    axios.post('/api/auth/logout')
    .then(res => {
      this.props.logoutUser()
      this.props.history.push('/')
    })
    .catch(err => console.log(err))
  }

  render(){
    return (
      <div className='nav'>
        <img className='nav-user-pic' src={`${this.props.user.profile_pic}`} alt='unavailable'/>
        <div className='nav-username'>{this.props.user.username}</div>
        <Link to='/dashboard'>Home</Link>
        <Link to='/new'>New Post</Link>
        <button onClick={() => this.logout()}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, logoutUser})(withRouter(Nav))