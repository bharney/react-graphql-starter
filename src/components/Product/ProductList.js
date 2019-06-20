import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from "../Common/Loading"

const FEED_QUERY = gql`
  {
    products
    {
        _id
        description
  	    price
        image
        name
        type
        createdBy  
        {
          _id
        }
    }
  }
`
class ProductList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />
                    if (error) return <div>Error</div>

                    const linksToRender = data.products

                    return (
                        <div className="card-columns">
                            {linksToRender.map(link => <Link key={link.name} link={link} />)}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default ProductList