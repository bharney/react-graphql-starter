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
  $range: String!,
  $liquidCooled: Boolean!,
  $bikeType: BikeType!) {
  updateProduct(id: $id,
  input:{
    name: $name
    price: $price
    image: $image
    description: $description
    range: $range
    liquidCooled: $liquidCooled
    bikeType: $bikeType
 })
  {
    _id
    name
    price
    image
    description
    type,
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
    type,
    createdBy{
      _id
    }
  }
}`

class UpdateProduct extends Component {
  render() {
    const { id } = this.props.match.params
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
                      const { name, price, type, image, description, range, bikeType, liquidCooled } = data.product;
                      return (
                        <Formik
                          initialValues={{ name, price, type, image, description, range, bikeType, liquidCooled }}
                          onSubmit={({ name, price, type, image, description, range, bikeType, liquidCooled }) => {
                            updateProduct({ variables: { id, name, price, type, image, description, range, bikeType, liquidCooled } })
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
                                  <label>Type:</label>
                                  <select
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ display: 'block' }}
                                  >
                                    <option value="" label="Select Product Type" />
                                    <option value="DRONE" label="Drone" />
                                    <option value="GAMING_PC" label="Gaming PC" />
                                    <option value="BIKE" label="Bike" />
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Image Url:</label>
                                  <Field className="form-control" name="image" value={values.image} required type="text" />
                                </div>
                                <div className="form-group">
                                  <label>Description:</label>
                                  <Field className="form-control" name="description" value={values.description} required type="text" />
                                </div>
                                {values.type == "DRONE" && <div className="form-group">
                                  <label>Range:</label>
                                  <Field className="form-control" name="range" value={values.range} required type="text" />
                                </div>}
                                {values.type == "GAMING_PC" && <div className="form-group">
                                  <div className="form-check">
                                    <Field className="form-check-input" id="liquidCooled" name="liquidCooled" value={values.liquidCooled} required type="checkbox" />
                                    <label className="form-check-label" htmlFor="liquidCooled">Liquid Cooled</label>
                                  </div>
                                </div>}
                                {values.type == "BIKE" && <div className="form-group">
                                  <label>Bike Type:</label>
                                  <select
                                    name="bikeType"
                                    value={values.bikeType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ display: 'block' }}
                                  >
                                    <option value="" label="Select Bike Type" />
                                    <option value="KIDS" label="Kids" />
                                    <option value="MOUNTAIN" label="Mountain" />
                                    <option value="ELECTRIC" label="Electric" />
                                    <option value="BEACH" label="Beach" />
                                  </select>
                                </div>}
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
