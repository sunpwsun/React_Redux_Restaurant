import React, {Component} from 'react'
import { Form, Rate, Button, Input, message } from 'antd'
import './WriteRestaurantReview.css'
import * as restaurantAction from  '../../store/modules/restaurant'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import utils, { getTimeStamp } from '../../utils/utils'


class WriteRestaurantReview extends Component {

    state = {
        value: 3
    } 

    handleReset = () => {
        this.props.form.resetFields();
      }

    handleChangeRate = (e) => {
        this.setState({ value: e })
    }

    handleRefreshRestaurantList(cityList) {
        this.props.RestaurantActions.getRestaurantList(this.props.selectedCityID)
    }

    handleSubmit = (e) => {
    
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                console.log('Received values of form: ', values)

                message.config({
                    top: 400,
                    duration: 2
                  })
                message.success('Thanks you for your review!')



                const restaurantReview = 
                    { 
                        name: 'test_user',
                        userID : 'test_user@test.com',
                    }
                restaurantReview[ 'date' ] = getTimeStamp().substring(  0, 10 )
                restaurantReview[ 'time' ] = getTimeStamp().substring( 11, 16 )
                restaurantReview[ 'rating' ] = values.rate
                restaurantReview[ 'review' ] = values.Review
                restaurantReview[ 'restaurantID' ] = this.props.restaurantI


                // insert the rview into DB
                this.props.RestaurantActions.insertRestaurantReview( restaurantReview )
                    .then( ()=>{

                        // update avg rating for the restaurant
                        this.props.RestaurantActions.updateRestaurantRate(this.props.restaurantID, this.props.selectedCityID).then((res)=>{
                            this.handleRefreshRestaurantList(res.data)
                        })
                    
                        
                    })                   
                    .then( ()=> {
                            this.props.onClose()

                            // reset the review form
                            this.handleReset()
                            this.setState({ value: 3 })               

                    })
            
            }
            else {
                console.log('ERROR Received values of form: ', err)
            }
        })
    }

    render() {
        const { value } = this.state
        const FormItem = Form.Item
        const { TextArea } = Input
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }

        return (
           
                <Form onSubmit={this.handleSubmit}>

                    <FormItem
                        {...formItemLayout}
                        
                    >          
                        {
                            getFieldDecorator('rate', {
                                initialValue: 3,
                            })(
                            <Rate onChange={this.handleChangeRate}  />
                                
                        )}

                        { value && 
                            <span className='ant-rate-text'>{value} stars </span>
                        }
                            
                    </FormItem>

                    <FormItem  className='textArea'
                        {...formItemLayout}
                        
                    >
                    
                        {
                            getFieldDecorator('Review', {
                                rules: [
                                    { required: true },
                                ],
                                                    })(
                                <TextArea placeholder="Input your review" autosize={{ minRows: 5, maxRows: 5 }} />

                        )}

                    </FormItem>

                    <FormItem className='submit'
                        wrapperCol={{ span: 12, offset: 2 }}
                    >
                    <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                    <br/><br/>
                </Form> 
        )
    }
}

const WrappedWriteRestaurantReview = Form.create()(WriteRestaurantReview)

export default connect(
    (state) => ({
        selectedCityID : state.restaurant.selectedCityID
        
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( WrappedWriteRestaurantReview )
