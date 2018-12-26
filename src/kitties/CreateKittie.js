import React, {Component} from "react";
import {Button, Well} from "react-bootstrap";


class CreateKittie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false
        };
    }

    isCreating = (isCreating) => {
        this.setState({isCreating: isCreating});
    };

    render(){
        return (
            <Well className="center-block wellGenerate">
            <span
                className="h2 center-block text-center">{this.state.isCreating ? 'Creating your first Pseudo Kittie' : 'Create your first Pseudo Kittie'}</span>
                <Button
                    className="center-block"
                    bsStyle="primary"
                    bsSize="large"
                    disabled={this.state.isCreating}
                    onClick={!this.state.isCreating ? () => this.props.createFirstKittie(this.isCreating) : null}>{this.state.isCreating ? 'Creating...' : 'Create'}</Button>
            </Well>
        );
    }
}

export default CreateKittie;