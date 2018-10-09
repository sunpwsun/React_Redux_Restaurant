import React, {Component} from 'react'
import { Modal, Icon, Rate, Divider } from 'antd'
import './RestaurantDetail.css'
import RestaurantReviews from '../RestaurantReviews/RestaurantReviews'
import WriteRestaurantReview from '../WriteRestaurantReview/WriteRestaurantReview'
import {Link} from 'react-router-dom'
import * as restaurantAction from  '../../store/modules/restaurant'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'



class RestaurantDetail extends Component {

    state = { 
        viewReviewsVisible: false,
        writeReviewVisible: false
    }

    showViewReviews = (restaurantID) => {
        this.setState({
            viewReviewsVisible: true,
        })

        this.props.RestaurantActions.getRestaurantReviews(restaurantID, this.state.reviewsSkip, 10 )
    }

    showWriteReview = (restaurantID) => {
        this.setState({
            writeReviewVisible: true,
        })
    }
  
    handleViewOk = (e) => {

        this.setState({
            viewReviewsVisible: false,
        })
    }
  
    handleWriteOk = (e) => {

        this.setState({
            writeReviewVisible: false,
        })
    }


    handleViewCancel = (e) => {

        // Do not show the modal
        this.setState({
            viewReviewsVisible: false,
        })

        // Clear the reviews
        this.props.RestaurantActions.clearReviews()
    }
  
    handleWriteCancel = (e) => {

        // Do not show the modal
        this.setState({
            writeReviewVisible: false,
        })
    }

    render() {

        const { restaurantID, name, rating, addr, tel, atmosphere, reviewCount, distance, onSelectRestaurant } = this.props
        const dis = distance.toFixed(2) 
        const fixedRating = rating.toFixed(1)

        return (
            <div>
                <Link to ='/menu'><h1 className='restaurantName' onClick={()=>onSelectRestaurant(restaurantID)}>{name}  </h1></Link>
                <hr />
                <Icon type="car" theme="outlined" />  &nbsp; {dis}Km <br />
                <Icon type="heart" theme="outlined" />  &nbsp; {atmosphere}<br />
                <Icon type="home" theme="outlined" /> &nbsp; {addr}<br />
                <Icon type="phone" theme="outlined" />  &nbsp; {tel}<br />
                <Icon type="message" theme="outlined" /> &nbsp; <a onClick={()=>this.showViewReviews(restaurantID)}>{reviewCount} reviews</a> 
                    &nbsp; <Divider type="vertical" />&nbsp;
                    <a onClick={()=>{this.showWriteReview(restaurantID)}}><Icon type="edit" theme="outlined" />&nbsp;Write review</a>
                <br /><br />
                <Rate allowHalf disabled value={fixedRating} /> &nbsp;
                                        {fixedRating && <span className="ant-rate-text">{fixedRating}</span>}

                <Modal
                    title='View Reviews'
                    visible={this.state.viewReviewsVisible}
                    onOk={this.handleViewOk}
                    onCancel={this.handleViewCancel}
                    footer={[]}
                    >
                    <RestaurantReviews />
                </Modal>

                <Modal
                    title='Write Review'
                    visible={this.state.writeReviewVisible}
                    onOk={this.handleWriteOk}
                    onCancel={this.handleWriteCancel}
                    footer={[]}
                    >
                    <WriteRestaurantReview restaurantID={restaurantID} onClose={this.handleWriteOk}/>

                </Modal>
 
            </div>
        )
    }
}

export default connect(
    (state) => ({
        reviews : state.restaurant.reviews
        
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( RestaurantDetail )
