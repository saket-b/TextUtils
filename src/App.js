
import './App.css';


import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  // name = "saket";
  pazesize = 5;
  apiKey = process.env.REACT_APP_NEWS_API;

  state ={
    progress : 0
  }
  setProgress=(progr)=> {
      this.setState({progress:progr}) 
  }
  render() {
   
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
        height ={3}
      />
            <Routes>
            
              <Route exact path='/' element=             {<News setProgress= {this.setProgress} apiKey ={this.apiKey}  key="general" pageSize = {this.pagesize} category = "general" country="in" />}/>
              <Route exact path='/general' element =     {<News setProgress= {this.setProgress} apiKey ={this.apiKey} key="general" pageSize = {this.pagesize} category = "general" country="in" />}/>     
              <Route exact path='/business' element=     {<News setProgress= {this.setProgress} apiKey ={this.apiKey} key="business" pageSize = {this.pagesize} category = "business" country="in" />} />
              <Route exact path='/entertainment'element ={<News setProgress= {this.setProgress} apiKey ={this.apiKey} key="entertainment" pageSize = {this.pagesize} category = "entertainment" country="in"/>}/>
              <Route exact path='/health' element =      {<News setProgress= {this.setProgress} apiKey ={this.apiKey} key="health" pageSize = {this.pagesize} category = "health" country="in" />}/>
              <Route exact path='/science'  element =    {<News setProgress= {this.setProgress} apiKey ={this.apiKey} key="science" pageSize = {this.pagesize} category = "science" country="in" />}/>
              <Route exact path='/sports' element =      {<News setProgress= {this.setProgress} apiKey ={this.apiKey} key="sports" pageSize = {this.pagesize} category = "sports" country="in" />}/>
              <Route exact path='/technology' element =  {<News setProgress= {this.setProgress} apiKey ={this.apiKey} key="technology" pageSize = {this.pagesize} category = "technology" country="in" />}/>

            </Routes>
        </Router>
      </div>
    )
  }
}


