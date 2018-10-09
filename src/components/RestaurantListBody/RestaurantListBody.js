import React, { Component } from 'react';
import './RestaurantListBody.css'
import ScrollRestaurantList from '../ScrollRestaurantList/ScrollRestaurantList'
import MapContainer from '../../containers/MapContainer'

class RestaurantListBody extends Component {


    render() {

        return (            
            <div className='container'>
                <div className='item'>
                    <ScrollRestaurantList 
                        data={this.props.restaurantList}
                        history={this.props.history}
                        restaurantSortBy={this.props.restaurantSortBy}
                    />
                </div>
                <div className='item'>
                    <MapContainer />
                </div>
            </div>
        )
    }
}


export default RestaurantListBody