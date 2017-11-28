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

        // console.log(!this.state.watched)

        let id = this.props.item.id;
        if (this.state.watched !== true) {
            fire.database().ref('users/' + this.props.userData.uid + '/shows/' + this.props.id +'/watched/'+ id).set({
                // watched: !this.state.watched
                watched: true
            })
        }else{
            fire.database().ref('users/' + this.props.userData.uid + '/shows/' + this.props.id +'/watched/'+ id).remove();
        }


    }

    shouldComponentUpdate = (nextProps, nextState) =>{
        return nextState.collapse == this.state.collapse
    }

    componentWillMount(){
        // console.log('will mount');
        let obj = {
            watched: true
        }

        if (this.props.watched.hasOwnProperty(this.props.item.id) == true  ) {
            this.setState({
                watched: true
            })
        }
    }
    render(){
        console.log('render');
        let hasProperty = this.props.watched.hasOwnProperty(this.props.item.id);

        // console.log('hasProperty:' + hasProperty + '|' + 'isWatched:' + this.props.watched[this.props.item.id]);
        // console.log(this.props.watched[this.props.item.id].watched);
        // console.log('===');
        // console.log(this.props.item.id)


        return(
            <li>
                {status}
                <input defaultChecked={this.state.watched} onChange={this.toggleWatched} type="checkbox" value={this.state.watched}/>
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
