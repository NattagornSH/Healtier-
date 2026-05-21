function InputField({
  label,
  value,
  onChange,
  type = 'number',
  min,
  max,
  step,
  id,
  ...rest
}) {
  const inputId = id || label

  return (
    <label className="input-field" htmlFor={inputId}>
      <span>{label}</span>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        inputMode={type === 'number' ? 'decimal' : undefined}
        {...rest}
      />
    </label>
  )
}

export default InputField
