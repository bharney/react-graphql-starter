import React, { Component } from 'react'

class Link extends Component {
    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={this.props.link.image} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.link.name}</h5>
                    <p className="card-text">{this.props.link.description}</p>
                </div>
            </div>
        )
    }
}

export default Link