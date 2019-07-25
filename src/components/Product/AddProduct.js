import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik';
import { NotificationContext, alertTypes } from '../../context/NotificationProvider';
const PRODUCT_MUTATION = gql`
mutation ProductMutation(
  $name: String!,
  $price: Float!,
  $image: String!,
  $type: ProductType!,
  $description: String!,
  $range: String!,
  $liquidCooled: Boolean!,
  $bikeType: BikeType!) {
  newProduct(input:{
    name: $name
    price: $price
    image: $image
    type: $type
    description: $description,
    range: $range
    liquidCooled: $liquidCooled
    bikeType: $bikeType
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
      <NotificationContext.Consumer>
        {({ openAlert }) => (
          <main className="container">
            <div className="row justify-content-center">
              <div className="col">
                <h2 className="text-center display-4">Add.</h2>
                <Mutation
                  mutation={PRODUCT_MUTATION}
                  refetchQueries={[{ query: GET_PRODUCTS }]}>
                  {(newProduct) => (
                    <Formik
                      initialValues={{ name: '', price: '', image: '', type: '', description: '', range: '', bikeType: 'MOUNTAIN', liquidCooled: false }}
                      onSubmit={({ name, price, image, type, description, range, liquidCooled, bikeType }, { resetForm }) => {
                        newProduct({ variables: { name, price, image, type, description, range, liquidCooled, bikeType } })
                        resetForm()
                        openAlert("Added Product Successfully!", alertTypes.success);
                        this.props.history.push("/")
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
                                className="form-control"
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
                                className="form-control"
                              >
                                <option value="" label="Select Bike Type" />
                                <option value="KIDS" label="Kids" />
                                <option value="MOUNTAIN" label="Mountain" />
                                <option value="ELECTRIC" label="Electric" />
                                <option value="BEACH" label="Beach" />
                              </select>
                            </div>}
                            <button type="submit" className="btn btn-success">Submit</button>
                          </form>
                        );
                      }}
                    </Formik>
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

export default AddProduct;
