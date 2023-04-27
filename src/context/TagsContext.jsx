import { createContext, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import {
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  collection,
  deleteDoc,
  getDoc,
} from "firebase/firestore"
import { db } from "../firebase.config"

export const TagsContext = createContext()

export const TagsProvider = ({ children }) => {
  const dbname = "tags"
  const navigate = useNavigate()
  const [tags, setTags] = useState([])
  const [singleTag, setSingleTag] = useState({})

  //* Adding tag
  const addTag = async (title) => {
    try {
      const formData = {
        title,
        timeStamp: serverTimestamp(),
      }

      await setDoc(doc(db, dbname, v4()), formData)
      toast.success("Tag added successfully")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  //*   Fetch all Tags
  const fetchTags = async () => {
    try {
      const tagsref = await collection(db, dbname)

      //   const q = query(tagsref)

      const querySnap = await getDocs(tagsref)

      const tags = []

      querySnap.forEach((doc) => {
        return tags.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setTags(tags)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //* Fetch single Tag
  const fetchSingleTag = async (id) => {
    try {
      const docref = doc(db, dbname, id)
      const docSnap = await getDoc(docref)
      if (docSnap.exists()) {
        setSingleTag(docSnap.data())
      }
    } catch (e) {
      toast.error("Something went wrong")
    }
  }

  //*   Delete Tag
  const deleteTag = async (id) => {
    try {
      if (window.confirm("Are you sure")) {
        await deleteDoc(doc(db, dbname, id))
        navigate("/tags")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  return (
    <TagsContext.Provider
      value={{ addTag, fetchTags, tags, deleteTag, fetchSingleTag, singleTag }}>
      {children}
    </TagsContext.Provider>
  )
}
