import React, { useContext, useEffect } from "react"
import { Container, Button } from "@mui/material"
import Sidebar from "../../components/Sidebar"
import DisplayCard from "../../components/DisplayCard"
import DisplayTable from "../../components/DisplayTable"
import Flex from "../../components/Flex"
import { CommitteeContext } from "../../context/committeeContext"
import { CommitteeSchema } from "../../schemas/CommitteeSchema"
import { Link } from "react-router-dom"

const CommitteesPage = () => {
  const { committees, fetchCommittees } = useContext(CommitteeContext)

  useEffect(() => {
    fetchCommittees()
  }, [fetchCommittees])

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
                to='/add-committee'>
                Add
              </Button>
            </Flex>
            <DisplayTable
              title='Committes'
              source={committees}
              schema={CommitteeSchema}
            />
          </DisplayCard>
        </Container>
      </Sidebar>
    </div>
  )
}

export default CommitteesPage
