import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteKusapost from './DeleteKusapost';
import KusapostDialog from './KusapostDialog';
import LikeButton from './LikeButton';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';

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
                        to={`/user/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
					<Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton kusapostId={kusapostId} />
                    <span>{likeCount}</span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount}</span>
                    <KusapostDialog kusapostId={kusapostId} userHandle={userHandle} openDialog={this.props.openDialog} />
				</CardContent>
			</Card>
		);
	}
}

Kusapost.propTypes = {
    user: PropTypes.object.isRequired,
    kusapost: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Kusapost));
