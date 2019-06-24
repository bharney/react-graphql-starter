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
              <div className="card-columns">
                {linksToRender.map(product => (
                  <div key={product.name} className="card">
                    <img className="card-img-top" src={product.image} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                    </div>
                    <div className="card-footer">
                      <button name={product._id} className="btn btn-block btn-success" onClick={(event) => {
                        this.props.history.push({
                          pathname: '/update/' + product._id
                        })
                      }}>Update</button>
                    </div>
                  </div>
                )
                )}
              </div>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(UpdateProductList);
