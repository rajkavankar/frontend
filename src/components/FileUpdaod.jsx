import React, { useState } from "react"
import { Button, Input, Grid } from "@mui/material"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import axios from "axios"

const FileUpload = ({ id }) => {
  const dbname = "activites"
  const [file, setFile] = useState("")
  const [uploadFile, setUploadFile] = useState({})

  const onChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUpload = async () => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post(
        "http://localhost:5000/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      const { fileName, filePath } = response.data
      console.log(fileName)
      await updateDoc(doc(db, dbname, id), { image: fileName })

      setUploadFile({ fileName, filePath })
    } catch (error) {
      if (error.response.status === 500) {
        console.log("There was a problem in server")
      } else {
        console.log(error.response.data.message)
      }
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <Input name='file' fullWidth type='file' onChange={onChange} />
        </Grid>

        <Grid item lg={4}>
          <Button variant='contained' onClick={onUpload}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default FileUpload
