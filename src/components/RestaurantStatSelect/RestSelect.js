import React, {Component} from 'react'
import { Select } from 'antd'

class RestSelect extends Component {

    


    render() {


        const { Option, OptGroup } = Select

        return(
            <Select
                defaultValue="100100110008"
                style={{ width: 255 }}
                onChange={this.props.changeRestaurant}
                >
                <OptGroup label="Toronto">
                    <Option value="100100110008">Peter Pan Bistro</Option>
                    <Option value="100100110003">El Patio</Option>
                </OptGroup>
                <OptGroup label="Missisauga">
                    <Option value="100100210009">Breakfast ING</Option>
                </OptGroup>
            </Select>
        )
    }
}

export default RestSelect