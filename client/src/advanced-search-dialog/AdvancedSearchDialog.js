import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AdvancedSearchExpansions from '../advanced-search-expansions/AdvancedSearchExpansions';

const AdvancedTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    }
  }))(props => {
    const { children, classes } = props;
    return (
        <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        </DialogTitle>
    );
});

const AdvancedContent = withStyles ( theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(DialogContent);

function createData(id, lastname, firstname, jobtitle, year, location, salary) {
    return { id: id, lastname, firstname, jobtitle, year, location, salary };
}

export default class AdvancedSearchDialog extends Component {
    state = {
        open: false,
        first_name: '',
        last_name: '',
        location: '',
        job_title: '',
        year: ''
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        return(
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item className="advanced-search-modal">
                    <button className="btn btn-primary" onClick={this.handleClickOpen}>
                        advanced search
                    </button>
                    <Dialog
                        fullWidth="50px"
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <AdvancedTitle id="form-dialog-title">
                            Narrow search by...
                            <button className="advance-search-btn btn btn-outline-primary"
                                    onClick={() => {
                                            let search = "/salary?";
                                            if(this.state.first_name) {
                                                if(search[search.length-1] !== "?") search += "&";
                                                search += `first_name=${this.state.first_name}`;
                                            }
                                            if(this.state.last_name) {
                                                if(search[search.length-1] !== "?") search += "&";
                                                search += `last_name=${this.state.last_name}`;
                                            }
                                            if(this.state.location) {
                                                if(search[search.length-1] !== "?") search += "&";
                                                search += `location=${this.state.location}`;
                                            }
                                            if(this.state.job_title) {
                                                if(search[search.length-1] !== "?") search += "&";
                                                search += `job_title=${this.state.job_title}`;
                                            }
                                            if(this.state.year) {
                                                if(search[search.length-1] !== "?") search += "&";
                                                search += `year=${this.state.year}`;
                                            }
                                            if(search !== "/salary?") {
                                                fetch(search)
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        let personData = [];
                                                        for(let i = 0; i < data.count; i++) {
                                                            personData.push(createData(data.results[i].id, data.results[i].last_name, data.results[i].first_name, data.results[i].job_title, data.results[i].year, data.results[i].location, data.results[i].salary));
                                                        }
                                                        this.handleClose();
                                                        this.props.submitResults({
                                                            search: search,
                                                            data: personData
                                                        })
                                                    })
                                            }
                                        }
                                    }>
                                Apply Refined Search
                            </button>
                        </AdvancedTitle>
                        <AdvancedContent>
                            <DialogContentText>

                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        First Name
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <AdvancedSearchExpansions submitValue={first_name=>this.setState({first_name: first_name})}/>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        Last Name
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <AdvancedSearchExpansions submitValue={last_name=>this.setState({last_name: last_name})}/>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        Location
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <AdvancedSearchExpansions submitValue={location=>this.setState({location: location})}/>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        Job Title
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <AdvancedSearchExpansions submitValue={job_title=>this.setState({job_title: job_title})}/>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        Year
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <AdvancedSearchExpansions submitValue={year=>this.setState({year: year})}/>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </DialogContentText>
                        </AdvancedContent>
                    </Dialog>
                </Grid>
            </Grid>
        );
    }
}