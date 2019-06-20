import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik';
import ProductList from './ProductList';
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

class AddProduct extends Component {
  render() {
    return (
      <div className="col">
        <h2 className="text-center display-4">Add.</h2>
        <Mutation
          mutation={PRODUCT_MUTATION}
          refetchQueries={[{ query: GET_PRODUCTS }]}>
          {(newProduct) => (
            <div>
              <Formik
                initialValues={{ name: '', price: '', image: '', type: '', description: '', range: '' }}
                onSubmit={({ name, price, image, type, description, range }, { resetForm }) => {
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
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default AddProduct;
