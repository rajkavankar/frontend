import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Box, Button } from "@mui/material"
import Flex from "../../components/Flex"
import FormPage from "../../components/FormPage"
import { TagsContext } from "../../context/TagsContext"
import { ActivityContext } from "../../context/ActivityContext"
import { ActivitySchema } from "../../schemas/ActivitySchema"
import DisplayTable from "../../components/DisplayTable"

const SingleTagPage = () => {
  const { id } = useParams()
  const { fetchActivites, activities } = useContext(ActivityContext)
  const { fetchSingleTag, singleTag, deleteTag } = useContext(TagsContext)

  useEffect(() => {
    fetchSingleTag(id)
    fetchActivites()
  }, [])

  const filteredActvities = activities.filter((value) =>
    value.data.tags.includes(singleTag.title)
  )

  console.log(filteredActvities)

  const handleDelete = () => {
    deleteTag(id)
  }

  return (
    <FormPage title='Tag' location='/tags'>
      <Flex justify='between' aligh='center'>
        <h1>{singleTag.title}</h1>
        <Button variant='contained' color='error' onClick={handleDelete}>
          Delete
        </Button>
      </Flex>
      {filteredActvities.length > 0 ? (
        <DisplayTable
          title='Activities including tag'
          schema={ActivitySchema}
          source={filteredActvities}
        />
      ) : (
        <div
          style={{
            height: "8rem",
            background: "#ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}>
          <p>No Activites created with this tag</p>
        </div>
      )}
    </FormPage>
  )
}

export default SingleTagPage
