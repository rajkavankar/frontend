import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { Button, Chip, Grid, List, ListItem } from "@mui/material"
import FormPage from "../components/FormPage"
import { CommitteeContext } from "../context/committeeContext"

const SingleUserPage = () => {
  const [count, setCount] = useState(0)
  const { fetchSingleUser, singleUser, changeRole } = useContext(UserContext)
  const { fetchCommittees, committees } = useContext(CommitteeContext)
  const { id } = useParams()

  useEffect(() => {
    fetchSingleUser(id)
    fetchCommittees()
    console.log("invoked")
  }, [count])

  const handleRoleChange = () => {
    if (window.confirm("Are you sure")) {
      changeRole(singleUser.isAdmin, id)
      setCount(count + 1)
    }
  }

  const fileterCommittee = committees.filter((com) =>
    com.data.members?.includes(singleUser.name)
  )

  console.log(fileterCommittee)

  return (
    <div>
      <FormPage title='User' location='/users'>
        <Grid container spacing={2}>
          <Grid item lg={10}>
            <h1>{singleUser.name}</h1>
          </Grid>
          <Grid item lg={2}>
            <Button variant='contained' onClick={handleRoleChange}>
              Change role
            </Button>
          </Grid>
        </Grid>

        {singleUser.isAdmin ? (
          <Chip variant='soft' label='Admin' color='success' />
        ) : (
          <Chip variant='soft' label='User' color='primary' />
        )}
        <p>{singleUser.email}</p>

        <h2>Committees included</h2>
        <List>
          {fileterCommittee.map((item, index) => (
            <ListItem key={index}>{item.data.title}</ListItem>
          ))}
        </List>
      </FormPage>
    </div>
  )
}

export default SingleUserPage
