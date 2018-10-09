import { bindActionCreators } from 'redux'
import * as restaurantActions from './modules/restaurant'


import store from './index'

const { dispatch } = store

export const RestaurantActions = bindActionCreators(restaurantActions, dispatch)