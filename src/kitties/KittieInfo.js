import React, {Component} from "react";
import {Button, ControlLabel, Form, FormControl, FormGroup, Image, Label, Modal} from "react-bootstrap";


class KittieInfo extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            sellFlag: false,
            isSelling: false,
            isCanceling: false,
            value: ''
        };

        this.state = this.initialState;
    }

    showSellButton = () => {
        this.setState({
            sellFlag: true
        })
    };

    isSelling = (isSelling) => {
        this.setState({isSelling: isSelling});
    };

    isCanceling = (isCanceling) => {
        this.setState({isCanceling: isCanceling});
    };

    handleChange = event => {
        const {name, value} = event.target;
        if (value >= 0) {
            this.setState({
                [name]: value
            });
        }

    };


    close = () => {
        this.setState(this.initialState);
    };

    render() {
        if (this.props.selectedKittie) {
            const style = this.state.sellFlag ? {} : {visibility: 'hidden'};
            return (
                <Modal show={this.props.showDetails} onHide={this.props.handleCloseDetails} onExited={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Kittie Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image src={this.props.selectedKittie.url} responsive/>
                        <div style={this.props.selectedKittie.forSale ? {} : {height: '0'}}>
                            <div className="text-center"
                                 style={this.props.selectedKittie.forSale ? {} : {visibility: 'hidden'}}>
                                <h1><Label bsStyle="warning">For Sale</Label></h1>
                                <h2>{window.web3.utils.fromWei(this.props.selectedKittie.price, 'ether')} ETH</h2>
                                <Button style={{minWidth: '100px'}}
                                        bsStyle="danger"
                                        disabled={this.state.isCanceling}
                                        onClick={() => this.props.kittieCancelSale(this.isCanceling)}>{this.state.isCanceling ? 'Processing...' : 'Cancel'}</Button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={!this.props.selectedKittie.forSale ? {} : {visibility: 'hidden'}}>
                        <Form inline>
                            <FormGroup style={style}>
                                <ControlLabel>Price in ETH</ControlLabel>
                                <FormControl
                                    style={{margin: '10px'}}
                                    type="number"
                                    name="value"
                                    disabled={this.state.isSelling}
                                    value={this.state.value}
                                    placeholder="0.0001"
                                    onChange={this.handleChange}/>
                            </FormGroup>
                            <Button style={{minWidth: '100px'}}
                                    bsStyle="primary"
                                    disabled={this.state.isSelling}
                                    onClick={this.state.sellFlag ? () => this.props.sellKittie(this.state.value, this.isSelling) : this.showSellButton}>
                                {this.state.sellFlag ? this.state.isSelling ? 'Processing...' : 'Confirm' : 'Sell'}
                            </Button>
                        </Form>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            return (<div/>)
        }
    }
}

export default KittieInfo;