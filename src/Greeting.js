import React, {Component} from 'react';


class Greeting extends Component{
    constructor(props){
        super(props);

        this.state = {
            greeting: 'Hello world',
            new_greeting: ''
        }
    }

    getGreeting = () => {
        const contract = this.props.contract;
        if (contract) {
            contract.methods.greet().call().then((greeting) => {
                this.setState({
                    greeting: greeting
                });
            });
        }else{
            this.props.enableEthereum();
        }
    };

    handleChange = event => {
        this.setState({
            new_greeting: event.target.value
        });
    };

    setGreeting = () => {
        const contract = this.props.contract;
        if(contract){
            contract.methods.setGreeting(this.state.new_greeting)
                .send({from: this.props.userAccount})
                .on("receipt", (receipt) =>{
                    this.setState({
                        new_greeting: ''
                    });
                })
                .on("error", (error) => {
                    console.log(error)
                    this.setState({
                        new_greeting: ''
                    });
                })
        }
    }


    render() {
        const {new_greeting} = this.state;

        return (
            <div>
                <label style={{textAlign: 'center'}}>CURRENT ACC:<p>{this.props.userAccount}</p></label>
                <div>
                    <div style={{display: 'inline-block', margin: '20px'}}>
                <input
                    type="text"
                    name="account"
                    value={new_greeting}
                    onChange={this.handleChange}/>
                    </div>
                <input
                    type="button"
                    value="Set greeting"
                    onClick={this.setGreeting}/>
                </div>
                <div>
                    <div style={{display: 'inline-block', margin: '20px'}}>
                        <label>{this.state.greeting}</label>
                    </div>
                    <input
                        type="button"
                        value="Get greeting"
                        onClick={this.getGreeting}/>
                </div>
            </div>
        );
    }
}

export default Greeting;