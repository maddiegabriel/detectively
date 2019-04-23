import React, { Component } from "react";
import SearchBar from 'material-ui-search-bar';
import Grid from '@material-ui/core/Grid';
import AdvancedSearchDialog from '../advanced-search-dialog/AdvancedSearchDialog';
import Table from '../table/Table';
import FooterToolbar from '../footer-toolbar/FooterToolbar'

function createData(id, lastname, firstname, jobtitle, year, location, salary) {
    return { id: id, lastname, firstname, jobtitle, year, location, salary };
}

export default class Search extends Component {
    state = {
        search: '',
        data: []
    }

    render() {
        return(
            <div className="search-page">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item className="search-bar">
                        <SearchBar
                            onChange={() => console.log('onChange')}
                            onRequestSearch={query => {
                                let search = "/fuzzy?q="+query;
                                fetch(search)
                                    .then(res => res.json())
                                    .then(data => {
                                        let personData = [];
                                        for(let i = 0; i < data.count; i++) {
                                            personData.push(createData(data.results[i].id, data.results[i].last_name, data.results[i].first_name, data.results[i].job_title, data.results[i].year, data.results[i].location, data.results[i].salary));
                                        }
                                        this.setState({
                                            search: search,
                                            data: personData
                                        })
                                    })
                                }
                            }
                            style={{
                                margin: '0 10px',
                                maxWidth: 300,
                            }}
                        />
                    </Grid>
                    <Grid item className="advanced-search-container">
                        <AdvancedSearchDialog submitResults={results => this.setState(results)}/>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Table search={this.state}/>
                </Grid>
                <Grid>
                    <FooterToolbar search={this.state}/>
                </Grid>
            </div>
        );
    }
}