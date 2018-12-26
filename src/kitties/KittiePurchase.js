import React, {Component} from "react";
import {Button, Image, Modal} from "react-bootstrap";


class KittiePurchase extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isBuying: false
        };

        this.state = this.initialState;
    }



    isBuying = (isBuying) => {
        this.setState({isBuying: isBuying});
    };



    close = () => {
        this.setState(this.initialState);
    };

    render() {
        if (this.props.selectedKittie) {
            return (
                <Modal show={this.props.showDetails} onHide={this.props.handleCloseDetails} onExited={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Kittie Purchase</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image src={this.props.selectedKittie.url} responsive/>
                        <Modal.Footer>
                            <div className="text-center">
                                <h2>{window.web3.utils.fromWei(this.props.selectedKittie.price, 'ether')} ETH</h2>
                                <Button style={{minWidth: '100px'}}
                                        bsStyle="success"
                                        disabled={this.state.isBuying}
                                        onClick={() => this.props.buyKittie(this.isBuying)}>{this.state.isBuying ? 'Processing...' : 'Buy'}</Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
            );
        } else {
            return (<div/>)
        }
    }
}

export default KittiePurchase;