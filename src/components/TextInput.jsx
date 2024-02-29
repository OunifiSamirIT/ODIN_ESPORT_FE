import React from "react";

const TextInput = React.forwardRef(
  (
    { type, placeholder, styles, label, labelStyles, register, name, error },
    ref
  ) => {
    return (
      <div className='w-full flex flex-col mt-2'>
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            cols="30"
            rows="10"
            className={` h50 bor-0 w-100 rounded-xxl bg-gray-100 p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
        </div>
        {error && (
          <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
