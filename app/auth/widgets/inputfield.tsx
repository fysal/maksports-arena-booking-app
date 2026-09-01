/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface textFieldType {
  type?: string;
  placeholderText?: string;
  onChange?: () => void;
  useformProps: any;
  isSubmitting?: boolean;
  error: any;
}

function InputField({
  type = "text",
  placeholderText,
  onChange,
  useformProps,
  isSubmitting = false,
  error,
}: textFieldType) {
  return (
    <div>
      <input
        type={type}
        {...useformProps}
        placeholder={placeholderText}
        onChange={onChange}
        disabled={isSubmitting}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-black"
      />
      {error && (
        <div className="text-sm text-red-600 my-2">{error.message}</div>
      )}
    </div>
  );
}

export default InputField;
