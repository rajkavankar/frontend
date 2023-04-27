import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import FormPage from "../../components/FormPage"
import { useParams } from "react-router-dom"
import { List, ListItem, ListItemText, Grid, Button } from "@mui/material"
import { CommitteeContext } from "../../context/committeeContext"

const SingleCommitteePage = () => {
  const { id } = useParams()
  const { fetchSingleCommittee, singleCommittee, deleteCommittee } =
    useContext(CommitteeContext)

  useEffect(() => {
    fetchSingleCommittee(id)
  }, [fetchSingleCommittee, id])

  const handleDelete = () => {
    if (window.confirm("Are you sure")) {
      deleteCommittee(id)
    }
  }

  return (
    <div>
      <FormPage title='Committee' location='/committees'>
        <Grid container spacing={2}>
          <Grid item lg={9}>
            <h1 sx={{ mb: 3 }}>{singleCommittee.title}</h1>
          </Grid>
          <Grid item lg={3}>
            <Button
              sx={{ mr: 1 }}
              variant='contained'
              color='info'
              component={Link}
              to={`/update-committee/${id}`}>
              Update
            </Button>
            <Button variant='contained' color='error' onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
        <h3>Total members: {singleCommittee.members?.length}</h3>
        <List>
          {singleCommittee.members?.map((member, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={member} />
            </ListItem>
          ))}
        </List>
      </FormPage>
    </div>
  )
}

export default SingleCommitteePage
