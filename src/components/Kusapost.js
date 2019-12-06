import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteKusapost from './DeleteKusapost';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeKusapost, unlikeKusapost } from '../redux/actions/dataActions';

const styles = {
	card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20        
    },
    image: {
        minWidth: 150,
        minHeight: 150,
        border: 'solid black 3px',
        borderRadius: '5px 5px'
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Kusapost extends Component {
    likedKusapost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.kusapostId === this.props.kusapost.kusapostId))
            return true;
        else 
            return false;
    };

    likeKusapost = () => {
        this.props.likeKusapost(this.props.kusapost.kusapostId);
    };

    
    unlikeKusapost = () => {
        this.props.unlikeKusapost(this.props.kusapost.kusapostId);
    };

	render() {
        dayjs.extend(relativeTime)
		const {
			classes,
			kusapost: {
				body,
				createdAt,
				userImage,
				userHandle,
				kusapostId,
				likeCount,
				commentCount
            },
            user: {
                authenticated,
                credentials: {
                    handle
                }
            }
        } = this.props;
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
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

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteKusapost kusapostId={kusapostId} />
        ) : null;

		return (
			<Card className={classes.card}>
                <CardMedia 
                    image={userImage} 
                    title="Profile image" 
                    className={classes.image}
                />
				<CardContent className={classes.content}>
                    <Typography 
                        variant="h5"
                        component={Link} 
                        to={`/users/${userHandle}`}
                        color="primary"
                    >{userHandle}</Typography>
					<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount}</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount}</span>
                    {deleteButton}
				</CardContent>
			</Card>
		);
	}
}

Kusapost.propTypes = {
    likeKusapost: PropTypes.func.isRequired,
    unlikeKusapost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    kusapost: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likeKusapost,
    unlikeKusapost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Kusapost));
