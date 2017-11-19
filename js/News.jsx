import React from 'react';

class News extends React.Component {
    render(){
        console.log("News: " + this.props.userData)
        return(
            <section>
                News
            </section>
        );
    }
}

export default News;
