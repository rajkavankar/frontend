import { useState, createContext, useCallback } from "react"
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
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"
import { db } from "../firebase.config"

export const CommitteeContext = createContext()

export const CommitteeProvider = ({ children }) => {
  const dbname = "committees"
  const navigate = useNavigate()
  const [committees, setCommittees] = useState([])
  const [singleCommittee, setSingleCommittee] = useState({})

  //* Adding committee
  const addCommittee = async (title) => {
    try {
      const formData = {
        timeStamp: serverTimestamp(),
        title,
        members: [],
      }

      await setDoc(doc(db, dbname, v4()), formData)
      toast.success("Committee added successfully")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  //*   Fetch all committees
  const fetchCommittees = useCallback(async () => {
    try {
      const committeesRef = await collection(db, dbname)

      // const q = query(resourcePersonRef)

      const querySnap = await getDocs(committeesRef)

      const committees = []

      querySnap.forEach((doc) => {
        return committees.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setCommittees(committees)
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }, [])

  //* Fetch single Committee
  const fetchSingleCommittee = useCallback(async (id) => {
    try {
      const docref = doc(db, dbname, id)
      const docSnap = await getDoc(docref)
      if (docSnap.exists()) {
        setSingleCommittee(docSnap.data())
      }
    } catch (e) {
      toast.error("Something went wrong")
    }
  }, [])

  //*   Delete a Committee
  const deleteCommittee = async (id) => {
    try {
      await deleteDoc(doc(db, dbname, id))
      navigate("/committees")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  //*   Update a committee
  const updateCommittee = async (id, data) => {
    try {
      const docref = doc(db, dbname, id)
      await updateDoc(docref, data)
      toast.success("Committee is updated successfully")
      navigate(`/single-committee/${id}`)
    } catch (e) {
      toast.error("Something went wrong")
    }
  }

  //* Add member to committee
  const addMember = async (id, value) => {
    try {
      const docref = doc(db, dbname, id)
      await updateDoc(docref, {
        members: arrayUnion(value),
      })
      toast.success("Member added successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //* Remove member from committee
  const removeMember = async (id, value) => {
    try {
      const docref = doc(db, dbname, id)
      await updateDoc(docref, {
        members: arrayRemove(value),
      })
      toast.success("Member removed successfully")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  return (
    <CommitteeContext.Provider
      value={{
        addCommittee,
        fetchCommittees,
        committees,
        fetchSingleCommittee,
        singleCommittee,
        deleteCommittee,
        updateCommittee,
        addMember,
        removeMember,
      }}>
      {children}
    </CommitteeContext.Provider>
  )
}
