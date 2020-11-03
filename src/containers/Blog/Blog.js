import React, { Component } from 'react';
import NewPost from './NewPost/NewPost';
import './Blog.css';
import Posts from "./Posts/Posts";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComponent from "../../hoc/asyncComponent";

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
})


class Blog extends Component {
    state = {
        isAuthenticated: true,
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/posts" component={Posts}/>
                    {this.state.isAuthenticated ? <Route path="/new-post" component={AsyncNewPost}/>: null}
                    {/*<Redirect from="/" to="/posts" />*/}
                    <Route render={() => <h1>Not Found</h1>} />
                </Switch>
                {/*<section>*/}
                {/*    <FullPost id={this.state.selectedPostId}/>*/}
                {/*</section>*/}
                {/*<section>*/}
                {/*    <NewPost />*/}
                {/*</section>*/}
            </div>
        );
    }
}

export default Blog;
