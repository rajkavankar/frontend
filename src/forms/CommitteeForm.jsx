import React, { useContext } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import TextInputWrapper from "../components/formik-components/TextInputWrapper"
import SubmitButton from "../components/formik-components/SubmitButton"
import { CommitteeContext } from "../context/committeeContext"

const CommitteeForm = () => {
  const { addCommittee } = useContext(CommitteeContext)
  const initialValues = {
    title: "",
  }
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  })
  const onSubmit = (values, onSubmitProps) => {
    console.log(values)
    const { title } = values
    addCommittee(title)
    onSubmitProps.resetForm()
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <TextInputWrapper name='title' label='Enter title' />

          <SubmitButton fullWidth />
        </Form>
      </Formik>
    </div>
  )
}

export default CommitteeForm
