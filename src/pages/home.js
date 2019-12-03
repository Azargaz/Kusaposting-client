import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Kusapost from '../components/Kusapost';
import Profile from '../components/Profile'

class home extends Component {
    state = {
        kusaposts: null
    }
    
    componentDidMount() {
        axios.get('/kusaposts')
            .then(res => {
                console.log(res.data);
                this.setState({
                    kusaposts: res.data
                })
            })
            .catch(err => console.error(err));
    }

    render() {
        let recentkusapostsMarkup = this.state.kusaposts ? (
            this.state.kusaposts.map((kusapost, id) => <Kusapost key={id} kusapost={kusapost} />)
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

export default home