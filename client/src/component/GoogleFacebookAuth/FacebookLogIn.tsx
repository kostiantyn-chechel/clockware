import React, { useState } from 'react';
import * as queryString from 'query-string';

const FacebookLogIn: React.FC = (props) => {
// @ts-ignore
    const { match, location } = props;
    const code = queryString.parse(location.search).code;

    console.log('facebook', queryString.parse(location.search));


    return (
        <React.Fragment>
            <p>Fasebook LogIn</p>
            <p>{code}</p>
        </React.Fragment>
    );
};

export default FacebookLogIn;