import React, {Component} from "react";
import {Label, Thumbnail} from "react-bootstrap";


class Kittie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didLoad: false
        }
    }

    onLoad = () => {
        this.setState({
            didLoad: true
        })
    };

    render() {
        const style = this.state.didLoad ? {} : {visibility: 'hidden'};
        const {kittie, showKittieDetails} = this.props;
        const price =
            <h2 className="text-center">{window.web3.utils.fromWei(this.props.kittie.price, 'ether')} ETH</h2>;
        const forSale =
            <div className="text-center" style={kittie.forSale ? {} : {visibility: 'hidden'}}>
                <h1><Label bsStyle="warning">For Sale</Label></h1>
            </div>;
        return (
            <div
                style={style}>
                <Thumbnail
                    href="#"
                    onLoad={this.onLoad}
                    onClick={showKittieDetails}
                    src={kittie.url}/>
                {this.props.inShop ? price : forSale}
            </div>
        )
    }
}

export default Kittie;