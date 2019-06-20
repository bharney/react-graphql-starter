import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik';
import ProductList from './ProductList';
import { withRouter } from 'react-router-dom';
import Loading from "../Common/Loading"
import { NotificationContext, alertTypes } from '../../context/NotificationProvider';

const PRODUCT_MUTATION = gql`
mutation ProductMutation(
  $id: ID!,
  $name: String!,
  $price: Float!,
  $image: String!,
  $description: String!,
  $range: String!) {
  updateProduct(id: $id,
  input:{
    name: $name
    price: $price
    image: $image
    description: $description
    range: $range
 })
  {
    _id
    name
    price
    image
    description
    createdBy{
      _id
    }
  }
}`
const GET_PRODUCT = gql`
query ProductQuery($id: ID!) {
    product(id: $id)
  {
    name
    price
    image
    description
    createdBy{
      _id
    }
  }
}`

class UpdateProduct extends Component {
  render() {
    const { id } = this.props.match.params
    console.log(id);
    debugger;
    return (
      <NotificationContext.Consumer>
        {({ openAlert }) => (
          <div className="col-12 col-md-12 col-lg-9">
            <h2 className="text-center display-4">Update.</h2>
            <Mutation
              mutation={PRODUCT_MUTATION}
              refetchQueries={[{
                query: GET_PRODUCT,
                variables: { id }
              }]}>
              {(updateProduct) => (
                <div>
                  <Query query={GET_PRODUCT} variables={{ id }}>
                    {({ loading, error, data }) => {
                      if (loading) return <Loading />
                      if (error) return <div>Error</div>
                      const { name, price, image, description, range } = data.product;
                      return (
                        <Formik
                          initialValues={{ name, price, image, description, range }}
                          onSubmit={({ name, price, image, description, range }) => {
                            updateProduct({ variables: { id, name, price, image, description, range } })
                            openAlert("Updated successfully!", alertTypes.success)
                            this.props.history.push('/update')
                          }}>
                          {props => {
                            const {
                              values,
                              touched,
                              errors,
                              dirty,
                              isSubmitting,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              handleReset,
                            } = props;
                            return (
                              <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                  <label>Name:</label>
                                  <Field className="form-control" name="name" value={values.name} required type="text" />
                                </div>
                                <div className="form-group">
                                  <label>Price:</label>
                                  <Field className="form-control" name="price" value={values.price} required type="number" />
                                </div>
                                <div className="form-group">
                                  <label>Image Url:</label>
                                  <Field className="form-control" name="image" value={values.image} required type="text" />
                                </div>
                                <div className="form-group">
                                  <label>Description:</label>
                                  <Field className="form-control" name="description" value={values.description} required type="text" />
                                </div>
                                <div className="form-group">
                                  <label>Range:</label>
                                  <Field className="form-control" name="range" value={values.range} required type="text" />
                                </div>
                                <button type="submit">Submit</button>
                              </form>
                            );
                          }}
                        </Formik>
                      )
                    }}
                  </Query>
                </div>
              )}
            </Mutation>
          </div>
        )}
      </NotificationContext.Consumer>
    );
  }
}

export default withRouter(UpdateProduct);
