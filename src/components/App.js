import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppContainer from '../containers/AppContainer'
import MenuListContainer from '../containers/MenuListContainer'
import * as service from '../services/restaurants'
import * as restaurantAction from '../store/modules/restaurant'

class App extends Component {

    componentDidMount() {
    
        const { RestaurantActions } = this.props

        // Once the app runs, gets the current geolocaion and city list
        RestaurantActions.getCityList()
        RestaurantActions.getPosition()    
    }
  
    render() {
     
        return (
            <div>
                <Route exact path = '/'     component = {AppContainer} />
                <Route       path = '/menu' component = {MenuListContainer} />
            </div>
        )
    }
}


// state -> props
export default connect(
    (state) => ({
        //
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)(App);
