import { createContext, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore"
import { db } from "../firebase.config"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const dbname = "users"
  const navigate = useNavigate()
  const auth = getAuth()
  const [users, setUsers] = useState([])
  const [loggedInUser, setLoggedInUser] = useState([])
  const [singleUser, setSingleUser] = useState({})

  //* Registering a user
  const addUser = async (name, email, password, isAdmin) => {
    try {
      // collecting form data
      const formData = {
        name,
        email,
        password,
        isAdmin,
      }

      //   adding user to auth
      const useCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Adding user to database
      const user = useCredentials.user
      await updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timeStamp = serverTimestamp()
      formDataCopy.id = user.uid

      await setDoc(doc(db, "users", user.uid), formDataCopy)

      toast.success("User added successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //* Updateing name of user
  const updateName = async (name) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      })
      const docref = doc(db, dbname, auth.currentUser.uid)
      await updateDoc(docref, { name: name })
      toast.success("Name changed successfully")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  //* Updateing password of user
  const passwordUpdate = (password) => {
    try {
      updatePassword(auth.currentUser, password)
      toast.success("password updated successfullly")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //* Fetching all users
  const fetchUsers = async () => {
    const usersRef = collection(db, "users")

    // const q = query(usersRef)

    const querySnap = await getDocs(usersRef)

    const users = []

    querySnap.forEach((doc) => {
      return users.push({
        id: doc.id,
        data: doc.data(),
      })
    })

    setUsers(users)
  }

  //* Get LoggedIn user
  const fetchLoggedInUser = async () => {
    try {
      const docref = collection(db, "users")
      const q = await query(docref, where("id", "==", auth.currentUser.uid))
      const docSnap = await getDocs(q)

      const user = []
      docSnap.forEach((doc) => {
        return user.push({
          // id: doc.id,
          ...doc.data(),
        })
      })

      setLoggedInUser(user[0])
    } catch (e) {
      console.log(e)
    }
  }

  //* Change role of user
  const changeRole = async (role, id) => {
    try {
      const docref = doc(db, dbname, id)
      await updateDoc(docref, { isAdmin: !role })
      toast.success("Role changed successfullly")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  //* Get a single user
  const fetchSingleUser = async (id) => {
    try {
      const docref = doc(db, "users", id)
      const docSnap = await getDoc(docref)
      if (docSnap.exists()) {
        setSingleUser(docSnap.data())
      }
    } catch (e) {
      toast.error("Something went wrong")
    }
  }

  //*  LogginIn a user
  const onLogIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredentials.user) {
        navigate("/dashboard")
      }
    } catch (error) {
      toast.error("Invalid credentials")
    }
  }

  //* Sending fogot password email
  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  //*   LogOut a user
  const onLogOut = () => {
    auth.signOut()
    navigate("/login")
  }

  return (
    <UserContext.Provider
      value={{
        addUser,
        onLogIn,
        forgotPassword,
        onLogOut,
        users,
        fetchUsers,
        fetchLoggedInUser,
        loggedInUser,
        fetchSingleUser,
        singleUser,
        changeRole,
        updateName,
        passwordUpdate,
      }}>
      {children}
    </UserContext.Provider>
  )
}
