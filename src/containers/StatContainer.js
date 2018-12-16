/// https://www.apollographql.com/docs/react/essentials/get-started.html 참조




import React, {Component} from 'react'
import { Layout, Divider } from 'antd'
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
import YearChart from '../components/Charts/YearChart'
import LikesChart from '../components/Charts/LikesChart'

const { Header, Sider, Content } = Layout
 

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint

//const link = createHttpLink({ uri: 'http://localhost:4000/graphql' })
const link = createHttpLink({ uri: 'http://18.219.68.114:4000/graphql' })


// https://www.apollographql.com/docs/react/advanced/caching.html#dataIdFromObject
// In my app,
// Query GET_DAILY_SALES on MonthChart.js returns array that duplicates first result to every node
// 0: {_id: {…}, totalAmount: 260.4, count: 15, __typename: "DailySales"}
// 1: {_id: {…}, totalAmount: 260.4, count: 15, __typename: "DailySales"}
// 2: {_id: {…}, totalAmount: 260.4, count: 15, __typename: "DailySales"}
// 3: {_id: {…}, totalAmount: 260.4, count: 15, __typename: "DailySales"}
// 4: ...
// It was because '_id' was used at the query.   __typename
// Solved by replacing 'addTypename' to false
const cache = new InMemoryCache( {addTypename:false} )

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
            chart = <div><YearChart id={this.state.id} /></div>
        }
        else if( this.state.option == 4 ) {
            chart = <div style={{fontSize:50, textAlign:'center', color:'blue'}}> Coming soon</div>
        }
        else if( this.state.option == 5 ) {
            chart = <div><LikesChart id={this.state.id} /></div>
        }
        else {
            chart =  <h2>ERROR</h2>
        }


        return( 
            <div>
                <StatHeader />
                <Layout>
                    <Layout>
                        <Sider className='side'  width={260} style={{ background: '#fff' }} >
                            <h3 className='sideLabel'>Choose Restaurant</h3>
                            <RestaurantSelect changeRestaurant={this.handleChangeRestaurant} />
                            <Divider />
                            <h3 className='sideLabel'>Query Option</h3>
                            <OptionMenu changeOption={this.handleChangeOption} />
                        </Sider>
                       
                        <Layout>
                            
                                <Content  style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }} >
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
