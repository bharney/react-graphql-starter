import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    products
    {
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
class LinkList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching...</div>
                    if (error) return <div>Error</div>

                    const linksToRender = data.products

                    return (
                        <ul>
                            {linksToRender.map(link => <Link key={link.name} link={link} />)}
                        </ul>
                    )
                }}
            </Query>
        )
    }
}

export default LinkList