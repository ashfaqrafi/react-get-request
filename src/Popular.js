import React, { Component } from 'react';
import PropTypes from 'prop-types';

// var PopularRepos = require( './api.js');

import fetchPopularRepos from './api.js';
import getPersonalInfo from './glostarsApi.js';

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

function onChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}

function onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
}

function GlostarsForm() {
    return(
        <div className="container">
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="exampleInput1">First Name</label>
                    <input type="text" className="form-control" id="exampleInput1" name="Name" value={this.state.Name} onChange={this.onChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInput2">Last Name</label>
                    <input type="text" className="form-control" id="exampleInput2" name="LastName"  value={this.state.LastName} onChange={this.onChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInput3">Gender</label>
                    <input type="text" className="form-control" id="exampleInput3"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInput4">Birth Year</label>
                    <input type="number" className="form-control" id="exampleInput4"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInput5">Birth Month</label>
                    <input type="text" className="form-control" id="exampleInput5"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInput6">Birth Year</label>
                    <input type="number" className="form-control" id="exampleInput6"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInput7">Email address</label>
                    <input type="email" className="form-control" id="exampleInput7"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInput8">Password</label>
                    <input type="password" className="form-control" id="exampleInput8"/>
                </div>

                <button type="submit" className="btn btn-default">Submit</button>
            </form>
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
            repos: null,
            Name: '',
            LastName:'',
            Gender: '',
            Email: '',
            BirthdayYear: '',
            BirthdayMonth: '',
            BirthdayDay: '',
            Password: ''
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
                {/*<SelectLanguage*/}
                    {/*selectedLanguage={this.state.selectedLanguage}*/}
                    {/*onSelect={this.updateLanguage}/>*/}
                {/*{JSON.stringify(this.state.repos,null,2)}*/}
                {/*{!this.state.repos ? <p>Loading</p> :*/}
                    {/*<ReposGrid repos = {this.state.repos}/> }*/}
                <GlostarsForm/>
            </div>
        );
    }
}

// module.exports = Popular;

export default Popular;