import React from "react";

export const Combobox = ({ items, children, ...props }) => {
  return (
    <div className="combobox" {...props}>
      {children}
    </div>
  );
};

export const ComboboxContent = ({ children, ...props }) => {
  return (
    <div className="combobox-content" {...props}>
      {children}
    </div>
  );
};

export const ComboboxEmpty = ({ children, ...props }) => {
  return (
    <div className="combobox-empty" {...props}>
      {children}
    </div>
  );
};

export const ComboboxInput = ({ placeholder, ...props }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="combobox-input border px-2 py-1"
      {...props}
    />
  );
};

export const ComboboxList = ({ children, ...props }) => {
  return (
    <ul className="combobox-list" {...props}>
      {children}
    </ul>
  );
};

export const ComboboxItem = ({ value, children, ...props }) => {
  return (
    <li className="combobox-item px-2 py-1 cursor-pointer" {...props}>
      {children}
    </li>
  );
};
