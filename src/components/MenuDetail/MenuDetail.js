import React, { Component } from 'react'
import { Card, Icon, Badge, Tooltip } from 'antd'

import './MenuDetail.css'


 
class MenuDetail extends Component {

    render() {
       
        const { Meta } = Card
        const { title, menuID, description, content, thumbUp, thumbDown, filename, onThumbUp, onThumbDown, onAddCart, index, myThumb} = this.props
        const price = '$ ' + description + ' '
        return(
            <div>
                <Card  className='menuDetail'
                    
                    style={{ width:330, height:404 }}
                    cover={<Tooltip placement="bottomLeft" title={content}><img className='menuImage' style={{height:220, width:328, borderRadius:8}} alt='menu' src={`../images/menu/${filename}`} /></Tooltip>}
                    actions={[ 
                            <div className='thumb' onClick={ ()=>onThumbUp(menuID)} >
                                {   myThumb === 'UP' ?

                                    (<div> 
                                    <Badge dot><Icon className='selectedThumb' type="like" theme="filled" /></Badge>&nbsp;{thumbUp}</div>)
                                    :
                                    (<div><Icon type="like" theme="twoTone" />&nbsp;{thumbUp}</div>)
                                }
                            </div>, 
                            <div className='thumb' onClick={ ()=>onThumbDown(menuID)} >
                                {   myThumb === 'DOWN' ?
                                    (<div> <Badge dot><Icon  className='selectedThumb' type="dislike" theme="filled" /></Badge>&nbsp;{thumbDown}</div>)
                                    :
                                    (<div><Icon type="dislike" theme="twoTone" />&nbsp;{thumbDown}</div>)
                                }
                                
                            </div>, 

                            <div className='thumb' onClick={ ()=>onAddCart(index)} ><Icon type="plus-circle" theme="twoTone" />  &nbsp; Cart</div>
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
