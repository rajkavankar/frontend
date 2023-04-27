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

export const ActivityContext = createContext()

export const ActivityProvider = ({ children }) => {
  const dbname = "activites"
  const navigate = useNavigate()
  const [activities, setActivities] = useState([])
  const [singleActivity, setSingleActivity] = useState({})
  //* Adding resource person
  const addActivity = async (data) => {
    try {
      const formData = {
        ...data,
        status: "upcoming",
        timeStamp: serverTimestamp(),
      }

      await setDoc(doc(db, dbname, v4()), formData)
      toast.success("Activity added successfully")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  //*   Fetch all Resource Persons
  const fetchActivites = async () => {
    try {
      const activityref = await collection(db, dbname)

      // const q = query(activityref)

      const querySnap = await getDocs(activityref)

      const activities = []

      querySnap.forEach((doc) => {
        return activities.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setActivities(activities)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //* Fetch single Resource Person
  const fetchSingleActivity = async (id) => {
    try {
      const docref = doc(db, dbname, id)
      const docSnap = await getDoc(docref)
      if (docSnap.exists()) {
        setSingleActivity(docSnap.data())
      }
    } catch (e) {
      toast.error("Something went wrong")
    }
  }

  //*   Delete Resource Person
  const deleteActivity = async (id) => {
    try {
      if (window.confirm("Are you sure")) {
        await deleteDoc(doc(db, dbname, id))
        navigate("/activities")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  //*   Update Resource Person
  const updateActivity = async (id, data) => {
    try {
      const docref = doc(db, dbname, id)
      await updateDoc(docref, data)
      toast.success("Activity is updated successfully")
      navigate(`/activity/${id}`)
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  return (
    <ActivityContext.Provider
      value={{
        addActivity,
        fetchActivites,
        activities,
        deleteActivity,
        updateActivity,
        fetchSingleActivity,
        singleActivity,
      }}>
      {children}
    </ActivityContext.Provider>
  )
}
