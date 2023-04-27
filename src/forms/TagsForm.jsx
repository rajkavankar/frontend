import React, { useContext } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import TextInputWrapper from "../components/formik-components/TextInputWrapper"
import SubmitButton from "../components/formik-components/SubmitButton"
import { TagsContext } from "../context/TagsContext"
const TagsForm = () => {
  const { addTag } = useContext(TagsContext)

  const initialValues = {
    tag: "",
  }
  const validationSchema = Yup.object({
    tag: Yup.string().required("Tag is required"),
  })

  const onSubmit = (values, onSubmitProps) => {
    console.log(values)
    const { tag } = values
    addTag(tag)
    onSubmitProps.resetForm()
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <TextInputWrapper type='text' name='tag' label='Add tag' />

          <SubmitButton fullWidth />
        </Form>
      </Formik>
    </div>
  )
}

export default TagsForm
