import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import { useParams } from "react-router-dom"
import * as Yup from "yup"
import { Grid } from "@mui/material"
import TextInputWrapper from "../components/formik-components/TextInputWrapper"
import SubmitButton from "../components/formik-components/SubmitButton"
import MultipleSelecWrapper from "../components/formik-components/MultimpleSelectWrapper"
import SelectInputWrapper from "../components/formik-components/SelectInputWrapper"
import { ActivityContext } from "../context/ActivityContext"
import DateInputWrapper from "../components/formik-components/DateInputWrapper"
import { resourcePersonContext } from "../context/ResourcePersonContext"
import { TagsContext } from "../context/TagsContext"
import { CommitteeContext } from "../context/committeeContext"
import FileUpload from "../components/FileUpdaod"

const UpdateActivityForm = () => {
  const { updateActivity, fetchSingleActivity, singleActivity } =
    useContext(ActivityContext)
  const { tags, fetchTags } = useContext(TagsContext)
  const { committees, fetchCommittees } = useContext(CommitteeContext)
  const { fetchResourcePerson, resourcePersons } = useContext(
    resourcePersonContext
  )

  const { id } = useParams()

  useEffect(() => {
    fetchResourcePerson()
    fetchTags()
    fetchSingleActivity(id)
    fetchCommittees()
  }, [])
  const types = ["workshop", "vac"]
  const target = ["students", "faculty"]
  const audience = ["Bscit", "BscDs", "Btech"]
  const initialValues = {
    activity_title: singleActivity.activity_title,
    activity_type: singleActivity.activity_type,
    activity_committee: singleActivity.activity_committee,
    activity_for: [...singleActivity.activity_for],
    activity_target: [...singleActivity.activity_target],
    start_date: singleActivity.start_date,
    end_date: singleActivity.end_date,
    start_time: singleActivity.start_time,
    end_time: singleActivity.end_time,
    resource_person: [...singleActivity.resource_person],
    tags: [...singleActivity.tags],
    status: singleActivity.status,
    descripsion: singleActivity.descripsion,
  }
  const validationSchema = Yup.object().shape({
    activity_title: Yup.string().required("Activity title is required"),
    activity_type: Yup.string().required("Activity type is required"),
    activity_committee: Yup.string(),
    activity_for: Yup.array(),
    activity_target: Yup.array(),
    start_date: Yup.date().required("please add start date"),
    end_date: Yup.string().required("please select end date"),
    start_time: Yup.string().required("please add start time"),
    end_time: Yup.string().required("please select end time"),
    status: Yup.string().required("Status is required"),
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

  const actStatus = ["upcoming", "completed", "cancelled"]

  const onSubmit = (values, onSubmitProps) => {
    // console.log("submitted")
    console.log(values)
    updateActivity(id, values)
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
            <Grid item lg={6}>
              <TextInputWrapper name='activity_title' label='title' />
            </Grid>
            <Grid item lg={4}>
              <SelectInputWrapper
                name='activity_type'
                label='type'
                options={types}
              />
            </Grid>
            <Grid item lg={2}>
              <SelectInputWrapper
                name='status'
                label='Status'
                options={actStatus}
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
                label='for'
                options={target}
              />
            </Grid>
            <Grid item lg={6}>
              <MultipleSelecWrapper
                name='activity_target'
                label='target'
                options={audience}
              />
            </Grid>
            <Grid item lg={6}>
              <MultipleSelecWrapper
                name='resource_person'
                label='resource person'
                options={resp}
              />
            </Grid>
            <Grid item lg={6}>
              <MultipleSelecWrapper
                name='tags'
                label='select tags'
                options={tagNames}
              />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='start_date' label='start Date' />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='end_date' label='end Date' />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='start_time' label='start Date' />
            </Grid>
            <Grid item lg={6}>
              <TextInputWrapper name='end_time' label='end Date' />
            </Grid>
            <Grid item lg={12}>
              <TextInputWrapper
                name='descripsion'
                label='descripsion'
                multiline={true}
              />
            </Grid>
          </Grid>
          <FileUpload id={id} />
          <SubmitButton fullWidth />
        </Form>
      </Formik>
    </div>
  )
}

export default UpdateActivityForm
