// Libraries
import React from 'react';
import { useSelector } from 'react-redux';

const ArtistRoute = () => {
    const accessToken = useSelector((state) => state.auth.token);
    console.log(accessToken);

    if (!accessToken) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>{accessToken}</div>
        </>
    );
};

export default ArtistRoute;
