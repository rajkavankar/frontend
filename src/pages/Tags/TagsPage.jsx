import React, { useState, useContext, useEffect } from "react"
import { Container, Button, DialogActions, DialogContent } from "@mui/material"
import Sidebar from "../../components/Sidebar"
import DisplayCard from "../../components/DisplayCard"
import DisplayModal from "../../components/DisplayModal"
import DisplayTable from "../../components/DisplayTable"
import Flex from "../../components/Flex"
import { TagsSchema } from "../../schemas/TagsSchema"
import { TagsContext } from "../../context/TagsContext"
import TagsForm from "../../forms/TagsForm"

const TagsPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [count, setCount] = useState(0)
  const { fetchTags, tags } = useContext(TagsContext)

  useEffect(() => {
    fetchTags()
  }, [count])

  return (
    <div>
      <Sidebar>
        <Container>
          <DisplayModal
            open={openModal}
            close={() => setOpenModal(false)}
            title='Add Tag'>
            <DialogContent dividers>
              <TagsForm />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenModal(false)
                  setCount(count + 1)
                }}>
                Close
              </Button>
            </DialogActions>
          </DisplayModal>
          <DisplayCard sx={{ my: 3, p: 5 }}>
            <Flex justify='end'>
              <Button
                slize='lg'
                variant='contained'
                onClick={() => setOpenModal(true)}>
                Add
              </Button>
            </Flex>
            <DisplayTable title='Tags' source={tags} schema={TagsSchema} />
          </DisplayCard>
        </Container>
      </Sidebar>
    </div>
  )
}

export default TagsPage
