import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik';
import ProductList from './ProductList';
import { withRouter } from 'react-router-dom';

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
                if (loading) return <div>Fetching...</div>
                if (error) return <div>Error</div>
                const { name, price, image, description, range } = data.product;
                return (
                  <Formik
                    initialValues={{ name, price, image, description, range }}
                    onSubmit={({ name, price, image, description, range }) => {
                      updateProduct({ variables: { id, name, price, image, description, range } })
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
                          <div>
                            <label>Name:</label>
                            <Field name="name" value={values.name} required type="text" />
                          </div>
                          <div>
                            <label>Price:</label>
                            <Field name="price" value={values.price} required type="number" />
                          </div>
                          <div>
                            <label>Image:</label>
                            <Field name="image" value={values.image} required type="text" />
                          </div>
                          <div>
                            <label>Description:</label>
                            <Field name="description" value={values.description} required type="text" />
                          </div>
                          <div>
                            <label>Range:</label>
                            <Field name="range" value={values.range} required type="text" />
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
    );
  }
}

export default withRouter(UpdateProduct);
