import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            disableNextButton : false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=102a197232314eb39808e64c06fabc1a&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        });
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=102a197232314eb39808e64c06fabc1a&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            disableNextButton : !(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))
        });
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=102a197232314eb39808e64c06fabc1a&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                disableNextButton: false
            });
        }
        else{
            this.setState({
                disableNextButton: true
            });
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey - Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map((article, index) => {
                        return (
                            <div key={index} className='col-md-4'>
                                <NewsItem title={article.title ? article.title : ""} description={article.description ? article.description : ""} imageUrl={article.urlToImage} newsUrl={article.url} />
                            </div>
                        );
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}>&#8592;&nbsp;Previous</button>
                    <button disabled={this.state.disableNextButton} type="button" className="btn btn-warning" onClick={this.handleNextClick}>Next&nbsp;&#8594;</button>
                </div>
            </div>
        )
    }
}
