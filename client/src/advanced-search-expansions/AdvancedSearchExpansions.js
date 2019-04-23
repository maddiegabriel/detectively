import React, { Component } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormGroup } from "@material-ui/core";
import SearchBar from 'material-ui-search-bar';

export default class AdvancedSearchExpansions extends Component {
    state = {
        checkedA: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <div>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <SearchBar
                                onChange={value => this.props.submitValue(value)}
                                onRequestSearch={() => console.log('onRequestSearch')}
                                style={{
                                    margin: '0 10px',
                                    maxWidth: 300,
                                }}
                            />
                        }
                    />
                </FormGroup>
            </div>
        );
    }
}