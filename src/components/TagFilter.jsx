import React from "react"
// import MultipleSelectWrapper from "./formik-components/MultimpleSelectWrapper"

const TagFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      {/* <MultipleSelectWrapper /> */}
      <input
        type='text'
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  )
}

export default TagFilter
