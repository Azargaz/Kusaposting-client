import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Kusapost from '../components/Kusapost';
import Profile from '../components/Profile'

import { connect } from 'react-redux';
import { getKusaposts } from '../redux/actions/dataActions';

class home extends Component {    
    componentDidMount() {
        this.props.getKusaposts();
    }

    render() {
        const { kusaposts, loading } = this.props.data;
        let recentkusapostsMarkup = !loading ? (
            kusaposts.map((kusapost, id) => <Kusapost key={id} kusapost={kusapost} />)
        ) : <p>Loading...</p>;
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentkusapostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getKusaposts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getKusaposts })(home);