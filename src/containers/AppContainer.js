import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as restaurantActions from '../store/modules/restaurant'
import Title from '../components/Title/Title'
import * as service from '../services/restaurants'
import { RestaurantActions } from '../store/actionCreators'
import RestaurantsListContainer from './RestaurantsListContainer'
import { Spin } from 'antd'
import './AppContainer.css'



class AppContainer extends Component {

    render() {
 
        const {pendingPos, pendingCity, cityList, gotCurrentCity, lat, long} = this.props

        if( !pendingCity && !pendingPos) {

            let i
            let dis = []
            for( i = 0 ; i < cityList.length ; i++ ) {
                
                dis[ i ] =  Math.pow( cityList[ i ].latitude  - lat, 2 ) +
                            Math.pow( cityList[ i ].longitude - long, 2 )
                
            }

            // find which city is closest
            const closestCityIndex = dis.indexOf( Math.min.apply( null, dis ) )

            
            if( cityList.length !== 0 && !gotCurrentCity ) {
                RestaurantActions.setClosestCity( cityList[closestCityIndex].cityID )            
            }
        }

        return( 
            <div>
                <Title pathname={this.props.location.pathname} />
                { ( pendingCity || pendingPos )
                    ? <div><Spin className='loading' tip='Loading...' size='large' /></div>
                    : <RestaurantsListContainer history={this.props.history} />
                    
                }
            </div>
        )

    }
}


export default connect(
    (state) => ({
        pendingCity         : state.restaurant.pendingCity,
        pendingPos          : state.restaurant.pendingPos,
        cityList            : state.restaurant.cityList,
        selectedCity        : state.restaurant.selectedCity,
        restaurantList      : state.restaurantList,
        selectedRestaurant  : state.restaurant.selectedRestaurant,
        lat                 : state.restaurant.lat,
        long                : state.restaurant.long,
        gotCurrentCity      : state.restaurant.gotCurrentCity
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantActions, dispatch)
    })
)( AppContainer )
