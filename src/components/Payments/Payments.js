import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import * as restaurantAction from  '../../store/modules/restaurant'
import * as service from '../../services/restaurants'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import './Payments.css'
import {Button} from 'antd'
import { getTimeStamp } from '../../utils/utils'
import {message} from 'antd'



class Payments extends Component {


    showSuccessMessage = () => {
        message.config({ top: 300 })
        message.info('Thank you for your payment.');
    }

    handleStripeToken = async (token, description, totalPayableStripe , restaurantName) => {
     
        const { selectedRestaurantID, cart, totalItems} = this.props

        token[ 'amount' ] = totalPayableStripe
        token[ 'currency' ] = 'USD'
        token[ 'description' ] = description
console.log('[handleStripeToken] from Paymennt')
        await this.props.RestaurantActions.handleStripeToken(token)
        

console.log('stripe result', this.props.stripeResult.outcome)

        if( this.props.stripeResult.outcome.type === 'authorized') {


            // adds the transcation into the order history
            const dateTime = getTimeStamp()
            const receipt = {
                paymentID : this.props.stripeResult.created,
                // userID : 'test_user1',
                // email : 'test_user1@test.com',
                userID : this.props.userID,
                email : this.props.userID,
                restaurantID : selectedRestaurantID,
                restaurantName : restaurantName,
                cart : cart,
                totalItems : totalItems,
                totalPrice : totalPayableStripe,
                dateTime : dateTime
            }
            service.addPaymentHistory(receipt)



            // shows 'success' message
            this.showSuccessMessage()
console.log('SUCCESS')

            // clear cart
            this.props.RestaurantActions.clearCart()

            // close Check out modal
            this.props.onPaymentModalHide()

            // close Drawer
            this.props.onDrawClose()
        }
        else {

            // show 'failed' message
console.log('FAILED')

        }
    }

    render() {

        let restaurnatName
        const { restaurantList, selectedRestaurantID, cart, totalItems, totalPrice } = this.props

        for( let i = 0 ; i < restaurantList.length ; i++ ) {
            if( restaurantList[i].restaurantID === selectedRestaurantID) {
                restaurnatName = restaurantList[i].name
                break
            }
        }

        let order = []
        for( let i = 0 ; i < cart.length ; i++ ) {
            const num = i + 1
            order.push( <tr><td className='table-data-name'>{num}. {cart[i].name}</td> <td className='table-data-qty'>{cart[i].items}</td><td className='table-data-price'>${cart[i].price}</td></tr> )
        }
        
        const totalPayableStripe = (totalPrice * 113).toFixed(0)
        const totalPayable = (totalPayableStripe / 100).toFixed(2)
        const hst = (totalPrice * 0.13).toFixed(2)
        const description = '$' + totalPayable + ' for ' + totalItems + ' items'



        return (

            <StripeCheckout
                name = 'Restaurant United'
                description = {description}
                amount = {totalPayableStripe}
                token={token => this.handleStripeToken(token, description, totalPayableStripe, restaurnatName)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >

                <h1>{restaurnatName}</h1>
                    <br/>
                <table><col width="350" /><col width="70" /><col width="80" />
                    <thead>
                        <tr>
                            <th className='table-header'>Menu</th>
                            <th className='table-header'>Qty</th>
                            <th className='table-header'>Price</th>
                        </tr>
                    </thead>
                </table>
                    <hr />
                <table><col width="350" /><col width="70" /><col width="80" />
                    <tbody>
                        {order}
                    </tbody>    
                </table>
                    <hr/>
                <table><col width="350" /><col width="70" /><col width="80" />
                    <tbody>
                        <tr >
                            <td className='table-data-name'>Total</td>
                            <td></td>
                            <td className='table-data-price'>${totalPrice}</td>
                        </tr>
                        <tr>
                            <td className='table-data-name'>HST(13%)</td>
                            <td></td>
                            <td className='table-data-price'>${hst}</td>
                        </tr>
                    </tbody>    
                </table>
                    <hr />
                <table><col width="350" /><col width="70" /><col width="80" />
                    <tbody>
                        <tr><td>Total Payable</td><td></td><td>${totalPayable}</td></tr>
                    </tbody>
                </table>
                    <br/>
                    <br/>
                    <br/>
                <Button type="primary">
                    Credit Card
                </Button>
            </StripeCheckout>
        )
    }
}


// export default Payments

export default connect(
    (state) => ({
        stripeResult : state.restaurant.stripeResult,
        menuList : state.restaurant.menuList,
        menuCount : state.restaurant.menuCount,
        price : state.restaurant.price,
        selectedRestaurantID : state.restaurant.selectedRestaurantID,
        restaurantList : state.restaurant.restaurantList ,
        userID : state.restaurant.userID

    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( Payments )