import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { defaultCoreCipherList } from 'constants';
import * as restaurantAction from  '../../store/modules/restaurant'
import * as service from '../../services/restaurants'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import './Payments.css'
import {Button} from 'antd'
import { getTimeStamp } from '../../utils/utils'



class Payments extends Component {


    // state = {
    //     amount : 0,
    //     currency : 'USD',
    //     description : '',
    //     restaurantID : 0,
    //     restaurantName : '',
    //     cart : [],
    //     totalItems : 0
    // }

    handleStripeToken = async (token, description, totalPayableStripe , restaurantName) => {
     
        const {stripeResult, selectedRestaurantID, cart, totalItems, onHide, onDrawClose } = this.props

        token[ 'amount' ] = totalPayableStripe
        token[ 'currency' ] = 'USD'
        token[ 'description' ] = description
console.log('[handleStripeToken] from Paymennt')
        const res = await this.props.RestaurantActions.handleStripeToken(token)
        

console.log('stripe result', this.props.stripeResult.outcome)

        if( this.props.stripeResult.outcome.type === 'authorized') {

            // shows 'success' message

console.log('SUCCESS')

            // adds the transcation into the order history
            const dateTime = getTimeStamp()
            const receipt = {
                paymentID : this.props.stripeResult.created,
                userID : 'test_user1',
                email : 'test_user1@test.com',
                restaurantID : selectedRestaurantID,
                restaurantName : restaurantName,
                cart : cart,
                totalItems : totalItems,
                totalPrice : totalPayableStripe,
                dateTime : dateTime
            }
            service.addPaymentHistory(receipt)


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
                    <tr><td className='table-header'>Menu</td><td className='table-header'>Qty</td><td className='table-header'>Price</td></tr>
                </table>
                    <hr />
                <table><col width="350" /><col width="70" /><col width="80" />
                    {order}
                </table>
                    <hr/>
                <table><col width="350" /><col width="70" /><col width="80" />
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
                </table>
                    <hr />
                    <table><col width="350" /><col width="70" /><col width="80" />
                    <tr><td>Total Payable</td><td></td><td>${totalPayable}</td></tr>
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
        restaurantList : state.restaurant.restaurantList 

    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( Payments )