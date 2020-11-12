import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import withReduxSaga from 'next-redux-saga';
import wrapper from "../store/configureStore";


const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType,
};

export default wrapper.withRedux(withReduxSaga(NodeBird));
