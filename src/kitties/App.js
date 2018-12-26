import React, {Component} from 'react';
import Web3 from 'web3'
import {factoryABI, contractAddress} from '../ContractABI'
import {PageHeader} from "react-bootstrap";
import Main from "./Main";

class App extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            characters: [],
            kitties: undefined,
            kittiesForSale: undefined,
            userAccount: undefined,
            contract: undefined,
            updateKittiesEvent: undefined
        };

        this.state = this.initialState;
    }


    componentDidMount() {
        this.enableEthereum();
    }


    startApp() {
        window.web3.currentProvider.publicConfigStore.on('update', () => {
            window.web3.eth.getAccounts().then((accounts) => {
                if (accounts[0]) {
                    if (accounts[0] !== this.state.userAccount) {
                        this.unSubscribeOnEvents();
                        this.setState({
                            kitties: undefined,
                            kittiesForSale: undefined,
                            contract: new window.web3.eth.Contract(factoryABI, contractAddress),
                            userAccount: accounts[0],
                        });
                        this.subscribeOnEvents();
                        this.getKittiesByOwner();
                        this.getKittiesForSale();
                    }
                } else {
                    this.setState(this.initialState);
                }
            });
        });
    }

    enableEthereum = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable()
                .then(() => {
                    this.startApp()
                })
                .catch((error) => console.log(error))
        } else {
            alert(`'Non-Ethereum browser detected. You need install MetaMask!'`);
            window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn","_self")
        }
    };

    removeCharacter = index => {
        this.setState({
            characters: this.state.characters.filter((character, i) => {
                return i !== index;
            })
        })
    };

    subscribeOnEvents = () => {
        const contract = this.state.contract;
        if (contract) {
            this.setState({
                updateKittiesEvent: contract.events.UpdateOwnerKitties({filter: {owner: this.state.userAccount}})
            });
            this.state.updateKittiesEvent.on("data", () => {
                console.log("UpdateOwnerKitties");
                this.getKittiesByOwner();
                this.getKittiesForSale();
            });
            // contract.events.UpdateKittiesForSale()
            //     .on("data", () => {
            //         console.log("UpdateKittiesForSale");
            //         this.getKittiesForSale();
            //     })
        }
    };

    unSubscribeOnEvents = () => {
        const event = this.state.updateKittiesEvent;
        if (event) {
            event.unsubscribe();
        }
    };

    getKittiesByOwner = () => {
        const contract = this.state.contract;
        if (contract) {
            contract.methods.getKittiesByOwner(this.state.userAccount).call().then((kittiesResult) => this.getKitties(kittiesResult, "kitties"));
        }
    };

    getKittiesForSale = () => {
        const contract = this.state.contract;
        if (contract) {
            contract.methods.getKittiesForSale(this.state.userAccount).call().then((kittiesResult) => this.getKitties(kittiesResult, "kittiesForSale"));
        }
    };

    getKitties = (kittiesResult, kitties) => {
        let localKitties = [];
        let promises = kittiesResult.map(kittieId => this.state.contract.methods.kitties(kittieId).call());
        Promise.all(promises).then(kittiesResults => {
            let promises = kittiesResults.map(kittie =>
                fetch("https://api.cryptokitties.co/kitties/" + (parseInt(kittie.id) + 1))
                    .then(response => response.json())
                    .then(urlResult => {
                        localKitties = [...localKitties, {
                            id: kittie.id,
                            price: kittie.price,
                            forSale: kittie.forSale,
                            url: urlResult.image_url
                        }];
                    }));

            Promise.all(promises).then(() => {
                localKitties.sort((a, b) => b.id - a.id);
                this.setState({[kitties]: localKitties});
            });
        });
    };

    createFirstKittie = (isCreating) => {
        const contract = this.state.contract;
        if (contract) {
            contract.methods.createFirstKittie().send({
                from: this.state.userAccount,
                gasPrice: window.web3.utils.toWei('1', 'gwei')
            }).on("error", () => {
                isCreating(false);
            });
            isCreating(true);
        }
    };

    sellKittie = (kittieId, priceInEth, isSelling, closeKittieInfo) => {
        const contract = this.state.contract;
        if (contract) {
            let price = window.web3.utils.toWei(priceInEth, 'ether');
            console.log(price);
            contract.methods.kittieForSale(kittieId, price).send({
                from: this.state.userAccount,
                gasPrice: window.web3.utils.toWei('1', 'gwei')
            }).on("receipt", () => {
                isSelling(false);
                closeKittieInfo();
            }).on("error", () => {
                isSelling(false);
            });
            isSelling(true);
        }
    };

    buyKittie = (kittieId, price, isBuying, closeKittiePurchase) => {
        const contract = this.state.contract;
        if (contract) {
            contract.methods.buyKittie(kittieId).send({
                from: this.state.userAccount,
                value: price,
                gasPrice: window.web3.utils.toWei('1', 'gwei')
            }).on("receipt", () => {
                isBuying(false);
                closeKittiePurchase();
            }).on("error", () => {
                isBuying(false);
            });
            isBuying(true);
        }
    };

    kittieCancelSale = (kittieId, isCanceling) => {
        const contract = this.state.contract;
        if (contract) {
            contract.methods.kittieCancelSale(kittieId).send({
                from: this.state.userAccount,
                gasPrice: window.web3.utils.toWei('1', 'gwei')
            }).on("error", () => {
                isCanceling(false);
            });
            isCanceling(true);
        }
    };


    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]})
    };


    render() {
        const {characters} = this.state;
        return (
            <div className="container">
                <PageHeader className="center-block text-center title">PseudoKitties</PageHeader>
                <Main
                    kitties={this.state.kitties}
                    kittiesForSale={this.state.kittiesForSale}
                    createFirstKittie={this.createFirstKittie}
                    sellKittie={this.sellKittie}
                    buyKittie={this.buyKittie}
                    kittieCancelSale={this.kittieCancelSale}/>

            </div>
        );
    }
}

export default App;
