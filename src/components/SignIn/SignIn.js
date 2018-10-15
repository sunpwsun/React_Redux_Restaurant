import React, {Component} from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './SignIn.css'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import * as restaurantAction from  '../../store/modules/restaurant'
import Title from '../Title/Title'

class SignInForm extends Component {

    // clicked login button 
    // while login processing, the login, guest user, google oauth buttons NOT activiated 
    handleSubmit = (e) => {

        e.preventDefault()

        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.props.RestaurantActions.localLogin( values ).then( (res)=>{
                    console.log('[LOG IN FORM - res - ', res, 'userID-',this.props.userID)

                    if( res === 'success' ) {
                        this.props.history.push('/restaurant')
                    }
                    else {


                    }
                })
            


            }
        })
    }

    // login as a guest
    handleGuestUser = async (e) => {

        e.preventDefault()

        // guest id : Guest1 ~ Guest9
        const num = Math.floor(Math.random() * 9) + 1
        const userID = 'Guest' + num

console.log('[A Guest user]', userID, this.props.userID)

        this.props.RestaurantActions.loginGuest(userID)
console.log('[B Guest user]', userID, this.props.userID)
        this.props.history.push('/restaurant')

    }



    render() {
        const FormItem = Form.Item
        const { getFieldDecorator } = this.props.form

        return (
            <div>
                <Title />
                <div className='login-form'> 

                 

                    <Form onSubmit={this.handleSubmit} >
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                                <Input disabled='true' size='large'  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input  disabled='true' size='large'  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>

                            <Button  disabled='true' size='large'  type="primary" htmlType="submit" className="login-form-button">
                            <Icon type="login" theme="outlined" /> Log in
                            </Button>
            
                        </FormItem>
                        or <a href="/signup">Register now!</a>
                        <hr />
                    </Form>

                    <div>
                        <Button className="login-form-button" type="primary"  size='large' block  onClick={this.handleGuestUser}>
                            <Icon type="eye" theme="outlined" />Guest User</Button>
                    
                        <Button  disabled='true' className="login-form-button" size='large' block><Icon type="google" theme="outlined" />Sign In with Google</Button>
                        
                        
                    </div>


                </div>   
            </div>
        )
    }
}

const WrappedSignInForm = Form.create()(SignInForm)

export default connect(
    (state) => ({
        selectedCityID : state.restaurant.selectedCityID,
        userID : state.restaurant.userID
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( WrappedSignInForm )

// 아래 참조
// const WrappedWriteRestaurantReview = Form.create()(WriteRestaurantReview)

// export default connect(
//     (state) => ({
//         selectedCityID : state.restaurant.selectedCityID
        
//     }),
//     (dispatch) => ({
//         RestaurantActions: bindActionCreators(restaurantAction, dispatch)
//     })
// )( WrappedWriteRestaurantReview )
