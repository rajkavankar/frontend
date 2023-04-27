import React from "react"
import FormPage from "../../components/FormPage"
import ActivityForm from "../../forms/ActivityForm"

const AddActivityPage = () => {
  return (
    <div>
      <FormPage title='Add activity' location='/activities'>
        <ActivityForm />
      </FormPage>
    </div>
  )
}

export default AddActivityPage
