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
    //onClick(): any;
}

const Card: React.FC<CardProps> = ({img, value}: CardProps) => {
    return (
        <button
            className="card"
            // onClick={onClick()}
        >
            <div className="card__inner">
                <div className="card__back">
                    <img src={logo} alt="back of a card"/>
                </div>
                <div className="card__face">
                    {value}
                </div>
            </div>

        </button>
    )
}

class Table extends React.Component {
    renderCard() {
        return (
            <Card value={3}/>
        );
    }
    render() {
        return (
            <div className="table">
                {this.renderCard()}
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
