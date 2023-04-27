import React, { useContext, useEffect } from "react"
import { Container, Button } from "@mui/material"
import { Link } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import DisplayCard from "../../components/DisplayCard"
import DisplayTable from "../../components/DisplayTable"
import { ResourcePersonSchema } from "../../schemas/ResourcePersonSchema"
import Flex from "../../components/Flex"
import { resourcePersonContext } from "../../context/ResourcePersonContext"

const ResourcePersonPage = () => {
  const { resourcePersons, fetchResourcePerson } = useContext(
    resourcePersonContext
  )

  useEffect(() => {
    fetchResourcePerson()
  }, [])

  return (
    <div>
      <Sidebar>
        <Container>
          <DisplayCard sx={{ my: 3, p: 5 }}>
            <Flex justify='end'>
              <Button
                slize='lg'
                variant='contained'
                component={Link}
                to='/add-resp'>
                Add
              </Button>
            </Flex>
            <DisplayTable
              title='Resource Persons'
              source={resourcePersons}
              schema={ResourcePersonSchema}
            />
          </DisplayCard>
        </Container>
      </Sidebar>
    </div>
  )
}

export default ResourcePersonPage
