import axios from 'axios'

//const url = 'http://18.219.68.114:3310'       // my EC2
const url = 'http://localhost:3310'             // local


// fetch all rests from cityID
export const getRestaurantList = async (cityID) => {

    return await axios.get(url +'/api/restaurants/' + cityID)
}

// GET specified restaurant information
export function getMenuList(restaurantId) {


    return axios.get(url + '/api/menu/' + restaurantId)
   
}

export const getCityList = () => {
  
    return axios.get(url + '/api/cities')
}



export const getRestaurantReviewsCount = restaurantId => {

    return axios.get(url + '/api/restaurant_reviews/count/' + restaurantId)
}


export function getRestaurantReviewsRange( restaurantId, skip, limit ) {
         
    return axios.get(url + '/api/restaurant_reviews/range/' + restaurantId + '/' + skip + '/' + limit )
}

export function getRestaurantReviews( restaurantId ) {
    
    return axios.get(url + '/api/restaurant_reviews/' + restaurantId )
}

export function postRestaurantReview( review ) {
    return axios.post(url + '/api/restaurant/review/', review )
                .then( response => { console.log( '** [axios] 리뷰 등록 성공 : ', response) } )
                .catch( response => { console.log(response) } )
}

export const updateRestaurantReview = newRating => {
    axios.put(url + '/api/restaurant/rating/', newRating)
}

export const getRestaurantRatingSum = restaurantID => {
    return axios.get(url + '/api/restaurant/sum_rate/' + restaurantID)
}

export const updateRestaurantRate =  async ( restaurantID, cityID ) => {
    
    let count
    let sum
    const cnt = await getRestaurantReviewsCount( restaurantID )
    count = cnt.data                  

    const rr = await getRestaurantRatingSum(restaurantID)
    sum =rr.data[0].total_rating
    const avg = sum/count               
    const newRating = { 
        restaurantID: Number(restaurantID),
        rating : Number(avg),
        reviewCount : Number(count)
    }

    const ret = await updateRestaurantReview( newRating )
    let cityList = await getRestaurantList(cityID) 

    return cityList
}

export const thumbUp = async (menuID) => {
    console.log('[thumbUp] - MenuID ' ,menuID)
    const id = Number(menuID)
    return await axios.put(url + '/api/menu/thumbUp', { menuID : id} )
}

export const thumbDown = async (menuID) => {
    console.log('[thumbDown] - MenuID ' ,menuID)
    const id = Number(menuID)
    return await axios.put(url + '/api/menu/thumbDown', { menuID : id} )
}

export const handleStripeToken = async (token) => {
console.log( '[service] - /api/stripe', token)
    return await axios.post(url + '/api/stripe', token)
}




export const addPaymentHistory = async (receipt) => {

    return await axios.post( url + '/api/receipt', receipt )
                        .then( response => { console.log( '** [axios] payment add success: ', response) } )
                        .catch( response => { console.log('** [axios] payment add failed: ',response) } )
}
