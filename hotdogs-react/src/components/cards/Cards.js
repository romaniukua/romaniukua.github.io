import React, { Component } from 'react';


class Cards extends Component {

    state = {
        cards: []
    }

    componentDidMount() {
        fetch('https://formula-test-api.herokuapp.com/menu')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    cards: this.filterByExpiration(data)
                });
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }

    filterByExpiration(items) {
        // change this function to return only current items
        // where expirationDate > today's date
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();


        items = items.filter(item => {
            let [expMonth, expDay, expYear] = item.expirationDate.split('-').map(item => +item);

            let isYearExt = expYear > year;
            let isMonthExt = expYear === year && expMonth > month;
            let isDayExt = expYear === year && expMonth === month && expDay > day;

            return isYearExt || isMonthExt || isDayExt;
        });

        return items;
    };

    render() {
        const { cards } = this.state;
        const cardList = cards.length ? (
            cards.map(card => {
                return (
        <div className="card" key={card.id}>
                        <div className="card__img" style={{backgroundImage: `url(${card.backgroundURL})`}}></div>
                        <div className="card__content">
                            <div className="container">
                                <h2 className="card__title">{card.name}</h2>
                                <p className="card__text">{card.description}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
            <p className='alt_text'>There is no Dirty Dogs yet</p>
        );
    
        return(
            <section className='hod-dogs'>
                {cardList}
            </section>
        )

    }
}

export default Cards;