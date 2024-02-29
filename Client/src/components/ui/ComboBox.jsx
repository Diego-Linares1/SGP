import React from "react";

const Combobox = ({ name, children, ...rest }) => {
  return (
    <select name={name} {...rest}>
      {children}
    </select>
  );
};

export default Combobox;


    // className="w-full text-sm text-gray-600 focus:outline-none focus:border-blue-500"