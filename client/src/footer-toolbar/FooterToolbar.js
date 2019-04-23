import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ExportModal from "../export-modal/ExportModal";
import VisualRep from "../visual-rep/VisualRep";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

function FooterToolbar(props) {
    const {classes} = props;
    function handleGraph(e) {
        window.location.hash = '/visual-representation';
    }

    return (
        <div id="footer-toolbar">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
            <Grid>
                <Router>
                    <Link to={'/visual-representation'}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}>
                            <div className={classes.leftIcon}>
                                <i class="fas fa-chart-line"></i>
                            </div>
                            Generate Graph
                        </Button>
                    </Link>
                    <Switch>
                        <Route  exact path='/visual-representation'
                                render={()=> (
                                    <VisualRep {...props.search.search} {...props} />
                                )}
                        />
                    </Switch>
                </Router>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={()=>props.search && props.search.search ? window.open(props.search.search+"&format=csv") : null}>
                    <div className={classes.leftIcon}>
                        <i class="fas fa-file-csv"></i>
                    </div>
                    Download CSV
                </Button>
            </Grid>
        </div>
    );
}

FooterToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FooterToolbar);

/*
variant="contained"
                    color="secondary"
                    className={classes.button}
*/