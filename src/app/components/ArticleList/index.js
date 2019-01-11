import React from 'react';

const ArticleList = ({articles}) => {
    return (
        <section className="section">
            <div className="container">
                <div className="tabs">
                    <ul>
                        <li className="is-active">Top Headlines</li>
                    </ul>
                </div>
                <div>
                    {articles.map((article, index) => {
                        const publish_date = new Date(article.publishedAt);
                        return (
                            <section key={index} className='section'>
                                <div className="card">
                                    <div className="card-content">
                                        <p className="title">
                                            “{article.title}”
                                        </p>
                                        <p className="subtitle">
                                            {article.author}
                                        </p>
                                    </div>
                                    <footer className="card-footer">
                                        <p className="card-footer-item">
                                            {article.source.name}
                                        </p>
                                        <p className="card-footer-item">
                                            {publish_date.toDateString()}
                                        </p>
                                    </footer>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ArticleList;
