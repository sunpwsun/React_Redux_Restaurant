import React, {Component} from 'react'
import { List, Rate, Divider } from 'antd';

import * as restaurantAction from  '../../store/modules/restaurant'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'


class RestaurantReviews extends Component {

 
    render() {

        const listData = []
        const {reviews} = this.props
        
        // generates review list
        for (let i = 0; i < reviews.length; i++) {
            const date_time = reviews[i].date + reviews[i].time
            listData.push({               
                title: reviews[i].name,            
                description: reviews[i].rating,
                content: reviews[i].review,
                date : reviews[i].date,
                time : reviews[i].time,
                date_time : date_time           // only for sorting
            })
        }
        
        // sorts by data and time (descending)
        listData.sort(function(a, b) {
            return a.date_time > b.date_time ? -1 : a.date_time < b.date_time ? 1 : 0 
        })

        return(
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    console.log('page:',page)
                },
                pageSize: 4,
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}   
                    >
                        <List.Item.Meta                   
                            title={<a href={item.href}>{item.title}</a>}
                            description={<p><Rate disabled value={item.description} />
                                        <Divider type='vertical' /> {item.date} &nbsp;  {item.time} </p>}
                        />
                        {item.content}
                    </List.Item> 
                )}
          />
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
)( RestaurantReviews )
