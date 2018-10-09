import React, { Component } from 'react'
import { Card, Icon, Drawer, Table, Divider, Button } from 'antd'

import './MenuDetail.css'



class MenuDetail extends Component {

    render() {
        
        const { Meta } = Card
        const { title, content, menuID, description, thumbUp, thumbDown, filename, onThumbUp, onThumbDown, onAddCart, index, } = this.props
        const price = '$ ' + description + ' '
        return(
            <div>
                <Card  className='menuDetail'
                    
                    style={{ width:330, height:420 }}
                    cover={<img className='menuImage' style={{height:220, width:328, borderRadius:8}} alt='menu image' src={`../images/menu/${filename}`} />}
                    actions={[ 
                            <p className='thumb' onClick={ ()=>onThumbUp(menuID)} ><Icon type="like" theme="twoTone" /> &nbsp; {thumbUp} </p>, 
                            <p className='thumb' onClick={ ()=>onThumbDown(menuID)} ><Icon type="dislike" theme="twoTone" />  &nbsp; {thumbDown} </p>, 
                            <p className='thumb' onClick={ ()=>onAddCart(index)} ><Icon type="plus-circle" theme="twoTone" />  &nbsp; Cart</p>
                    ]}
                >
                <Meta
                    title={title}
                    description={price}
                />
                </Card>

            </div>
               
        )
    }

}


  export default MenuDetail
