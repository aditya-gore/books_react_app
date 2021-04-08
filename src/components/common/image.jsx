import React from "react";

const Image = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group col-sm-6 offset-sm-3">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Image;
