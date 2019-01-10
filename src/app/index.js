import React, {Component} from 'react';
import axios from 'axios';
import NProgress from 'nprogress';
import './styles.css'
import newsapi from './lib/newsapi';
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Footer from "./components/Footer";
import ArticleList from "./components/ArticleList";
import MapBox from "./components/MapBox";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            city_name: '',
            place_id: '',
            latitude: '-34.397',
            longitude: '150.644',
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
        NProgress.start();
        axios({
            method: 'post',
            url: `https://localnews-server.herokuapp.com/api/places/`,
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': "no-cache"
            },
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
                        NProgress.done();
                        this.setState({articles: response.articles})
                    })
                    .catch(err => {
                        NProgress.done();
                        console.log("News API: ", err)
                    });
            })
            .catch(err => {
                NProgress.done();
                console.log("Axios: ", err.data)
            });
    }

    render() {
        const lat = parseFloat(this.state.latitude);
        const lng = parseFloat(this.state.longitude);
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
                <MapBox latitude={lat} longitude={lng}/>
                {(this.state.articles.length)
                    ? <ArticleList articles={this.state.articles}/>
                    : null
                }
                <Footer/>
            </div>
        );
    }
}

export default App;
