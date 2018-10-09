import React, {Component} from 'react'
import {Link} from 'react-router-dom'



class Test1 extends Component {

    render() {
        



        return( 
            <div>
                <h1>Test1 Page</h1>
                <Link to='/menu'>Go to Page2</Link>
            </div>
        )

    }
}


export default Test1
