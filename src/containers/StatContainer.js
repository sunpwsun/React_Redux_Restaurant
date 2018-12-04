import React, {Component} from 'react'
import { Layout } from 'antd'
import './StatContainer.css'


import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {Query, ApolloProvider} from 'react-apollo'
//import gql from 'graphql-tag'



import StatHeader from '../components/StatHeader/StatHeader'
import RestaurantSelect from '../components/RestaurantStatSelect/RestSelect'
import OptionMenu from '../components/OptionMenu/OptionMenu'
import TodayChart from '../components/Charts/TodayChart'
import MonthChart from '../components/Charts/MonthChart'


const { Header, Sider, Content } = Layout


// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const link = createHttpLink({ uri: 'http://localhost:4000/graphql' })
const cache = new InMemoryCache()
const client = new ApolloClient({ cache, link })



class StatContainer extends Component {

    state = {
        id : '100100110008',
        option : 1
    }

    handleChangeRestaurant = (id) => {
      
        this.setState({
            id: id
        })
    }

    handleChangeOption = ({ item, key, selectedKeys }) => {

        this.setState({
            option : selectedKeys
        })
    }

    render() {

        let chart
        if( this.state.option == 1 ) {
            chart = <div><TodayChart id={this.state.id} /></div>
        }
        else if( this.state.option == 2 ) {
            chart = <div><MonthChart id={this.state.id} /></div>
        }
        else if( this.state.option == 3 ) {
            chart = <div>  </div>
        }
        else if( this.state.option == 4 ) {
            chart = <div>  </div>
        }
        else if( this.state.option == 5 ) {
            chart = <div>  </div>
        }
        else {
            chart =  <h2>ERROR</h2>
        }


        return( 
            <div>
                <StatHeader />
                <Layout>
                    <Layout>
                        <Sider width={270} style={{ background: '#fff' }} >
                            <RestaurantSelect changeRestaurant={this.handleChangeRestaurant} />
                            <OptionMenu changeOption={this.handleChangeOption} />
                        </Sider>
                        <Layout>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }} >
                                <ApolloProvider client={client}>
                                    {chart}
                                </ApolloProvider>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )

    }
}


export default StatContainer
