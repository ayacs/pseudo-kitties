import React, {Component} from 'react';
import {Panel, Tab, Tabs} from "react-bootstrap";
import KittiesGrid from "./KittiesGrid"
import CreateKittie from "./CreateKittie";
import KittiesShopGrid from "./KittiesShopGrid";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false
        };
    }


    render() {
        if (this.props.kitties) {
            if (this.props.kitties.length === 0) {
                return (
                    <CreateKittie
                        createFirstKittie={this.props.createFirstKittie}
                    />
                );
            } else {
                return (
                    <Panel
                        style={{minHeight: '80vh'}}
                        bsStyle="info">
                        <Tabs
                            id="uncontrolled-tab"
                            defaultActiveKey={1}>
                            <Tab eventKey={1} title="My kitties">
                                <KittiesGrid
                                    sellKittie={this.props.sellKittie}
                                    kittieCancelSale={this.props.kittieCancelSale}
                                    kitties={this.props.kitties}
                                />
                            </Tab>
                            <Tab eventKey={2} title="Kitties Shop">
                                <KittiesShopGrid
                                    buyKittie={this.props.buyKittie}
                                    kittiesForSale={this.props.kittiesForSale}
                                />
                            </Tab>
                        </Tabs>
                    </Panel>
                );
            }
        } else {
            return (<div/>)
        }
    }

}

export default Main;