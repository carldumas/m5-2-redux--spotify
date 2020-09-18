// Libraries
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
// Components
import ArtistRoute from '../ArtistRoute';
// Styles
import styled from 'styled-components';
import GlobalStyles from '../GlobalStyles';

const DEFAULT_ARTIST_ID = '6qqNVTkY8uBg9cP3Jd7DAH';

const App = () => {
    return (
        <Router>
            <Wrapper>
                <Switch>
                    <Route path="/artists/:id">
                        <ArtistRoute />
                    </Route>
                    <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
                </Switch>
            </Wrapper>
            TODO
            <GlobalStyles />
        </Router>
    );
};

const Wrapper = styled.div``;

export default App;
