import React, {Component} from 'react'
import { Cascader } from 'antd'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as restaurantActions from '../../store/modules/restaurant'
import { RestaurantActions } from '../../store/actionCreators'
import './CascaderRestaurantList'

class CascaderRestaurantList extends Component {


    // selecting other restaurant
    handleChangeRestaurant = (restaurantID) => {
        
        console.log('Change Restaurant : ' + restaurantID + ' >')
        RestaurantActions.getMenuList(restaurantID)
    }


    handleSetFirstRestaurantListFetch = (value) => {
        RestaurantActions.setFirstRestaurantListFetch(value)
    }

    render() {

        const options = this.props.restaurantList.map(
            ({restaurantID, name}) => ({
                value: restaurantID,
                label: name
            })
        )
        let defaultVal = []
        defaultVal.push(this.props.selectedRestaurantID)


        return (

            <Cascader className='CascaderRestaurantList'
                options={options} 
                defaultValue={defaultVal}
                onChange={this.handleChangeRestaurant} 
                placeholder='Please select'
            />
        )
    }
}

export default connect(
    (state) => ({
        cityList            : state.restaurant.cityList,
        selectedCityID      : state.restaurant.selectedCityID,
        restaurantList      : state.restaurant.restaurantList,
        restaurantSortBy    : state.restaurant.restaurantSortBy,
        
        menuList            : state.restaurant.menuList,
        selectedRestaurantID : state.restaurant.selectedRestaurantID
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantActions, dispatch)
    })
)(CascaderRestaurantList);