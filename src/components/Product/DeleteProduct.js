import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik';
import Link from './Link';
import Loading from "../Common/Loading"
import { NotificationContext, alertTypes } from '../../context/NotificationProvider';

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
      <NotificationContext.Consumer>
        {({ openAlert }) => (
          <main className="container">
            <div className="row justify-content-center">
              <div className="col">
                <h2 className="text-center display-4">Delete.</h2>
                <Mutation
                  mutation={PRODUCT_MUTATION}
                  refetchQueries={[{ query: GET_PRODUCTS }]}>
                  {(deleteProduct) => (
                    <div>
                      <Query query={GET_PRODUCTS}>
                        {({ loading, error, data }) => {
                          if (loading) return <Loading />
                          if (error) return <div>Error</div>

                          const linksToRender = data.products

                          return (
                            <div className="card-columns">
                              {linksToRender.map(product => (
                                <div key={product.name} className="card">
                                  <img className="card-img-top" src={product.image} alt="Card image cap" />
                                  <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                  </div>
                                  <div className="card-footer">
                                    <button name={product._id} className="btn btn-block btn-danger" onClick={(event) => {
                                      console.log(event)
                                      const name = event.currentTarget.name;
                                      deleteProduct({ variables: { id: name } })
                                      openAlert("Deleted Successfully", alertTypes.success)
                                    }}>Delete</button>
                                  </div>
                                </div>
                              )
                              )}
                            </div>
                          )
                        }}
                      </Query>
                    </div>
                  )}
                </Mutation>
              </div>
            </div>
          </main>
        )}
      </NotificationContext.Consumer>
    );
  }
}

export default DeleteProduct;
