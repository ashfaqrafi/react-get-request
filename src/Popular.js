import React, { Component } from 'react';
import PropTypes from 'prop-types';

// var PopularRepos = require( './api.js');

import fetchPopularRepos from './api.js';

// import Api from './api.js';

function SelectLanguage (props) {
    let languages = ['All', 'Javascript', 'Java'];

    return(
        <ul>
            {languages.map(function (lang) {
                return(
                    <li style={lang === props.selectedLanguage ? {color:'red'}: null}
                        onClick={props.onSelect.bind(null,lang)}
                        key={lang}>

                        {lang}

                    </li>
                )

            })}
        </ul>
    )
}

function ReposGrid(props) {
    return(
        <div>
            <ul>
                {props.repos.map(function (repo, index) {
                    return(
                        <li key={repo.name}>
                            <ul>
                                <li>
                                    <img src={repo.owner.avatar_url} alt=""/>
                                </li>
                                <li>
                                    <a href={repo.html_url}>{repo.name}</a>
                                </li>
                                <li>
                                    {repo.owner.login}
                                </li>
                                <li>
                                    {repo.stargazers_count} stars
                                </li>
                            </ul>
                        </li>
                        )

                })
                }

            </ul>
        </div>
    )

}


SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired,
};

class Popular extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
        // api.fetchPopularRepos(this.state.selectedLanguage)
        //     .then(function (repos) {
        //         console.log(repos);
        //     })
    }
    updateLanguage(lang){
        this.setState(function () {
            return{
                selectedLanguage:lang,
            }
        });

    fetchPopularRepos(lang)
        .then((repos)=> {
            console.log(repos);
            this.setState({
                repos
            })
        });
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}/>
                {/*{JSON.stringify(this.state.repos,null,2)}*/}
                {!this.state.repos ? <p>Loading</p> :
                    <ReposGrid repos = {this.state.repos}/> }
            </div>
        );
    }
}

// module.exports = Popular;

export default Popular;