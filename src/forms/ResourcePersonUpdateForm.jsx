import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Grid } from "@mui/material"
import TextInputWrapper from "../components/formik-components/TextInputWrapper"
import SubmitButton from "../components/formik-components/SubmitButton"
import { resourcePersonContext } from "../context/ResourcePersonContext"

const ResourcePersonUpdateForm = ({ id }) => {
  const {
    fetchSingleResourcePerson,
    singleResourcePerson,
    updateResourcePerson,
  } = useContext(resourcePersonContext)

  useEffect(() => {
    fetchSingleResourcePerson(id)
  }, [])

  // console.log(singleResourcePerson)

  const initialValues = {
    name: singleResourcePerson.name,
    designation: singleResourcePerson.designation,
    phone: singleResourcePerson.phone,
    email: singleResourcePerson.email,
  }
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    designation: Yup.string().required("designation is required"),
    phone: Yup.string(),
    email: Yup.string(),
  })
  const onSubmit = (values, onSubmitProps) => {
    console.log(values)
    // const { name, designation } = values
    updateResourcePerson(id, values)
    onSubmitProps.resetForm()
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <TextInputWrapper name='name' label='name' />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='designation' label='designation' />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <TextInputWrapper name='phone' label='phone' />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='email' label='email' />
            </Grid>
          </Grid>

          <SubmitButton fullWidth />
        </Form>
      </Formik>
    </div>
  )
}

export default ResourcePersonUpdateForm
