import React, { Component } from 'react';
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Loading extends Component {
    render() {
        return <div className="container pt-4" style={{ height: "70vh" }}>
            <FontAwesomeIcon
                className="svg-inline--fa fa-w-16 fa-lg"
                size="1x"
                style={{
                    position: "absolute",
                    top: "8vh",
                    left: "50%",
                    fontSize: "45px"
                }}
                icon={faSpinner}
                spin
            />
        </div>;
    }
}

export default Loading;