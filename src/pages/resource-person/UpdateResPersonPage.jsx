import React from "react"
import FormPage from "../../components/FormPage"
import ResourcePersonUpdateForm from "../../forms/ResourcePersonUpdateForm"
import { useParams } from "react-router-dom"

const UpdateResPersonPage = () => {
  const { id } = useParams()
  return (
    <div>
      <FormPage title='Update Resourece person' location='/resource-person'>
        <ResourcePersonUpdateForm id={id} />
      </FormPage>
    </div>
  )
}

export default UpdateResPersonPage
