import React from 'react';
import './Credits.scss';
class Credits extends React.Component {
    render(){
        return(
            <div className="api-logo">
                Data provided by:
                <a href="https://www.themoviedb.org">
                    <img src="../images/408x161-powered-by-rectangle-blue.png" className="logo" alt="MovieDb-logo" />
                </a>
                <a href="https://www.tvmaze.com/">
                    <img src="images/tvm-header-logo.png" className="logo" alt="MovieDb-logo" />
                </a>
            </div>
        );
    }
}
export default Credits;
