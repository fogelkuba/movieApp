import React from 'react';
import { Button, Collapse, CardBody, Card} from 'reactstrap';
const API = 'http://api.tvmaze.com/';
import fire from './fire.jsx';

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            watched: false
        };
    }
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }


    toggleWatched = () => {
        console.log('obejrzano:' + this.props.item.id);
        this.setState({
            watched: !this.state.watched
        })

        console.log(!this.state.watched)
        let id = this.props.item.id;
        fire.database().ref('users/' + this.props.userData.uid + '/shows/' + this.props.id +'/'+ id).set({
            watched: !this.state.watched
        })
    }

    componentWillMount(){
        // fire.database().ref('users/' + this.props.userData.uid + '/shows/' + this.props.id +'/'+ id)
        // .on('value', snap => {
        //     console.log(snap.val());
        // })
        console.log('will mount')
    }
    render(){

        return(
            <li>
                <input onChange={this.toggleWatched} type="checkbox" value={this.state.watched}/>
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
