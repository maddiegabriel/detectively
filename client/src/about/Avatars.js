import React from "react";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    avatar: {
        margin: 10,
        width: 100,
        height: 100,
    },
};

function Avatars(props) {
    const { classes } = props;
    return (
        <Grid container justify="center" alignItems="center">
            <Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Avatar alt="Caroline" className={classes.avatar} src={require("./avis/caroline.jpg")}/>
                    <Typography variant="overline">Caroline</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Avatar alt="Andrew" className={classes.avatar} src={require("./avis/andrew.png")}/>
                    <Typography variant="overline">Andrew</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Avatar alt="Quinn" className={classes.avatar} src={require("./avis/quinn.jpg")}/>
                    <Typography variant="overline">Quinn</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Avatar alt="Ryland" className={classes.avatar} src={require("./avis/ryland.jpg")}/>
                    <Typography variant="overline">Ryland</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Avatar alt="Jordan" className={classes.avatar} src={require("./avis/jordan.png")}/>
                    <Typography variant="overline">Jordan</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Avatar alt="Maddie" className={classes.avatar} src={require("./avis/maddie.jpg")}/>
                    <Typography variant="overline">Maddie</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Avatar alt="Yuke" className={classes.avatar} src={require("./avis/yuke.png")}/>
                    <Typography variant="overline">Yuke</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

Avatars.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Avatars);