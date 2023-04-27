import React from "react"
import ResourcePersonForm from "../../forms/ResourcePersonForm"
import FormPage from "../../components/FormPage"

const AddResoucePersonPage = () => {
  return (
    <div>
      <FormPage title='Add Resourece person' location='/resource-person'>
        <ResourcePersonForm />
      </FormPage>
    </div>
  )
}

export default AddResoucePersonPage
