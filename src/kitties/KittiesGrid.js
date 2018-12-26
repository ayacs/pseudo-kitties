import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import KittieInfo from "./KittieInfo"
import Kittie from "./Kittie";


class KittiesGrid extends Component {
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

    sellKittie = (priceInEth, isSelling) => {
        if (!isNaN(priceInEth) && priceInEth > 0) {
            this.props.sellKittie(this.props.kitties[this.state.selectedKittieIndex].id, priceInEth, isSelling, this.handleCloseDetails)
        }
    };

    kittieCancelSale = (isCanceling) => {
        this.props.kittieCancelSale(this.props.kitties[this.state.selectedKittieIndex].id, isCanceling)
    };

    render() {
        const columns = this.props.kitties.map((entry, index) => {
            return <Col xs={6} md={4} key={index}>
                <Kittie
                    kittie={this.props.kitties[index]}
                    showKittieDetails={() => this.handleShowDetails(index)}
                />
            </Col>;
        });
        return (
            <div>
                <Grid className="kitties-grid" fluid={true}>
                    <Row>{columns}</Row>
                </Grid>
                <KittieInfo
                    handleCloseDetails={this.handleCloseDetails}
                    showDetails={this.state.showDetails}
                    selectedKittie={this.props.kitties[this.state.selectedKittieIndex]}
                    sellKittie={this.sellKittie}
                    kittieCancelSale={this.kittieCancelSale}
                />
            </div>
        );
    }
}

export default KittiesGrid;