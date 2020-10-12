// Libraries
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Helpers
import { fetchArtistProfile } from '../../helpers/api-helpers';
// Actions
import {
    requestArtistProfile,
    receiveArtistProfile,
    receiveArtistProfileError,
} from '../../actions';

const ArtistRoute = () => {
    const accessToken = useSelector((state) => state.auth.token);
    const { status, currentArtist } = useSelector((state) => state.artists);

    const { artistId } = useParams();

    const dispatch = useDispatch();

    const roundFollowersNumber = (followers) => {
        const num = Number(followers);

        if (num > 999 && num < 999999) {
            return Math.round(num / 1000) + 'K';
        } else if (num > 999999 && num < 999999999) {
            return Math.round(num / 1000000) + 'M';
        } else if (num > 999999999) {
            return Math.round(num / 1000000000) + 'B';
        } else {
            return num;
        }
    };

    let genresArray = [];
    if (currentArtist !== null) {
        genresArray = currentArtist.profile.genres.slice(0, 2);
    }

    React.useEffect(() => {
        if (!accessToken) {
            return;
        }
        dispatch(requestArtistProfile());
        fetchArtistProfile(accessToken, artistId)
            .then((data) => {
                dispatch(receiveArtistProfile(data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(receiveArtistProfileError());
            });
    }, [accessToken]);

    if (status === 'loading' || !currentArtist) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <TitleWrapper>
                <Image
                    src={currentArtist.profile.images[1].url}
                    alt={currentArtist.profile.name}
                />
                <div>
                    <Title>{currentArtist.profile.name}</Title>
                </div>
            </TitleWrapper>
            <ContentWrapper>
                <FollowersWrappers>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>
                        {roundFollowersNumber(
                            currentArtist.profile.followers.total
                        )}
                    </div>
                    <span style={{ color: '#808080' }}>&nbsp;followers</span>
                </FollowersWrappers>
                <div
                    style={{
                        fontSize: '22px',
                        paddingBottom: '16px',
                        fontWeight: '600',
                    }}
                >
                    top tracks
                </div>
                <div
                    style={{
                        fontSize: '22px',
                        paddingBottom: '16px',
                        fontWeight: '600',
                    }}
                >
                    tags
                </div>
                <div>
                    <GenresList style={{ fontSize: '11px' }}>
                        {genresArray.map((item) => {
                            return <GenreItem key={item}>{item}</GenreItem>;
                        })}
                    </GenresList>
                </div>
            </ContentWrapper>
        </Wrapper>
    );
};

const Loader = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    border: 6px solid lightgray;
    border-radius: 50%;
    border-top: 6px solid #575555;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: black;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 59px;
    color: white;
`;

const Image = styled.img`
    border-radius: 50%;
    margin: 0;
    width: 175px;
    height: 175px;
`;

const Title = styled.div`
    align-items: center;
    display: inline-block;
    width: 268px;
    margin-top: -50px;
    font-size: 48px;
    font-weight: 600;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`;

const FollowersWrappers = styled.div`
    display: flex;
    color: #ff4fd8;
    padding-top: 20px;
    padding-bottom: 60px;
`;

const GenresList = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
`;

const GenreItem = styled.li`
    text-align: center;
    padding: 8px 20px 8px;
    margin-right: 20px;
    background: rgba(75, 75, 75, 0.4);
    border-radius: 6px;
`;

export default ArtistRoute;
