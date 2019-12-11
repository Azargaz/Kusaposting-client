import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteKusapost } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
};

class DeleteKusapost extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteKusapost = () => {
        this.props.deleteKusapost(this.props.kusapostId);
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props; 
        return (
            <Fragment>
                <MyButton
                    tip="Cut the grass!"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this kusapost?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteKusapost} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
};

DeleteKusapost.propTypes = {
    deleteKusapost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    kusapostId: PropTypes.string.isRequired
}

export default connect(null, { deleteKusapost })(withStyles(styles)(DeleteKusapost));
