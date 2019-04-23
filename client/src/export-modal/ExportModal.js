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
import Button from '@material-ui/core/Button'

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

export default class ExportModal extends Component {
    state = {
        open: false,
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
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
                <Grid item className="export-modal"> 
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={this.handleClickOpen}
                    >
                        <div>
                            <i className="fas fa-file-download"></i>
                        </div> 
                        Download as..
                </Button>
                    <Dialog
                        fullWidth="50px"
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <AdvancedTitle id="form-dialog-title">
                            Export as..
                        </AdvancedTitle>
                        <AdvancedContent>
                            <DialogContentText>
                                
                                <Button
                                    variant="contained"
                                    color="secondary"
                                >
                                    <div>
                                        <i className="fas fa-file-csv"></i>
                                    </div>
                                    CSV
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                >
                                    <div>
                                        <i className="fas fa-file-csv"></i>
                                    </div>
                                    CSV
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                >
                                    <div>
                                        <i className="fas fa-file-csv"></i>
                                    </div>
                                    CSV
                                </Button>

                            </DialogContentText>
                        </AdvancedContent>                      
                    </Dialog>
                </Grid>
            </Grid>
        );
    }
}