// Libraries
import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Actions
import {
    requestAccessToken,
    receiveAccessToken,
    receiveAccessTokenError,
} from '../../actions';
// Components
import ArtistRoute from '../ArtistRoute';
// Styles
import GlobalStyles from '../GlobalStyles';

const DEFAULT_ARTIST_ID = '6qqNVTkY8uBg9cP3Jd7DAH';

const App = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(requestAccessToken());

        fetch('/spotify_access_token', { method: 'GET' })
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                dispatch(receiveAccessToken(json.access_token));
            })
            .catch((err) => {
                console.error(err);
                dispatch(receiveAccessTokenError());
            });
    }, []);

    return (
        <Router>
            <Wrapper>
                <Switch>
                    <Route path="/artists/:artistId">
                        <ArtistRoute />
                    </Route>
                    <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
                </Switch>
            </Wrapper>
            <GlobalStyles />
        </Router>
    );
};

const Wrapper = styled.div``;

export default App;
