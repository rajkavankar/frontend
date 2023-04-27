import React from "react"
import { useParams } from "react-router-dom"
import FormPage from "../../components/FormPage"
import UpdateCommitteeForm from "../../forms/UpdateCommitteeForm"

const UpdateCommitteePage = () => {
  const { id } = useParams()
  return (
    <div>
      <FormPage title='Upadate committee' location={`/single-committee/${id}`}>
        <UpdateCommitteeForm id={id} />
      </FormPage>
    </div>
  )
}

export default UpdateCommitteePage
