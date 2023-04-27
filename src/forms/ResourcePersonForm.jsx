import React, { useContext } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import TextInputWrapper from "../components/formik-components/TextInputWrapper"
import SubmitButton from "../components/formik-components/SubmitButton"
import { resourcePersonContext } from "../context/ResourcePersonContext"

const ResourcePersonForm = () => {
  const { addResourcePerson } = useContext(resourcePersonContext)
  const initialValues = {
    name: "",
    designation: "",
  }
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    designation: Yup.string().required("designation is required"),
  })
  const onSubmit = (values, onSubmitProps) => {
    console.log(values)
    const { name, designation } = values
    addResourcePerson(values)
    onSubmitProps.resetForm()
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <TextInputWrapper name='name' label='name' />
          <TextInputWrapper name='designation' label='designation' />

          <SubmitButton fullWidth />
        </Form>
      </Formik>
    </div>
  )
}

export default ResourcePersonForm
