import React, {Component} from 'react'
import { connect } from 'react-redux'
import RestaurantListBody from '../components/RestaurantListBody/RestaurantListBody'
import { bindActionCreators } from 'redux'
import * as restaurantActions from '../store/modules/restaurant'
import { RestaurantActions } from '../store/actionCreators'
import CascaderRestaurantPageContainer from './CascaderRestaurantPageContainer'


class RestaurantsListContainer extends Component {

    handleChangeCity = (cityID) => {
        
        RestaurantActions.getRestaurantList(cityID)
                        
    }

    handleSelectRestaurant = (restaurantID) => {
        RestaurantActions.selectRestaurant(restaurantID)
    }

    handleSetFirstRestaurantListFetch = (value) => {
        RestaurantActions.setFirstRestaurantListFetch(value)
    }

    render() {
          
        if( !this.props.firstRestaurantListFetch ) {
            this.handleChangeCity(this.props.selectedCityID)
        
            if( this.props.selectedCityID > 0 )
                this.handleSetFirstRestaurantListFetch( true )
        }

        return(
            <div>

                <CascaderRestaurantPageContainer 
                    cityList={this.props.cityList} 
                    value={this.props.selectedCityID}
                    onChangeCity={this.handleChangeCity} />
                
                { !this.props.pendingRestaurantList &&
                    <RestaurantListBody
                        restaurantList={this.props.restaurantList}
                        history={this.props.history} 
                        restaurantSortBy={this.props.restaurantSortBy} />
                }

            </div>
        )
    }
}


export default connect(
    (state) => ({
        cityList            : state.restaurant.cityList,
        selectedCityID      : state.restaurant.selectedCityID,
        restaurantList      : state.restaurant.restaurantList,
        restaurantSortBy    : state.restaurant.restaurantSortBy,
        firstRestaurantListFetch : state.restaurant.firstRestaurantListFetch
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantActions, dispatch)
    })
)(RestaurantsListContainer);
  
