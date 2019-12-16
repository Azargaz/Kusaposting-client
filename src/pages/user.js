import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Kusapost from '../components/kusapost/Kusapost';
import StaticProfile from '../components/profile/StaticProfile';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null
    }
    componentDidMount() {
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch(err => {
                console.error(err);
            });
    };

    render() {
        const { kusaposts, loading } = this.props.data;

        const kusapostsMarkup = loading ? (
            <p>Loading...</p>
        ) : kusaposts === null ? (
            <p>No kusaposts from this user</p>
        ) : (
            kusaposts.map(kusapost => <Kusapost key={kusapost.kusapostId} kusapost={kusapost} />)
        )
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {kusapostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p>Loading profile...</p>
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
