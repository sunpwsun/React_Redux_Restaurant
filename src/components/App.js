import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import AppContainer from '../containers/AppContainer'
import MenuListContainer from '../containers/MenuListContainer'
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
                <Route exact path = '/'                 component = {SignIn} />
                <Route       path = '/signup'           component = {SignUp} />
                <Route       path = '/restaurant'       component = {AppContainer} />
                <Route       path = '/menu'             component = {MenuListContainer} />
              
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


console.log('STRIPE KEY', process.env.REACT_APP_STRIPE_KEY)
console.log('GOOGLE_API_KEY', process.env.GOOGLE_MAP_API_KEY)
console.log('ENV', process.env.NODE_ENV)