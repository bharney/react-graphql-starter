import React, { Component } from 'react'

class Link extends Component {
    render() {
        return (
            <li>
                {this.props.link.name} ({this.props.link.description})
            </li>
        )
    }
}

export default Link