import React from "react"
import FormPage from "../../components/FormPage"
import UpdateActivityForm from "../../forms/UpdateActivityForm"

const UpdateActivity = () => {
  return (
    <div>
      <FormPage title='Update activity' location='/activities'>
        <UpdateActivityForm />
      </FormPage>
    </div>
  )
}

export default UpdateActivity
