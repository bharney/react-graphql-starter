import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik';
import LinkList from './LinkList';
const PRODUCT_MUTATION = gql`
mutation ProductMutation(
  $name: String!,
  $price: Float!,
  $image: String!,
  $type: ProductType!,
  $description: String!,
  $range: String!) {
  newProduct(input:{
    name: $name
    price: $price
    image: $image
    type: $type
    description: $description,
    range: $range
 })
  {
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

class Product extends Component {
  render() {
    return (
      <Mutation
        mutation={PRODUCT_MUTATION}
        refetchQueries={[{ query: GET_PRODUCTS }]}
      >
        {(newProduct, { loading, error }) => (
          <div>
            <Formik
              initialValues={{ name: '', price: '', image: '', type: '', description: '', range: '' }}
              onSubmit={({ name, price, image, type, description, range }, { resetForm }) => {
                console.log(name)
                newProduct({ variables: { name, price, image, type, description, range } })
                resetForm()
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
                      <Field name="name" value={values.name} type="text" />
                    </div>
                    <div>
                      <label>Price:</label>
                      <Field name="price" value={values.price} type="number" />
                    </div>
                    <div>
                      <label>Image:</label>
                      <Field name="image" value={values.image} type="text" />
                    </div>
                    <div>
                      <label>Type:</label>
                      <Field name="type" value={values.type} type="text" />
                    </div>
                    <div>
                      <label>Description:</label>
                      <Field name="description" value={values.description} type="text" />
                    </div>
                    <div>
                      <label>Range:</label>
                      <Field name="range" value={values.range} type="text" />
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                );
              }}
            </Formik>
            <LinkList />
          </div>
        )}
      </Mutation>
    );
  }
}

export default Product;
