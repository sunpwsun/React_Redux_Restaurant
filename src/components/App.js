import { Route } from 'react-router-dom'
import './App.css'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SignIn from './SignIn/SignIn'
import Init from './Init/Init'
import SignUp from './SignUp/SignUp'
import AppContainer from '../containers/AppContainer'
import MenuListContainer from '../containers/MenuListContainer'
import StatContainer from '../containers/StatContainer'
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
                {/* <Route exact path = '/'                 component = {SignIn} /> */}
                <Route exact path = '/'                 component = {Init} />
                <Route       path = '/signup'           component = {SignUp} />
                <Route       path = '/restaurant'       component = {AppContainer} />
                <Route       path = '/menu'             component = {MenuListContainer} />
                <Route       path = '/stat'             component = {StatContainer} />
              
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


