import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class Form extends Component{
    constructor(props){
        super(props);

        this.initialState = {
            account: '',
            value: '',
            coin:'wei'
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };


    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    };

    render(){
        const {account, value} = this.state;

        return (
            <form>
                <FormGroup
                    bsSize="large">
                    <ControlLabel>Account</ControlLabel>
                    <FormControl
                        type="text"
                        name="account"
                        value={account}
                        onChange={this.handleChange}/>


                    <ControlLabel>Value</ControlLabel>
                    <div>
                        <FormControl
                            type="number"
                            name="value"
                            value={value}
                            onChange={this.handleChange}/>
                    </div>
                    <select name="coin" value={this.state.coin} onChange={this.handleChange}>
                        <option value="wei">wei</option>
                        <option value="gwei">gwei</option>
                        <option value="finney">finney</option>
                        <option value="ether">ether</option>
                    </select>
                    <input
                        type="button"
                        value="Submit"
                        onClick={this.submitForm}/>
                </FormGroup>
            </form>
        );
    }
}

export default Form;