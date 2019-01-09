import React, {Component} from 'react';
import axios from 'axios';
import newsapi from './lib/newsapi';
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Footer from "./components/Footer";
import ArticleList from "./components/ArticleList";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            city_name: '',
            place_id: '',
            latitude: '',
            longitude: '',
            articles: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({searchInput: e.target.value})
    }

    handleSubmit() {
        console.log(this.state.searchInput)
        axios({
            method: 'post',
            url: `https://localnews-server.herokuapp.com/api/places/`,
            data: {searchInput: this.state.searchInput}
        })
            .then(response => {
                this.setState({
                    city_name: response.data.name,
                    place_id: response.data.place_id,
                    latitude: response.data.latitude,
                    longitude: response.data.longitude
                });

                // News API
                newsapi.v2.topHeadlines({
                    q: this.state.city_name,
                    language: 'en',
                    sortBy: 'relevancy',
                })
                    .then(response => {
                    this.setState({articles: response.articles})
                })
                    .catch(err =>{
                    console.log("News API: ", err)
                });
            })
            .catch(err => {
                console.log("Axios: ", err)
            });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <section className='section'>
                    <div className='container'>
                        <SearchBox
                            searchInput={this.state.searchInput}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                    </div>
                </section>
                {this.state.articles &&
                <ArticleList articles={this.state.articles}/>
                }
                <Footer/>
            </div>
        );
    }
}

export default App;
