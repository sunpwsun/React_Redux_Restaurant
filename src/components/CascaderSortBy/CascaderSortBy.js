import React, {Component} from 'react'
import './CascaderSortBy.css'
import { Cascader } from 'antd'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as restaurantActions from '../../store/modules/restaurant'
import { RestaurantActions } from '../../store/actionCreators'


class CascaderSortBy extends Component {


    onChangeSort = (e) => {
        RestaurantActions.changeRestaurantSortOpt(e)
    }   

    render() {

        let defaultVal = []
        defaultVal.push(this.props.restaurantSortBy)


        // sorting optins
        const sortOpt = [
            {value:'rating', label:'Rating'},
            {value:'distance', label:'Distance'},
            {value:'name', label:'Name'},
        ]


        return (

            <Cascader 
                options={sortOpt} 
                allowClear={false}
                defaultValue={defaultVal}
                onChange={this.onChangeSort} 
                placeholder="Please select" 
            />
        )
    }
}

//export default CascaderCityList



export default connect(
    (state) => ({
        restaurantSortBy : state.restaurant.restaurantSortBy
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantActions, dispatch)
    })
)(CascaderSortBy);