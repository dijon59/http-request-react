import React, { Component } from 'react';
import './FullPost.css';
import axios from '../../axios'

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let postId = this.props.id
        if (postId) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== postId)) {
                axios.get('/posts/' + postId)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    })
            }
        }
    }
    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
             .then(response => {
                 console.log(response);
             })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;