import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Kusapost from '../components/kusapost/Kusapost';
import StaticProfile from '../components/profile/StaticProfile';
import KusapostSkeleton from '../util/KusapostSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        kusapostIdParam: null
    }
    componentDidMount() {
        const handle = this.props.match.params.handle;
        const kusapostId = this.props.match.params.kusapostId;

        if(kusapostId) this.setState({ kusapostIdParam: kusapostId });

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
        const { kusapostIdParam } = this.state;

        const kusapostsMarkup = loading ? (
            <KusapostSkeleton />
        ) : kusaposts === null ? (
            <p>No kusaposts from this user</p>
        ) : !kusapostIdParam ? (
            kusaposts.map(kusapost => <Kusapost key={kusapost.kusapostId} kusapost={kusapost} />)
        ) : (
            kusaposts.map(kusapost => {
                if(kusapost.kusapostId !== kusapostIdParam)
                    return <Kusapost key={kusapost.kusapostId} kusapost={kusapost} />
                else
                    return <Kusapost key={kusapost.kusapostId} kusapost={kusapost} openDialog />
            })
        )
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {kusapostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton />
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
