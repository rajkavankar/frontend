import React, { useContext, useEffect } from "react"
import { Container, Grid } from "@mui/material"
import DisplayCard from "../components/DisplayCard"
import Sidebar from "../components/Sidebar"
import { ActivityContext } from "../context/ActivityContext"
import { CommitteeContext } from "../context/committeeContext"
import { TagsContext } from "../context/TagsContext"
import { UserContext } from "../context/UserContext"

const DashboardPage = () => {
  const { fetchActivites, activities } = useContext(ActivityContext)
  const { fetchCommittees, committees } = useContext(CommitteeContext)
  const { fetchTags, tags } = useContext(TagsContext)
  const { fetchLoggedInUser, loggedInUser } = useContext(UserContext)

  useEffect(() => {
    fetchActivites()
    fetchCommittees()
    fetchTags()
    fetchLoggedInUser()
  }, [])

  return (
    <div>
      <Sidebar>
        <Container>
          <DisplayCard>
            <h2>Welcome {loggedInUser.name}</h2>
          </DisplayCard>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item lg={4}>
              <DisplayCard>
                <h1>Total Activities: {activities.length}</h1>
              </DisplayCard>
            </Grid>
            <Grid item lg={4}>
              <DisplayCard>
                <h1>Total Committees: {committees.length}</h1>
              </DisplayCard>
            </Grid>
            <Grid item lg={4}>
              <DisplayCard>
                <h1>Total Tags: {tags.length}</h1>
              </DisplayCard>
            </Grid>
          </Grid>
        </Container>
      </Sidebar>
    </div>
  )
}

export default DashboardPage
