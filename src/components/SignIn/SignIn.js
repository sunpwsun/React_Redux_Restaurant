import React, {Component} from 'react'
import { Form, Icon, Input, Button, Modal, Popover } from 'antd'
import './SignIn.css'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import * as restaurantAction from  '../../store/modules/restaurant'
import Title from '../Title/Title'
import { GoogleLogin } from 'react-google-login'
import {GoogleLoginClientID} from '../../key'


const popover = (
    <div>
        <p>This shows sales statistics of each restaurant</p>
    </div>
)


class SignInForm extends Component {


    state = {
        google : false,
    }


    successMsg() {
        Modal.success({
            title: 'Welcome',

            content: (
                <div>
                <p>Hey '{this.props.userID}', Enjoy!!</p>
                </div>
            ),

        })
    }

    errorMsg() {
        Modal.error({
            title: 'Error',
            content: 'Please check your email or password',
        })
    }




    // clicked login button 
    // while login processing, the login, guest user, google oauth buttons NOT activiated 
    handleSubmit = (e) => {

        e.preventDefault()

        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.props.RestaurantActions.localLogin( values ).then( (res)=>{
//console.log('[LOG IN FORM - res - ', res, 'userID-',this.props.userID)

                    if( res === 'success' ) {
                        this.successMsg()
                        this.props.history.push('/restaurant')
                    }
                    else {
                        this.errorMsg()

                    }
                })
            


            }
        })
    }

    // login with google ID
    handleGoogleLogin = async (e) => {

        e.preventDefault()

        this.setState({google:true})
    }


    success = (e) => {

        const userID = e.profileObj.email
//console.log( '[Google Logn]', userID)        
        this.props.RestaurantActions.login(userID)

        //move to restaurant 
        this.props.history.push('/restaurant')
        
    }

    failure = (e) => {
        console.log( 'FAILURE', e)
    }

    // login as a guest
    handleGuestUser = async (e) => {

        e.preventDefault()

        // guest id : Guest1 ~ Guest9
        const num = Math.floor(Math.random() * 9) + 1
        const userID = 'Guest' + num

        this.props.RestaurantActions.login(userID)

        // move to restaurant 
        this.props.history.push('/restaurant')

    }

    render() {
        const FormItem = Form.Item
        const { getFieldDecorator } = this.props.form

        return (
            <div>
                <Title />
                    <div className='login-form'> 
                        <Popover placement="topLeft" content={popover}>
                            <a href='/stat'><div className='statBtn'><span><Icon type="bar-chart" size='large'/> &nbsp; Sales Statistics</span></div></a>
                        </Popover>
                        <Form onSubmit={this.handleSubmit} >
                            
                            <hr className='border'/>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your email!' }],
                                })(
                                    <Input  size='large'  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input   size='large'  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>

                                <Button  size='large'  type="primary" htmlType="submit" className="login-form-button">
                                <Icon type="login" theme="outlined" /> Log in
                                </Button>
                
                            </FormItem>
                            or <a href="/signup">Register now!</a>
                            <hr />
                        </Form>

                        
                            <Button 
                                className="login-form-button btnGap" 
                                 
                                size='large' 
                                block  
                                onClick={this.handleGuestUser}
                                >
                                <Icon type="eye" theme="outlined" />Guest User
                            </Button>
                            <GoogleLogin
                                clientId={GoogleLoginClientID}
                                className="ant-btn login-form-button ant-btn-lg" 
                                onSuccess={this.success}
                                onFailure={this.failure}
                                >
                                <Icon type="google" theme="outlined" /> &nbsp;Sign In with Google
                            </GoogleLogin>

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
