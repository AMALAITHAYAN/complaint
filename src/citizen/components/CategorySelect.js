import React from 'react';

const CategorySelect = ({ value, onChange }) => {
    return (
        <select className="form-control" value={value} onChange={onChange}>
            <option value="">Select a Category</option>
            <option value="INFRASTRUCTURE">Infrastructure</option>
            <option value="SERVICE">Service</option>
            <option value="PERSONNEL">Personnel</option>
            <option value="OTHER">Other</option>
        </select>
    );
};

export default CategorySelect;