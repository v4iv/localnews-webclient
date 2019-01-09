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
                        return (
                            <div className="card" key={index}>
                                <div className="card-content">
                                    <p className="title">
                                        {article.title}
                                    </p>
                                    <p className="subtitle">
                                        {article.publishedAt.toLocaleDateString()}
                                    </p>
                                </div>
                                <footer className="card-footer">
                                    <p className="card-footer-item">
                                        {article.source.name}
                                    </p>
                                    <p className="card-footer-item">
                                        {article.source.author}
                                    </p>
                                </footer>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ArticleList;
