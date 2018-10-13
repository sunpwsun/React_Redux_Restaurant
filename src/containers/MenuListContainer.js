import React, {Component} from 'react';
import Title from '../components/Title/Title'
import { List,Icon, Drawer, Table, Divider, Button } from 'antd'
import MenuDetail from '../components/MenuDetail/MenuDetail'
import CascaderMenuPageContainer from './CascaderMenuPageContainer'
import PaymentModal from '../components/PaymentModal/PaymentModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as restaurantActions from '../store/modules/restaurant'
import './MenuListContainer.css'


class MenuListContainer extends Component {


    state = {
        menu : [],
        drawerVisible: false,
        cart : [],

        creditCardFormVisible: false
    }

    showPaymentModal = () => {
        this.setState({
            creditCardFormVisible: true,
        })
    }
    
    hidePaymentModal = () => {
        this.setState({
            creditCardFormVisible: false,
        })
    }


    showDrawer = () => {
        this.setState({
            drawerVisible: true
        })
    }
  
    onDrawerClose = () => {
        this.setState({
            drawerVisible: false
        })
    }

    handleOnThumbUp = (menuID) => {

        this.props.RestaurantActions.thumbUp( menuID.$numberDecimal, this.props.selectedRestaurantID)
    }

    handleOnThumbDown = (menuID) => {

        this.props.RestaurantActions.thumbDown( menuID.$numberDecimal, this.props.selectedRestaurantID)     
    }


    // increments by 1 at the item count 
    handleIncreItem = (index) => {

        // copying array
        let cnt = this.props.menuCount.slice(0)      
        cnt[ index ] = cnt[ index ] + 1

        this.props.RestaurantActions.changeCart( cnt )
    }

    // decrements by 1 at the item count 
    handleDecreItem = ( index ) => {
        
        // copying array
        let cnt = this.props.menuCount.slice(0) 
        cnt[ index ] = cnt[ index ] - 1
        if( cnt[ index ] <= 0 )
            cnt[ index ] = 0

        this.props.RestaurantActions.changeCart( cnt )
    }

    handleOnAddToCart = (index) => {

        this.showDrawer()
        this.handleIncreItem(index)
    }

    componentDidMount() {
        this.props.RestaurantActions.getMenuList( this.props.selectedRestaurantID)
    }



    render() {

        // making menu list 
        const listData = []
        const menus = this.props.menuList
        for( let i = 0 ; i < menus.length ; i++ ) {
            listData.push({  
                menuID      : menus[i].menuID,             
                title       : menus[i].name,            
                description : menus[i].description,
                content     : menus[i].price,
                thumbUp     : menus[i].thumbUp,
                thumbDown   : menus[i].thumbDown,
                filename    : menus[i].filename,
                index : i
            })
        }

        // making table contents for cart
        let cart = []
        let j = 0
        let totalPrice = 0
        let totalItems = 0
        for( let i = 0 ; i < this.props.menuCount.length ; i++ ) {

            if( this.props.menuCount[i] > 0 ) {

                const _price = this.props.menuCount[i] * menus[i].price
                const price = _price.toFixed(1)
                totalPrice += Number(price)
                totalItems += Number(this.props.menuCount[i])
                cart.push({
                    key : j,
                    name : menus[i].name,
                    items : this.props.menuCount[i],
                    price : price,
                    index : i

                })
                j++
            }
        }
        totalPrice = totalPrice.toFixed(2)


        const { Column } = Table;

        return( 
            <div>
                <Title pathname={this.props.location.pathname} showDrawer={this.showDrawer} totalItems={totalItems} />
                <CascaderMenuPageContainer onChange={this.handleChangeRestaurant} />

                <div className='menuListContainer'>
                    <div className='menuListItem' style={{width:200}}></div>
                    <div className='menuListItem'>
                        { <List
                            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
                            dataSource = { listData }
                            renderItem = { item => (
                            <List.Item>
                                <MenuDetail title={item.title}
                                            menuID = {item.menuID}
                                            description = {item.content}
                                            content = {item.description}
                                            thumbUp  = {item.thumbUp}
                                            thumbDown  = {item.thumbDown}
                                            content = {item.description}
                                            onThumbUp  = {this.handleOnThumbUp}
                                            onThumbDown = {this.handleOnThumbDown}
                                            filename = {item.filename}
                                            index = {item.index}
                                            onAddCart = {this.handleOnAddToCart}
                                />
                            </List.Item>
                            )}
                            /> 
                        }
                    </div>
                    <div className='menuListItem'>&nbsp;</div>
                </div>  



                
                <Drawer
                    title="Cart"
                    placement="right"
                    width="550"
                    closable={true}
                    onClose={this.onDrawerClose}
                    visible={this.state.drawerVisible}
                >
                
                    <Table dataSource={cart}>
                        <Column
                            title="Menu Name"
                            dataIndex="name"
                            key="name" 
                            aligh="center"
                        />
                        <Column
                            title="Qty"
                            dataIndex="items"
                            key="items"
                            aligh="center"
                        />
                        <Column
                            title="Price"
                            dataIndex="price"
                            key="price"
                            aligh="center"
                        />
                        <Column
                            title="+ / -"
                            key="action"
                            aligh="center"
                            render={(key) => (
                                <span>
                                    <Icon className='iconBtn' type="plus-square" theme="outlined" onClick={()=>this.handleIncreItem(key.index)}/>
                                    <Divider type="vertical" />
                                    <Icon className='iconBtn' type="minus-square" theme="outlined" onClick={()=>this.handleDecreItem(key.index)}/>
                                </span>
                            )}
                            
                        />
                    </Table>

                <hr />
                <div className='total'>Total: &nbsp;&nbsp;${totalPrice} &nbsp;&nbsp;&nbsp; ({totalItems} items)</div>


                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >

                    <Button onClick={this.showPaymentModal} type="primary">Check out</Button>
                </div>
                </Drawer>



                <PaymentModal 
                    visible = {this.state.creditCardFormVisible}
                    onShow = {this.showPaymentModal}
                    onHide = {this.hidePaymentModal}
                    onDrawClose = {this.onDrawerClose}
                    cart = {cart}
                    totalPrice = {totalPrice}
                    totalItems = {totalItems}
                />
                    



 
            </div>
        )

    }
}
 
export default connect(
    (state) => ({
        menuList : state.restaurant.menuList,
        selectedRestaurantID : state.restaurant.selectedRestaurantID,
        price : state.restaurant.price,                 // how much per menu
        menuCount : state.restaurant.menuCount          // how many menus
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantActions, dispatch)
    })
)(MenuListContainer);