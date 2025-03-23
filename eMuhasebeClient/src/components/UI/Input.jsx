import React from "react"
import { cn } from "../../lib/utils"
import PropTypes from "prop-types"

const Input = React.forwardRef(function Input(props, ref) {
  const { className, type, ...restProps } = props

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...restProps}
    />
  )
})

Input.displayName = "Input"

export { Input }


Input.propTypes = { 
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
}
