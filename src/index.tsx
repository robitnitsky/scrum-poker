import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import logo from './logo.svg';

interface CardProps {
    img?: string;
    value: number;
    order: number;
    qty: number;
    isOpen: boolean;
    //onClick(): any;
}

interface CardState {
    img: string;
    value: number;
    order: number;
    qty: number;
}

class Card extends React.Component<CardProps, CardState> {
    constructor(props: CardProps | Readonly<CardProps>) {
        super(props);
    }

    style() {
        const angle = (360 / this.props.qty) * this.props.order;
        return {
            transform: `translate(${getCoordinatesOnCircle(200, angle).x - 15}px, ${getCoordinatesOnCircle(200, angle).y - 25}px)`
        };
    };
    render() {
        return (
            <button
                className={`card ${this.props.isOpen ? 'card--opened' : ''}`}
                data-order={this.props.order}
                style={this.style()}
                // onClick={onClick()}
            >
                <div className="card__inner">
                    <div className="card__back">
                        <img src={logo} alt="back of a card"/>
                    </div>
                    <div className="card__face">
                        {this.props.value}
                    </div>
                </div>

            </button>
        );
    }
}

interface TableProps {}

interface TableState {
    showAllCards: boolean;
}

class Table extends React.Component<TableProps, TableState> {
    constructor(props: TableProps | Readonly<TableProps>) {
        super(props);

        this.state = {
            showAllCards: false,
        };
    }
    handleClick = () => {
        this.setState({showAllCards: !this.state.showAllCards})
    }
    cards() {
        const array = [];
        for (let i = 0; i < 15; i++) {
            array.push(
                <Card value={i} order={i} key={i} qty={15} isOpen={this.state.showAllCards}/>
            );
        }
        return array;
    };
    render() {
        return (
            <div className="table-wrapper">
                {this.cards()}
                <div className="table">
                    <button className="btn" onClick={() => this.handleClick()}>Show cards</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <div className="container">
            <Table />
        </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function getCoordinatesOnCircle(radius:number, angle:number) {
    return {
        x: radius * Math.cos(angle * Math.PI / 180),
        y: radius * Math.sin(angle * Math.PI / 180),
    };
}