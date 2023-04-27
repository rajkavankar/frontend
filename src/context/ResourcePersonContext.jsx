import { createContext, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../firebase.config"

export const resourcePersonContext = createContext()

export const ResourcePersonProvider = ({ children }) => {
  const navigate = useNavigate()
  const dbname = "resourcePersons"
  const [resourcePersons, setResourcePersons] = useState([])
  const [singleResourcePerson, setSingleResourcePerson] = useState({})
  //* Adding resource person
  const addResourcePerson = async (data) => {
    try {
      const formData = {
        timeStamp: serverTimestamp(),
        ...data,
      }

      await setDoc(doc(db, dbname, v4()), formData)
      toast.success("Resource person added successfully")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  //*   Fetch all Resource Persons
  const fetchResourcePerson = async () => {
    try {
      const resourcePersonRef = await collection(db, dbname)

      // const q = query(resourcePersonRef)

      const querySnap = await getDocs(resourcePersonRef)

      const resourcePersons = []

      querySnap.forEach((doc) => {
        return resourcePersons.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setResourcePersons(resourcePersons)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //* Fetch single Resource Person
  const fetchSingleResourcePerson = async (id) => {
    try {
      const docref = doc(db, dbname, id)
      const docSnap = await getDoc(docref)
      if (docSnap.exists()) {
        setSingleResourcePerson(docSnap.data())
      }
    } catch (e) {
      toast.error("Something went wrong")
    }
  }

  //*   Delete Resource Person
  const deleteResourcePerson = async (id) => {
    try {
      if (window.confirm("Are you sure")) {
        await deleteDoc(doc(db, dbname, id))
        navigate("/resource-person")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  //*   Update Resource Person
  const updateResourcePerson = async (id, data) => {
    try {
      const docref = doc(db, dbname, id)
      await updateDoc(docref, data)
      toast.success("Resource person is updated successfully")
      navigate(`/single-resp/${id}`)
    } catch (e) {
      toast.error("Something went wrong")
    }
  }

  return (
    <resourcePersonContext.Provider
      value={{
        addResourcePerson,
        fetchResourcePerson,
        resourcePersons,
        deleteResourcePerson,
        updateResourcePerson,
        fetchSingleResourcePerson,
        singleResourcePerson,
      }}>
      {children}
    </resourcePersonContext.Provider>
  )
}
