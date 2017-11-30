import React from 'react';
import './Credits.scss';
class Credits extends React.Component {
    render(){
        return(
            <div className="api-logo">
                Data provided by:
                <img src="../images/408x161-powered-by-rectangle-blue.png" className="logo" alt="MovieDb-logo" />
                <img src="images/tvm-header-logo.png" className="logo" alt="MovieDb-logo" />
            </div>
        );
    }
}
export default Credits;
