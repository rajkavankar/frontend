import React, { useContext, useEffect } from "react"
import { Container, Button } from "@mui/material"
import { Link } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import DisplayCard from "../../components/DisplayCard"
import DisplayTable from "../../components/DisplayTable"
import { ActivitySchema } from "../../schemas/ActivitySchema"
import Flex from "../../components/Flex"
import { ActivityContext } from "../../context/ActivityContext"

const ActivityPage = () => {
  const { fetchActivites, activities } = useContext(ActivityContext)

  useEffect(() => {
    fetchActivites()
  }, [])

  return (
    <div>
      <Sidebar>
        <Container>
          <DisplayCard sx={{ my: 3, p: 5 }}>
            <Flex justify='end'>
              <Button
                component={Link}
                slize='lg'
                variant='contained'
                to='/add-activity'>
                Add activity
              </Button>
            </Flex>
            <DisplayTable
              title='Activites'
              source={activities}
              schema={ActivitySchema}
            />
          </DisplayCard>
        </Container>
      </Sidebar>
    </div>
  )
}

export default ActivityPage
