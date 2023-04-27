import React, { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { List, ListItem, Grid, Chip, Button, Box } from "@mui/material"
import DisplayCard from "../../components/DisplayCard"
import { ActivityContext } from "../../context/ActivityContext"
import FormPage from "../../components/FormPage"
import Flex from "../../components/Flex"
import { FaCloudDownloadAlt, FaClock, FaRegCalendarAlt } from "react-icons/fa"
import { generateReport } from "../../helpers/generateReposrt"
import img from "../../uploads/sample.jpg"

const SingleActivityPage = () => {
  const { fetchSingleActivity, singleActivity, deleteActivity } =
    useContext(ActivityContext)
  const { id } = useParams()

  useEffect(() => {
    fetchSingleActivity(id)
    console.log(singleActivity.image)
  }, [])

  const handleSave = () => {
    generateReport(singleActivity)
  }

  const handleDelete = () => {
    deleteActivity(id)
  }

  return (
    <div>
      <FormPage title='Activity' location='/activities'>
        {singleActivity.image ? (
          <img
            src={require(`../../uploads/${singleActivity.image}`)}
            alt='img'
            height='500px'
            width='100%'
          />
        ) : (
          <div
            style={{
              height: "300px",
              background: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            Cover is not set yet
          </div>
        )}
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <h1>{singleActivity.activity_title}</h1>
            <span>
              {singleActivity.status === "upcoming" ? (
                <Chip label={singleActivity.status} color='info' size='small' />
              ) : singleActivity.status === "completed" ? (
                <Chip
                  label={singleActivity.status}
                  color='success'
                  size='small'
                />
              ) : (
                singleActivity.status === "cancelled" && (
                  <Chip
                    label={singleActivity.status}
                    color='error'
                    size='small'
                  />
                )
              )}
            </span>
            <p>{singleActivity.activity_type}</p>
          </Grid>
          <Grid item lg={4}>
            <Flex>
              <Button
                sx={{ mr: 2 }}
                variant='contained'
                color='info'
                component={Link}
                to={`/update-activity/${id}`}>
                Update
              </Button>
              <Button variant='contained' color='error' onClick={handleDelete}>
                Delete
              </Button>
            </Flex>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }}>
          <Grid item lg={8}>
            <h4>Activity audiance</h4>
            <List>
              {singleActivity.activity_for?.map((act, index) => (
                <ListItem key={index}>{act}</ListItem>
              ))}
            </List>
          </Grid>
          <Grid item lg={4}>
            <DisplayCard>
              <h4 style={{ marginBottom: "1rem" }}>All Tags</h4>
              {singleActivity.tags?.map((act, index) => (
                <span key={index}>
                  <Chip label={act} color='secondary' /> &nbsp;
                </span>
              ))}
            </DisplayCard>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }}>
          <Grid item lg={6}>
            <h4>Committee</h4>
            <List>
              <ListItem>{singleActivity.activity_committee}</ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }}>
          <Grid item lg={6}>
            <h4>Resource persons</h4>
            <List>
              {singleActivity.resource_person?.map((resp, index) => (
                <ListItem key={index}>{resp}</ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }}>
          <Grid item lg={6}>
            <h4>Targeted courses</h4>
            <List>
              {singleActivity.activity_target?.map((act, index) => (
                <ListItem key={index}>{act}</ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Box sx={{ my: 3 }}>
          <h4 style={{ marginBottom: "0.6rem" }}>Dates</h4>
          <span>
            <FaRegCalendarAlt color='#6EC72D' /> &nbsp;
            {singleActivity.start_date} &nbsp; &nbsp;
            <FaRegCalendarAlt color='#B4161B' /> &nbsp;{" "}
            {singleActivity.end_date}
          </span>
        </Box>
        <Box sx={{ my: 3 }}>
          <h4 style={{ marginBottom: "0.6rem" }}>Timings</h4>
          <span>
            <FaClock color='#6EC72D' /> &nbsp; {singleActivity.start_time}{" "}
            &nbsp; &nbsp;
            <FaClock color='#B4161B' /> &nbsp; {singleActivity.end_time}
          </span>
        </Box>
        <Grid container sx={{ mt: 3 }}>
          <Grid item lg={12}>
            <h4 style={{ marginBottom: "0.5rem" }}>Descripsion</h4>
            <p style={{ textAlign: "justify", fontSize: "1.1rem" }}>
              {singleActivity.descripsion}
            </p>
          </Grid>
        </Grid>
        <Flex justify='end' align='center'>
          <Button variant='contained' color='success' onClick={handleSave}>
            <FaCloudDownloadAlt size={"1.5rem"} />
            &nbsp; Download report
          </Button>
        </Flex>
      </FormPage>
    </div>
  )
}

export default SingleActivityPage
