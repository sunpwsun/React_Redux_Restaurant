import React, {Component} from 'react'
import { List, message, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import './ScrollRestaurantList.css'
import RestaurantDetail from '../RestaurantDetail/RestaurantDetail'
import * as restaurantAction from  '../../store/modules/restaurant'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'


class ScrollRestaurantList extends Component {

    state = {
        data: [],
        loading: false,
        hasMore: true,
        init: false
    }
    
    
    handleInfiniteOnLoad = () => {
      
        let data = this.state.data
        this.setState({
            loading: true
        })

        if (data.length > 14) {
            message.warning('Infinite List loaded all')
            this.setState({
                hasMore: false,
                loading: false
            })
            return
        }
       
        data = this.props.data
        this.setState({
            data,
            loading: false
        })
    
    }

    handleChangeRestaurant = (e) => {

        this.props.RestaurantActions.selectRestaurant(e)
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        }) 
    }

    componentWillReceiveProps(nextProps) {

        let sortedData = nextProps.data

        // First, sort by rating  (by default)
        sortedData.sort(function(a, b) {
            return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0 
        })


        if( this.props !== nextProps ) {


            // when 'sort by' changed, sort again
            
            // if( nextProps.restaurantSortBy[0] === 'rating') {
            //     sortedData.sort(function(a, b) {
            //         return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0 
            //     })
            // }
            if( nextProps.restaurantSortBy[0] === 'name') {


                sortedData.sort(function(a, b) {
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0 
                })
                
            }
            else if( nextProps.restaurantSortBy[0] === 'distance') {


                sortedData.sort(function(a, b) {
                    return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0 
                })
            }

            this.setState({
                data: sortedData
            })

        }
      }
      

    render() {


        return (

            <div className="demo-infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource = {this.state.data}
                        
                        renderItem = {item => (
                        <List.Item key={item.id } >
                            <List.Item.Meta
                            
                            description={ <RestaurantDetail 
                                name = {item.name}
                                restaurantID = {item.restaurantID}
                                addr = {item.address[0]}
                                tel = {item.tel}
                                atmosphere = {item.atmosphere[0]}
                                reviewCount = {item.reviewCount}
                                rating = {item.rating}
                                distance = {item.distance}
                                history = {this.props.history}
                                onSelectRestaurant = {this.handleChangeRestaurant}
                            />}
                            
                        />
                            <div>

                                <span>
                                <Link to='/menu' ><img width='270' alt='restaurant_image' src={`../images/restaurants/${item.restaurantID}.jpeg` } 
                                                        onClick={()=>this.handleChangeRestaurant(item.restaurantID)} />
                                </Link>

                                </span>
                            </div>
                        </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                        <div className="demo-loading-container">
                            <Spin />
                        </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        )
    }
}



export default connect(
    (state) => ({
       
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( ScrollRestaurantList )
