import React, { Component } from 'react';
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import PostsFormPage from "./forms/PostsFormPage";
import {Route} from 'react-router-dom';
import UserRoute from './routes/UserRoute'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path = "/" exact component={MainPage}/>
        <Route path = "/posts/:id" component={UserRoute(PostPage)}/>
        <Route path = "/edit" exact component={UserRoute(PostsFormPage)}/>
        <Route path = "/edit/:id" component={UserRoute(PostsFormPage)}/>
      </div>
    );
  }
}

export default App;
