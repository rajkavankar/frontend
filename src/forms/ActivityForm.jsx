import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Grid } from "@mui/material"
import TextInputWrapper from "../components/formik-components/TextInputWrapper"
import SubmitButton from "../components/formik-components/SubmitButton"
import MultipleSelecWrapper from "../components/formik-components/MultimpleSelectWrapper"
import SelectInputWrapper from "../components/formik-components/SelectInputWrapper"
import { ActivityContext } from "../context/ActivityContext"
import { resourcePersonContext } from "../context/ResourcePersonContext"
import { TagsContext } from "../context/TagsContext"
import { CommitteeContext } from "../context/committeeContext"
import FileUpload from "../components/FileUpdaod"

const ActivityForm = () => {
  const { addActivity } = useContext(ActivityContext)
  const { tags, fetchTags } = useContext(TagsContext)
  const { committees, fetchCommittees } = useContext(CommitteeContext)
  const { fetchResourcePerson, resourcePersons } = useContext(
    resourcePersonContext
  )

  useEffect(() => {
    fetchResourcePerson()
    fetchTags()
    fetchCommittees()
  }, [])
  const types = ["workshop", "vac"]
  const target = ["students", "faculty"]
  const audience = ["Bscit", "BscDs", "Btech"]
  const initialValues = {
    activity_title: "",
    activity_type: "",
    activity_for: [],
    activity_target: [],
    activity_committee: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    resource_person: [],
    tags: [],
    descripsion: "",
  }
  const validationSchema = Yup.object().shape({
    activity_title: Yup.string().required("Activity title is required"),
    activity_type: Yup.string().required("Activity type is required"),
    activity_for: Yup.array(),
    activity_target: Yup.array(),
    activity_committee: Yup.string().required("Select a committee"),
    start_date: Yup.date().required("please add start date"),
    end_date: Yup.string().required("please add end date"),
    start_time: Yup.string().required("please add start time"),
    end_time: Yup.string().required("please add end time"),
    resource_person: Yup.array().required("please select end resource person"),
    tags: Yup.array().required("please add tags"),
    descripsion: Yup.string().required("please add descripsion"),
  })
  const resp = []
  resourcePersons.forEach((res) => {
    resp.push(res.data.name)
  })
  const tagNames = []
  tags.forEach((tag) => {
    tagNames.push(tag.data.title)
  })

  const committeeList = []
  committees.forEach((com) => {
    committeeList.push(com.data.title)
  })

  const onSubmit = (values, onSubmitProps) => {
    // console.log("submitted")
    console.log(values)
    addActivity(values)
    onSubmitProps.resetForm()
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <Grid container spacing={3}>
            <Grid item lg={8}>
              <TextInputWrapper name='activity_title' label='Title' />
            </Grid>
            <Grid item lg={4}>
              <SelectInputWrapper
                name='activity_type'
                label='Type'
                options={types}
              />
            </Grid>
            <Grid item lg={12}>
              <SelectInputWrapper
                name='activity_committee'
                label='Committees'
                options={committeeList}
              />
            </Grid>

            <Grid item lg={6}>
              <MultipleSelecWrapper
                name='activity_for'
                label='For'
                options={target}
              />
            </Grid>
            <Grid item lg={6}>
              <MultipleSelecWrapper
                name='activity_target'
                label='Target'
                options={audience}
              />
            </Grid>
            <Grid item lg={6}>
              <MultipleSelecWrapper
                name='resource_person'
                label='Resource person'
                options={resp}
              />
            </Grid>
            <Grid item lg={6}>
              <MultipleSelecWrapper
                name='tags'
                label='Select tags'
                options={tagNames}
              />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='start_date' label='Start Date' />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='end_date' label='End Date' />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='start_time' label='Start time' />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='end_time' label='End time' />
            </Grid>
            <Grid item lg={12}>
              <TextInputWrapper
                name='descripsion'
                label='Descripsion'
                multiline={true}
              />
            </Grid>
          </Grid>
          {/* <FileUpload /> */}
          <SubmitButton fullWidth />
        </Form>
      </Formik>
    </div>
  )
}

export default ActivityForm
