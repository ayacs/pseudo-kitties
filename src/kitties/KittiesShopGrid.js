import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import Kittie from "./Kittie";
import KittiePurchase from "./KittiePurchase";


class KittiesShopGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            selectedKittieIndex: undefined
        };
    }


    handleCloseDetails = () => {
        this.setState({showDetails: false});
    };


    handleShowDetails = (index) => {
        this.setState({
            selectedKittieIndex: index,
            showDetails: true
        });
    };

    buyKittie = (isBuying) => {
        const selectedKittie = this.props.kittiesForSale[this.state.selectedKittieIndex];
        this.props.buyKittie(selectedKittie.id, selectedKittie.price, isBuying, this.handleCloseDetails)
    };


    render() {
        if (this.props.kittiesForSale) {
            const columns = this.props.kittiesForSale.map((entry, index) => {
                return <Col xs={6} md={4} key={index}>
                    <Kittie
                        inShop={true}
                        kittie={this.props.kittiesForSale[index]}
                        showKittieDetails={() => this.handleShowDetails(index)}
                    />
                </Col>;
            });
            return (
                <div>
                    <Grid className="kitties-grid" fluid={true}>
                        <Row>{columns}</Row>
                    </Grid>
                    <KittiePurchase
                        handleCloseDetails={this.handleCloseDetails}
                        showDetails={this.state.showDetails}
                        selectedKittie={this.props.kittiesForSale[this.state.selectedKittieIndex]}
                        buyKittie={this.buyKittie}
                    />
                </div>
            );
        } else {
            return (<div/>)
        }
    }
}

export default KittiesShopGrid;