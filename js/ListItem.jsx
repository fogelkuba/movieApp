import React from 'react';
import fire from './fire.jsx';
import { Button, Collapse, CardBody, Card} from 'reactstrap';
const API = 'http://api.tvmaze.com/';

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false
        };
    }
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }
    render(){
        return(
            <li>
                <input type="checkbox" />
                <Button onClick={this.toggle}>{this.props.item.name}</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <h4>{this.props.item.name}</h4>
                                <span>Season: {this.props.item.season} Episode: {this.props.item.number}</span>
                                <div dangerouslySetInnerHTML={{__html: this.props.item.summary}}></div>
                            </CardBody>
                        </Card>
                    </Collapse>

                <hr />
            </li>
        );
    }
}

export default ListItem;
