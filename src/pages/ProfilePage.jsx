import React, { useEffect, useContext, useState } from "react"
import { Container, Grid, TextField, Button, Divider } from "@mui/material"
import { toast } from "react-toastify"
import DisplayCard from "../components/DisplayCard"
import Sidebar from "../components/Sidebar"
import Flex from "../components/Flex"
import { UserContext } from "../context/UserContext"

const ProfilePage = () => {
  const { fetchLoggedInUser, loggedInUser, updateName, passwordUpdate } =
    useContext(UserContext)
  const [name, setName] = useState(loggedInUser.name)
  const [count, setCount] = useState(0)
  const [isFormEditable, setIsFormEditable] = useState(false)
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    fetchLoggedInUser()
  }, [count])

  const handleNameChange = () => {
    updateName(name)
    setIsFormEditable(false)
    setCount(count + 1)
  }

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      return toast.error("Confirm password should match")
    }
    if (password.length < 8 || confirmPassword < 8) {
      return toast.error("Password shouldnt be less than 8 charecters of empty")
    }
    passwordUpdate(password)
    setPassword("")
    setConfirmPassword("")
    setIsPasswordEnabled(!isPasswordEnabled)
  }

  return (
    <div>
      <Sidebar>
        <Container>
          <DisplayCard>
            <Flex justify='between' align='center'>
              <h2>Proflie page</h2>
              <>
                {isFormEditable ? (
                  <div>
                    <Button
                      variant='contained'
                      color='success'
                      sx={{ mr: 2 }}
                      onClick={handleNameChange}>
                      Confirm
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => setIsFormEditable(!isFormEditable)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant='contained'
                    color='info'
                    onClick={() => setIsFormEditable(!isFormEditable)}>
                    Update
                  </Button>
                )}
              </>
            </Flex>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item lg={7}>
                <TextField
                  fullWidth
                  value={name}
                  disabled={!isFormEditable}
                  variant='standard'
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item lg={5}>
                <TextField
                  fullWidth
                  value={loggedInUser.email}
                  disabled={true}
                  variant='standard'
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 4 }} />
            <Flex justify='end' align='center'>
              <>
                {isPasswordEnabled ? (
                  <div>
                    <Button
                      variant='contained'
                      color='success'
                      sx={{ mr: 2 }}
                      onClick={handlePasswordChange}>
                      Confirm
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => setIsPasswordEnabled(!isPasswordEnabled)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => setIsPasswordEnabled(!isPasswordEnabled)}>
                    Update password
                  </Button>
                )}
              </>
            </Flex>

            {isPasswordEnabled ? (
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <TextField
                    type='password'
                    fullWidth
                    label='password'
                    variant='standard'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    type='password'
                    fullWidth
                    label='Confirm password'
                    variant='standard'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
            ) : null}
          </DisplayCard>
        </Container>
      </Sidebar>
    </div>
  )
}

export default ProfilePage
