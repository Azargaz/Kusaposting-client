import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeKusapost, unlikeKusapost } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    likedKusapost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.kusapostId === this.props.kusapostId))
            return true;
        else 
            return false;
    };

    likeKusapost = () => {
        this.props.likeKusapost(this.props.kusapostId);
    };


    unlikeKusapost = () => {
        this.props.unlikeKusapost(this.props.kusapostId);
    };

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                        <FavoriteBorder color="primary"/>                    
                </MyButton>
            </Link>
        ) : (
            this.likedKusapost() ? (
                <MyButton tip="Unlike" onClick={this.unlikeKusapost}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeKusapost}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        );
        return likeButton
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    kusapostId: PropTypes.string.isRequired,
    likeKusapost: PropTypes.func.isRequired,
    unlikeKusapost: PropTypes.func.isRequired    
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likeKusapost,
    unlikeKusapost
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
