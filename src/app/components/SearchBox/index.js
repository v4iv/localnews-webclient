import React from 'react';

const SearchBox = ({searchInput, handleChange, handleSubmit}) => {
    return (
        <div>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input
                        className="input is-fullwidth"
                        type="text"
                        placeholder="Enter the City Name"
                        value={searchInput}
                        onChange={handleChange}
                    />
                </div>
                <div className="control">
                    <button className="button is-dark" onClick={handleSubmit}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
