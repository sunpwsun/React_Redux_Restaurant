import React, {Component} from 'react'
import './CascaderCityList.css'
import { Cascader } from 'antd'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as restaurantActions from '../../store/modules/restaurant'
import { RestaurantActions } from '../../store/actionCreators'


// shows city list
class CascaderCityList extends Component {


    // moves to other city
    handleChangeCity = (cityID) => {

        RestaurantActions.selectCity(cityID)

        // after selecting new city, gets all the restaurants
        RestaurantActions.getRestaurantList(cityID)


        // setting a center position at the google map
        if( this.props.closestCityID !== cityID[0] ) {

            this.props.cityList.forEach(element => {
                if(element.cityID == cityID[0]) {
                    RestaurantActions.setMapCenter( element.latitude, element.longitude)
                }    
            })
        }
        else {
            RestaurantActions.setMapCenter( this.props.lat, this.props.long )
        }
    
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

        const options = this.props.cityList.map(
            ({cityID, city}) => ({
                value: cityID,
                label: city
            })
        )
        let defaultVal = []
        defaultVal.push(this.props.selectedCityID)


        return (

            <Cascader 
                options={options} 
                defaultValue={defaultVal}
                onChange={this.handleChangeCity} 
                placeholder='Please select'
            />
        )
    }
}


export default connect(
    (state) => ({
        closestCityID       : state.restaurant.closestCityID,
        lat : state.restaurant.lat,
        long : state.restaurant.long,
        cityList            : state.restaurant.cityList,
        selectedCityID      : state.restaurant.selectedCityID,
        restaurantList      : state.restaurant.restaurantList,
        restaurantSortBy    : state.restaurant.restaurantSortBy,
        firstRestaurantListFetch : state.restaurant.firstRestaurantListFetch,
        selectedCityObject : state.restaurant.selectedCityObject
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantActions, dispatch)
    })
)(CascaderCityList);