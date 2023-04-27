import React, { useContext, useEffect, useState } from "react"
import { Formik, Form } from "formik"
import { FaTrash } from "react-icons/fa"
import * as Yup from "yup"
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Autocomplete,
} from "@mui/material"
import TextInputWrapper from "../components/formik-components/TextInputWrapper"
import SubmitButton from "../components/formik-components/SubmitButton"
import { CommitteeContext } from "../context/committeeContext"
import { UserContext } from "../context/UserContext"
import { toast } from "react-toastify"

const UpdateCommitteeForm = ({ id }) => {
  const [person, setPerson] = useState("")
  const [count, setCount] = useState(0)
  const {
    fetchSingleCommittee,
    singleCommittee,
    updateCommittee,
    addMember,
    removeMember,
  } = useContext(CommitteeContext)

  const { users, fetchUsers } = useContext(UserContext)

  useEffect(() => {
    fetchSingleCommittee(id)
    fetchUsers()
    console.log("invoked")
  }, [count, fetchSingleCommittee, id])

  // console.log(singleResourcePerson)
  let userNames = []
  users.forEach((uname) => {
    userNames.push(uname.data.name)
  })

  const initialValues = {
    title: singleCommittee.title,
    members: [...singleCommittee.members],
  }
  const validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
  })
  const onSubmit = (values, onSubmitProps) => {
    console.log(values)
    // const { name, designation } = values
    updateCommittee(id, values)
    onSubmitProps.resetForm()
  }

  const handleAdd = (person) => {
    if (person !== "") {
      addMember(id, person)
      // setPerson("")
      setCount(count + 1)
    } else {
      toast.error("please enter a name")
    }
  }
  const onChange = (e) => {
    setPerson((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleDelete = (m) => {
    if (window.confirm("Are you sure")) {
      removeMember(id, m)
      setCount(count + 1)
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <TextInputWrapper name='title' label='Enter title' />
          <h2>Members</h2>
          <Grid container spacing={2}>
            <Grid item lg={11}>
              <TextField
                onChange={(e) => setPerson(e.target.value)}
                variant='standard'
                fullWidth
                label='Add members'
                value={person}
              />
            </Grid>
            <Grid item lg={1}>
              <Button
                variant='contained'
                fullWidth
                onClick={() => handleAdd(person)}>
                Add
              </Button>
            </Grid>
          </Grid>
          <List>
            {singleCommittee?.members.map((member, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={member} />
                <IconButton
                  edge='end'
                  color='error'
                  onClick={() => handleDelete(member)}>
                  <FaTrash size='1.5rem' />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <SubmitButton fullWidth />
        </Form>
      </Formik>
    </div>
  )
}

export default UpdateCommitteeForm
