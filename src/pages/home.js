import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Kusopost from '../components/Kusopost';

class home extends Component {
    state = {
        kusoposts: null
    }
    
    componentDidMount() {
        axios.get('/kusoposts')
            .then(res => {
                console.log(res.data);
                this.setState({
                    kusoposts: res.data
                })
            })
            .catch(err => console.error(err));
    }

    render() {
        let recentKusopostsMarkup = this.state.kusoposts ? (
            this.state.kusoposts.map((kusopost, id) => <Kusopost key={id} kusopost={kusopost} />)
        ) : <p>Loading...</p>;
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentKusopostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home