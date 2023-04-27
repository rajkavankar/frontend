import React, { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { List, ListItem, Grid, Button } from "@mui/material"
import { resourcePersonContext } from "../../context/ResourcePersonContext"
import FormPage from "../../components/FormPage"
import Flex from "../../components/Flex"
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa"

const SingleResPersonPage = () => {
  const {
    fetchSingleResourcePerson,
    singleResourcePerson,
    deleteResourcePerson,
  } = useContext(resourcePersonContext)
  const { id } = useParams()

  useEffect(() => {
    fetchSingleResourcePerson(id)
  }, [])

  const handleDelete = () => {
    deleteResourcePerson(id)
  }
  return (
    <div>
      <FormPage title='Resourse person' location='/resource-person'>
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <h1>{singleResourcePerson.name}</h1>
            <p>{singleResourcePerson.designation}</p>
          </Grid>
          <Grid item lg={4}>
            <Flex>
              <Button
                sx={{ mr: 2 }}
                variant='contained'
                component={Link}
                to={`/update-resp/${id}`}>
                Update
              </Button>
              <Button variant='contained' color='error' onClick={handleDelete}>
                Delete
              </Button>
            </Flex>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 2 }}>
          <Grid item lg={6}>
            <h2>Contact details</h2>

            <List>
              <ListItem>
                <p>
                  <strong>
                    <FaEnvelope />
                  </strong>
                  &nbsp;
                  {singleResourcePerson.email ? (
                    singleResourcePerson.email
                  ) : (
                    <i>(not set)</i>
                  )}
                </p>
              </ListItem>
              <ListItem>
                <p>
                  <strong>
                    <FaPhoneAlt />
                  </strong>
                  &nbsp;
                  {singleResourcePerson.phone ? (
                    singleResourcePerson.phone
                  ) : (
                    <i>(not set)</i>
                  )}
                </p>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </FormPage>
    </div>
  )
}

export default SingleResPersonPage
