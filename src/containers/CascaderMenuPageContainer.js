import React, {Component} from 'react'
import CascaderRestaurantList from '../components/CascaderRestaurantList/CascaderRestaurantList'
import {Divider} from 'antd'
import {Link} from 'react-router-dom'


class CascaderMenuPageContainer extends Component {

    render() {

        return(
            <div className='cascaderCityList'>
                <Link to='/restaurant' >Change Location</Link> &nbsp;                    
                    <Divider type="vertical" />
                    &nbsp; Restaurant :&nbsp;
                <CascaderRestaurantList />

            </div>
        )
    }
}


export default CascaderMenuPageContainer