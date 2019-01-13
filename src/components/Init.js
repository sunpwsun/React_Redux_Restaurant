import React, {Component} from 'react'
import { Form, Icon, Input, Button, Modal, Popover } from 'antd'
import './Init.css'
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


class Init extends Component {


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

        return (
            <div>
                <Title />

                <div className='initGrid'>

                    <div></div>
                    <div class='innerGrid'>
                        <div className='introHeader' >Order Menu</div>
                        <div>
                            <img className='introImg' width='100%' alt='restaurant_image' src={`../images/intro/order.png` } />
                      
                            <div className='introMain'>
                                <li>Try to order a food you want at 80+ registered restaurants</li>
                                <li>(All the restaurant and menu names are fake for demo)</li>
                                <li>React/ Redux/ MongoDB/ Google Maps/ Google OAuth</li>
                                <li>Transactions by Stripe payment</li>
                            </div>
                        </div>
                        

                        <div className='loginBtnGrid'>
                            <div className='intorBtn' onClick={this.handleGuestUser}>
                                <span><Icon type='login' size='large'/> &nbsp; Guest Mode</span>
                            </div>
                            <div >
                                <GoogleLogin
                                    clientId={GoogleLoginClientID}
                                    className='intorBtn'
                                    onSuccess={this.success}
                                    onFailure={this.failure}
                                    >
                                    <Icon type="google" theme="outlined" /> &nbsp;Google User
                                </GoogleLogin>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div className='divider'></div>
                    <div class='innerGrid'>
                        <div className='introHeader' >Sales Records</div>
                        <div>
                            <img className='introImg' width='100%' alt='restaurant_image' src={`../images/intro/stat.png` } />
                        
                        
                                                        
                            <div className='introMain'>
                                <li>Analyzes the daily/weekly/monthly sales figures</li>
                                <li>Shows data as graphical charts and tables</li>
                                <li>GraphQL / Chart.js</li>
                            
                            </div>
                        
                        </div>
 
                        <div className='statBtnGrid'>
                            <div></div>
                            <div className='intorBtn'>
                                <a href='/stat' style={{color:'white'}}><span><Icon type='bar-chart' size='large'/> &nbsp; Sales Statistics</span></a>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div></div>
                </div>



            </div>
        )
    }
}

export default connect(
    (state) => ({
        selectedCityID : state.restaurant.selectedCityID,
        userID : state.restaurant.userID
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( Init )

