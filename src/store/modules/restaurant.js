import { handleActions } from 'redux-actions'
import * as service from '../../services/restaurants'


const GET_CITYLIST_PENDING = 'GET_CITYLIST_PENDING'
const GET_CITYLIST_SUCCESS = 'GET_CITYLIST_SUCCESS'
const GET_CITYLIST_FAILURE = 'GET_CITYLIST_FAILURE'

const GET_POSITION_PENDING = 'GET_POSITION_PENDING'
const GET_POSITION_SUCCESS = 'GET_POSITION_SUCCESS'
//const GET_POSITION_FAILURE = 'GET_POSITION_FAILURE'

const GET_RESTAURANTLIST_PENDING = 'GET_RESTAURANTLIST_PENDING'
const GET_RESTAURANTLIST_SUCCESS = 'GET_RESTAURANTLIST_SUCCESS'
const GET_RESTAURANTLIST_FAILURE = 'GET_RESTAURANTLIST_FAILURE'

const GET_MENULIST_PENDING = 'GET_MENULIST_PENDING'
const GET_MENULIST_SUCCESS = 'GET_MENULIST_SUCCESS'
const GET_MENULIST_FAILURE = 'GET_MENULIST_FAILURE'

const GET_REST_REVIEWS_PENDING = 'GET_REST_REVIEWS_COUNT_PENDING'
const GET_REST_REVIEWS_SUCCESS = 'GET_REST_REVIEWS_COUNT_SUCCESS'
const GET_REST_REVIEWS_FAILURE = 'GET_REST_REVIEWS_COUNT_FAILURE'

const THUMB_UP_PENDING = 'THUMB_UP_PENDING'
const THUMB_UP_SUCCESS = 'THUMB_UP_SUCCESS'
//const THUMB_UP_FAILURE = 'THUMB_UP_FAILURE'

const THUMB_DOWN_PENDING = 'THUMB_DOWN_PENDING'
const THUMB_DOWN_SUCCESS = 'THUMB_DOWN_SUCCESS'
//const THUMB_DOWN_FAILURE = 'THUMB_DOWN_FAILURE'

const SET_CLOSEST_CITY_FLAG = 'SET_CLOSEST_CITY_FLAG'
const SET_FIRST_RESTAURANT_LIST_FETCH = 'SET_FIRST_RESTAURANT_LIST_FETCH'
const CHANGE_RESTAURANT_SORT_OPT = 'CHANGE_RESTAURANT_SORT_OPT'
const SELECT_RESTAURANT = 'SELECT_RESTAURANT' 
const SELECT_CITY = 'SELECT_CITY'   
const CLEAR_REVIEWS = 'CLEAR_REVIEWS'

const CHANGE_CART = 'CHANGE_CART'
const SET_MAP_CENTER = 'SET_MAP_CENTER'
const HANDLE_STRIPE_TOKEN = 'HANDLE_STRIPE_TOKEN'
const CLEAR_CART = 'CLEAR_CART'

const LOGIN_PENDING = 'LOGIN_PENDING'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

const LOGIN_GUEST_SNS = 'LOGIN_GUEST_SNS'
const LOGOUT = 'LOGOUT'


export const logout = () => dispatch => {

    dispatch({
        type: LOGOUT
    })
}



export const login = (userID) => dispatch => {
    dispatch({
        type: LOGIN_GUEST_SNS,
        payload : userID
    }) 
} 


export const clearCart = () => dispatch => {

    dispatch({
        type: CLEAR_CART
    }) 
}

export const handleStripeToken = token => async dispatch => {
    return await service.handleStripeToken( token )
        .then( response => {
console.log('[handleStripeToken] A')           
            dispatch({
                type: HANDLE_STRIPE_TOKEN,
                payload: response.data
            }) 
        })

}

export const setMapCenter = ( lat, long ) => dispatch => {

    dispatch( {
        type: SET_MAP_CENTER,
        payload : {lat, long}
    })
}

export const changeCart = (payload) => dispatch => {

    dispatch( {
        type: CHANGE_CART,
        payload : payload
    })
}

export const selectCity = (cityID) => dispatch => {

    dispatch({
        type: SELECT_CITY,
        payload : cityID
    })
}

export const selectRestaurant = (restaurantID) => dispatch => {
console.log('NEW REST A', restaurantID)    
    dispatch({
        type : SELECT_RESTAURANT,
        payload : restaurantID
    })
}
 

/*
export const getPosition = () => dispatch => {

    dispatch( { type: GET_POSITION_PENDING } )

        const location ={
                latitude : 43.645608,
                longitude : -79.3963145
        }

        dispatch({
            type: GET_POSITION_SUCCESS,
            payload: location
        })

        getCityList()

}
 */

export const getPosition = () => dispatch => {
   
    dispatch( { type: GET_POSITION_PENDING } )

    return navigator.geolocation.getCurrentPosition( (position)=>{

        dispatch({
            type: GET_POSITION_SUCCESS,
            payload: position.coords
        }) 
        
        getCityList()
    } )

}
 
export const setClosestCity = (cityID) => dispatch => {

    dispatch({
        type: SET_CLOSEST_CITY_FLAG,
        payload: cityID
    })
}

export const setFirstRestaurantListFetch = (value) => dispatch => {

    dispatch({
        type: SET_FIRST_RESTAURANT_LIST_FETCH,
        payload: value
    })
}

export const changeRestaurantSortOpt = (option) => dispatch => {

    dispatch({
        type: CHANGE_RESTAURANT_SORT_OPT,
        payload: option
    })
}

export const getCityList = () => dispatch => {

    dispatch( { type: GET_CITYLIST_PENDING } )

    return service.getCityList()
            .then( response => {
             
                dispatch({
                    type: GET_CITYLIST_SUCCESS,
                    payload: response.data        
                }) 
            })
            .catch( error => {
                dispatch({
                    type: GET_CITYLIST_FAILURE,
                    payload: error
                })
            })
} 

export const thumbUp = ( menuID, restaurantID) => dispatch => {

        dispatch( { type: THUMB_UP_PENDING } )
           
        service.thumbUp(menuID)
                .then( response => {
            
                    dispatch({
                        type: THUMB_UP_SUCCESS
                    })                       
                })
                .then( ()=>{

                    // to show the updated number of thumbUP 
                    service.getMenuList( restaurantID )
                        .then( response => {
                            dispatch({
                                type: GET_MENULIST_SUCCESS,
                                payload: response.data
                            }) 
                        })
                        .catch( error => {
                            dispatch({
                                type: GET_MENULIST_FAILURE,
                                payload: error
                        })
                    })
                })
}

export const thumbDown = ( menuID, restaurantID)=> dispatch => {

    dispatch( { type: THUMB_DOWN_PENDING } )
           
    service.thumbDown(menuID)
            .then( response => {
        
                dispatch({
                    type: THUMB_DOWN_SUCCESS
                }) 
            })
            .then( ()=>{

                // to show the updated number of thumbDOWN
                service.getMenuList( restaurantID )
                    .then( response => {
                        dispatch({
                            type: GET_MENULIST_SUCCESS,
                            payload: response.data
                        }) 
                    })
                    .catch( error => {
                        dispatch({
                            type: GET_MENULIST_FAILURE,
                            payload: error
                    })
                })
            })
}
    
export const getMenuList = (restaurantID) => dispatch => {

    dispatch( { type: GET_MENULIST_PENDING } )

    return service.getMenuList( restaurantID )
            .then( response => {
                dispatch({
                    type: GET_MENULIST_SUCCESS,
                    payload: response.data
                }) 
            })
            .catch( error => {
                dispatch({
                    type: GET_MENULIST_FAILURE,
                    payload: error
                })
            })
} 

export const calcCurrentCity = (cityIndex) => dispatch => {

    dispatch( { type: GET_CITYLIST_SUCCESS, selectedCity : cityIndex})
}
        
export const getRestaurantList = (cityID) => dispatch => {


    dispatch( { type: GET_RESTAURANTLIST_PENDING } )

    return service.getRestaurantList(cityID)
            .then( response => {

                dispatch({
                    type: GET_RESTAURANTLIST_SUCCESS,
                    payload: response.data
                }) 
            })
            .catch( error => {
                dispatch({
                    type: GET_RESTAURANTLIST_FAILURE,
                    payload: error
                })
            })
}     

export const getRestaurantReviews = (restaurantID) => dispatch => {

    dispatch( {type: GET_REST_REVIEWS_PENDING })

    return service.getRestaurantReviews( restaurantID )
                .then( response => {

                    dispatch({
                        type: GET_REST_REVIEWS_SUCCESS,
                        payload: response.data
                    })
                })
                .catch( error => {

                    dispatch({
                        type: GET_REST_REVIEWS_FAILURE,
                        payload: error
                    })
                })
}

export const clearReviews = () => dispatch => {

    dispatch( {type: CLEAR_REVIEWS})
}

export const insertRestaurantReview = (review) => dispatch => {

    return service.postRestaurantReview(review)
}


export const updateRestaurantRate = (restaurantID, cityID) => dispatch => {

    return service.updateRestaurantRate( restaurantID, cityID )
}

export const updateThumbUpList = (menuID, list) => async dispatch => {

    return await service.updateThumbUpList(menuID, list)
}
export const updateThumbDownList = (menuID, list) => async dispatch => {

    return await service.updateThumbDownList(menuID, list)
}


export const localLogin = (idPwd) => async dispatch => {

// while login processing, the login, guest user, google oauth buttons NOT activiated 

    dispatch({ type: LOGIN_PENDING })




    const res = await service.localLogin(idPwd)
console.log('[reducer] result', res.data)    

    if( res.data === 'success' ) {
        // dispatch the logged user
        dispatch({
            type: LOGIN_SUCCESS,
            payload : idPwd.username
        })
        return res.data
    }
    else {
        dispatch({
            type: LOGIN_FAILURE
        })
        return res.data
    }

   
}




const initialState = {
    pendingPos : false,
    pendingCity : false,
    pendingRestaurantList : false,
    pendingMenu : false,
    error : false,
    firstRestaurantListFetch : false,
    lat : 0,
    long : 0,
    closestCityID : -1,
    selectedCityID : -1,
    cityList : [],
    restaurantList : [],
    gotCurrentCity : false,
    restaurantSortBy : 'rating',
    selectedRestaurantID : -1,

    menuList : [],

    reviews: [],

    menuCount : [],
    price :[],
    mapCenter : {},
    selectedCityObject : {},
    stripeResult : {},

    userID : null,
    pendingLogin : false
}


export default handleActions({


    [LOGOUT] : (state, action) => {
           
        return {
            ...state,
            pendingLogin : false,
            userID : null
        }
    },

    [LOGIN_GUEST_SNS] : (state, action) => {
console.log('reducer userID', action.payload)           
        return {
            ...state,
            pendingLogin : false,
            userID : action.payload
        }
    },

    [LOGIN_PENDING] : (state, action) => {
           
        return {
            ...state,
            pendingLogin : true
        }
    },

    [LOGIN_SUCCESS] : (state, action) => {
           
        return {
            ...state,
            pendingLogin : false,
            userID : action.payload
        }
    },

    [LOGIN_FAILURE] : (state, action) => {
           
        return {
            ...state,
            pendingLogin : false,
            userID : null
        }
    },

    [CLEAR_CART] : (state, action) => {
     
console.log('[CLEAR_CART')        
        return {
            ...state,
            menuCount : [],
            price :[],
        }
    },

    [HANDLE_STRIPE_TOKEN] : (state, action) => {

console.log('[STRIPE response]',action.payload)        
        return {
            ...state,
            stripeResult : action.payload
        }
    },

    [CHANGE_CART]: (state, action) => {
        return {
            ...state,
            menuCount : action.payload
        }
    },

    [SET_MAP_CENTER]:  (state, action) => {
      
        return {
            ...state,
            mapCenter : action.payload
        }
    },

    [CLEAR_REVIEWS]:   (state, action) => {
        return {
            ...state,
            reviews : [],
        }
    },
    [SELECT_CITY] :   (state, action) => {
        return {
            ...state,
            selectedCityID : action.payload
        }
    },
    [SELECT_RESTAURANT] :  (state, action) => {
console.log('NEW REST B', action.payload)        
        return {
            ...state,
            selectedRestaurantID : action.payload
        }
    },
    [GET_CITYLIST_PENDING] : (state, action) => {
        return {
            ...state,
            pendingCity : true,
            error : false
        }
    },
    [GET_CITYLIST_SUCCESS] : (state, action) => {  
        return {
            ...state,
            pendingCity : false,
            cityList : action.payload,
///////////////////////////////////////////////////
 //           userID : 'test_user1'
///////////////////////////////////////////////////            
        }
    },
    [GET_CITYLIST_FAILURE] : (state, action) => {
        return {
            ...state,
            pendingCity : false,
            error : true
        }
    },
    [GET_MENULIST_PENDING] : (state, action) => {
        return {
            ...state,
            pendingMenu : true,
            error : false
        }
    },
    [GET_MENULIST_SUCCESS] : (state, action) => {  

        let price = []
        let count = []
        for( let i = 0 ; i < action.payload.length ; i++ ) {
            count[i] = 0;
            price[i] = action.payload[i].price
        }

        return {
            ...state,
            pendingMenu : false,
            menuList : action.payload,
            menuCount : count,
            price : price
        }
    },
    [GET_MENULIST_FAILURE] : (state, action) => {
        return {
            ...state,
            pendingMenu : false,
            error : true
        }
    },
    [GET_POSITION_PENDING] : (state, action) => {
        return {
            ...state,
            pendingPos : true,
            error : false
        }
    },
    [GET_POSITION_SUCCESS] : (state, action) => {
        const loc = {lat: action.payload.latitude, long: action.payload.longitude}
        return {
            ...state,
            pendingPos : false,
            lat : action.payload.latitude,
            long : action.payload.longitude,
            mapCenter : loc
        }
    },
    [SET_CLOSEST_CITY_FLAG] :  (state, action) => {    
       
        return {
            ...state,
            gotCurrentCity : true,
            selectedCityID : action.payload,
            closestCityID : action.payload
        }
    },
    [GET_RESTAURANTLIST_PENDING] : (state, action) => {
        return {
            ...state,
            pendingRestaurantList : true,
            error : false
        }
    },
    [GET_RESTAURANTLIST_SUCCESS] : (state, action) => {


        // each element of restaurants array has a distance from my current position
        let data = action.payload
        let i
        for( i = 0 ; i < data.length ; i++ ) {

            const d2r = 3.1415 / 180.0
            const dlat = ( data[i].geolocation[0] - state.lat ) * d2r
            const dlong = ( data[i].geolocation[1] - state.long ) * d2r 
            const a = Math.pow( Math.sin( dlat / 2.0 ), 2 )
                    + Math.cos(state.lat*d2r) * Math.cos(data[i].geolocation[0]*d2r) * Math.pow( Math.sin(dlong/2.0), 2)

            const c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a))
            data[i].distance = 6367 * c
        }

        return {
            ...state,
            pendingRestaurantList : false,
            restaurantList : data,
            error : false
        }
    },
    [GET_RESTAURANTLIST_FAILURE] : (state, action) => {
        return {
            ...state,
            pendingRestaurantList : false,
            error : true
        }
    },
    [SET_FIRST_RESTAURANT_LIST_FETCH] : (state, action) => {
        return {
            ...state,
            firstRestaurantListFetch : action.payload
        }
    },
    [CHANGE_RESTAURANT_SORT_OPT] : (state, action) => {
        return {
            ...state,
            restaurantSortBy : action.payload
        }
    },
    [GET_REST_REVIEWS_PENDING] : (state, action) => {

        return {
            ...state,
            pendingMenu : true
        }
    },
    [GET_REST_REVIEWS_SUCCESS] : (state, action) => {


        let reviews = state.reviews.concat(action.payload )

        return {
            ...state,
            pendingMenu : false,
            reviews : reviews,
            error : false
        }
    },

}, initialState)