import React, { Component } from 'react'

export default class Picker extends Component {
    render() {
        const { value, onChange, options } = this.props

        return (
            <div className="form-group">
                <h1>{value}</h1>
                <select onChange={e => onChange(e.target.value)} value={value} className="form-control">
                    {options.map(option => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}