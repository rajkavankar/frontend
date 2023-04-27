import React from "react"
import FormPage from "../../components/FormPage"
import CommitteeForm from "../../forms/CommitteeForm"

const AddCommiteePage = () => {
  return (
    <div>
      <FormPage title='Add commitee' location='/committees'>
        <CommitteeForm />
      </FormPage>
    </div>
  )
}

export default AddCommiteePage
