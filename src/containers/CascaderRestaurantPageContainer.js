import React, {Component} from 'react'
import { Divider } from 'antd'
import 'antd/dist/antd.css'
import CascaderCityList from '../components/CascaderCityList/CascaderCityList'
import CascaderSortBy from '../components/CascaderSortBy/CascaderSortBy'



class CascaderRestaurantPageConatiner extends Component {

    render() {

        return (

            <div className='cascaderCityList'>
                    Your Current City(Location) is &nbsp;
                    <CascaderCityList />
                    
                    <Divider type="vertical" />
                    Sort by&nbsp;
                    <CascaderSortBy />
         
            </div>
        )
    }
}

export default CascaderRestaurantPageConatiner
