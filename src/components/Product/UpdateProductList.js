import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom';
import Link from './Link';
import Loading from "../Common/Loading"

const GET_PRODUCTS = gql`
query {
  products 
  {
    _id
    name
    price
    image
    type
    description
    createdBy{
      _id
    }
  }
}`

class UpdateProductList extends Component {
  render() {
    return (
      <div className="col">
        <h2 className="text-center display-4">Update.</h2>
        <Query query={GET_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <div>Error</div>

            const linksToRender = data.products

            return (
              <ul>
                {linksToRender.map(product => (
                  <div>
                    <Link key={product.name} link={product} />
                    <button name={product._id} onClick={(event) => {
                      debugger;
                      console.log(event)
                      const name = event.currentTarget.name;
                      this.props.history.push({
                        pathname: '/update/' + product._id
                      })
                    }}>Update</button>
                  </div>
                )
                )}
              </ul>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(UpdateProductList);
