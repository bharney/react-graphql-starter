import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik';
import { ApolloConsumer } from 'react-apollo'
import LinkList from './LinkList';
const POST_MUTATION = gql`
mutation PostMutation(
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

class Product extends Component {

  // handleSubmit = (client, { name, price, image, type, description }) => {
  //   client.mutate({
  //     mutation: { POST_MUTATION },
  //     variables: { name, price, image, type, description }

  //   })

  // }

  render() {
    return (
      <div>
        <ApolloConsumer>
          {(client) => (
            <Formik
              onSubmit={({ name, price, image, type, description }) => {
                console.log(name)
                client.mutate({
                  mutation: { POST_MUTATION },
                  variables: { name, price, image, type, description }
                })
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
                      <Field name="name" type="text" />
                    </div>
                    <div>
                      <label>Price:</label>
                      <Field name="price" type="number" />
                    </div>
                    <div>
                      <label>Image:</label>
                      <Field name="image" type="text" />
                    </div>
                    <div>
                      <label>Type:</label>
                      <Field name="type" type="text" />
                    </div>
                    <div>
                      <label>Description:</label>
                      <Field name="description" type="text" />
                      <button type="submit">Submit</button>
                    </div>
                    <div style={{ margin: '1rem 0' }}>
                      <h3 style={{ fontFamily: 'monospace' }} />
                      <pre>
                        <strong>props</strong> ={' '}
                        {JSON.stringify(props, null, 2)}
                      </pre>
                    </div>
                  </form>
                );
              }}
            </Formik>
          )}
        </ApolloConsumer>
        <LinkList />
      </div>
    );
  }
}

export default Product;
