import React, {Component} from 'react'
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;

class OptionMenu extends Component {

    render() {

        return(
            <div style={{ width: 256 }}>
                <Menu 
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%' , borderRight: 0 }}
                    mode="inline"
                    theme="light"
                    onSelect={this.props.changeOption}
                    >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Today (Daily)</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="line-chart" />
                        <span>Last 30 days</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="line-chart" />
                        <span>Last 12 months</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="area-chart" />
                        <span>Customizing</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="bar-chart" />
                        <span>Likes/Dislikes</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default OptionMenu