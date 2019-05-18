import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik';
import Link from './Link';
const PRODUCT_MUTATION = gql`
mutation ProductMutation($id: ID!) {
    removeProduct(id: $id)
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

class DeleteProduct extends Component {
  render() {
    return (
      <Mutation
        mutation={PRODUCT_MUTATION}
        refetchQueries={[{ query: GET_PRODUCTS }]}>
        {(deleteProduct) => (
          <div>
            <Query query={GET_PRODUCTS}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching...</div>
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
                          deleteProduct({ variables: { id: name } })
                        }}>Delete</button>
                      </div>
                    )
                    )}
                  </ul>
                )
              }}
            </Query>
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeleteProduct;
