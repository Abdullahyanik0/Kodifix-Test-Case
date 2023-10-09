import React from "react";
import { classNames } from "utils/helper";

const TextInput = ({ placeholder, onChange, className, disabled, onKeyPress }) => {
  return (
    <div>
      <div className="relative">
        <input
          onKeyPress={onKeyPress}
          onChange={onChange}
          type={"text"}
          disabled={disabled}
          placeholder={placeholder}
          className={classNames(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg h-10 px-2 `, className)}
        />
      </div>
    </div>
  );
};

export default TextInput;
