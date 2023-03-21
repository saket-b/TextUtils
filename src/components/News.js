import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

     defaultImage = "http://www.nasa.gov/sites/default/files/thumbnails/image/artemis_ii_graphics.jpg";

      static defaultProps={
        country :"in",
        pageSize:8,
        category: "general",
      }  
      
     PropTypes ={
        country: PropTypes.string,
        page : PropTypes.number,
        category : PropTypes.string
      }



  constructor(props) {
    super(props);
    // console.log("I am inside news constructor");
    this.state = {
      articles: [],
      loading: false,
      page :1,
      totalResults : 0,
      //Image = "http://www.nasa.gov/sites/default/files/thumbnails/image/artemis_ii_graphics.jpg"

    }
    
   
    document.title = `${this.capitalLiser(this.props.category)} - NewsMonkey`;
  }

 

  async updatePage(){
    // console.log("prev = page = ", this.state.page);
   

  }

  async componentDidMount(){
    console.log("page = ", this.state.page);
    let url_api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    this.props.setProgress(10);
    let data = await fetch(url_api);
    this.props.setProgress(30);
    
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      // console.log("total = ", parsedData.totalResults);
      articles: parsedData.articles,
      totalResults : parsedData.totalResults,
      loading : false

    })
     this.props.setProgress(100);
    //this.updatePage();
  }

  handleNextPage = async () =>{

    this.setState({ page: this.state.page + 1})
    this.updatePage();

  }
  handlePrevPage = async () =>{

    this.setState({ page: this.state.page - 1})
    this.updatePage();

  }
  capitalLiser = (str)=>{

    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
  }

  fetchMoreData = async() => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs

    console.log("page = ", this.state.page);
    let url_api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    
    this.setState({page: this.state.page + 1});
    this.setState({loading:true});
    let data = await fetch(url_api);
    
    let parsedData = await data.json();
    console.log("total = ", parsedData.totalResults);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults : parsedData.totalResults,
      loading : false

    })
  
  };

  render() {
    return (
      < >
        <h1 className='text-center' style={{marginTop :'90px'}}>News Monkey - Top HeadLines from {this.capitalLiser(this.props.category)}</h1>
       { this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={ this.state.loading && <Spinner/>}
        >
        <div className='container'>
        <div className="row">
          {this.state.articles.map((element, index) => {
            return <div className="col-md-4" key={index}>
              {/* {console.log("url =",element.urlToImage)} */}
              <NewsItems title={element.title} description={element.description} date = {new Date(element.publishedAt).toGMTString()}
               author= {element.author} source={element.source.name}
              imageUrl={ element.urlToImage.length !== 0 ? element.urlToImage : this.defaultImage} newsUrl ={ element.url}/>
            </div>

          })}
        </div>
        </div>
        </InfiniteScroll>
       

      </>
    )
  }
}
