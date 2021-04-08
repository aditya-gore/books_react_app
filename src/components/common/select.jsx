import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="from-group col-sm-6 offset-sm-3">
      <label htmlFor={name}>{label}</label>
      <div>
        <select
          key={name}
          name={name}
          id={name}
          {...rest}
          className="form-control"
          // style={{ width: 540 }}
        >
          <option value="" />
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
