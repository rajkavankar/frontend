import React from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import UsersPage from "./pages/UsersPage"
import PrivateRoute from "./components/PrivateRoute"
import SingleUserPage from "./pages/SingleUserPage"
import ResourcePersonPage from "./pages/resource-person/ResourcePersonPage"
import TagsPage from "./pages/Tags/TagsPage"
import { UserProvider } from "./context/UserContext"
import { ResourcePersonProvider } from "./context/ResourcePersonContext"
import { TagsProvider } from "./context/TagsContext"
import { ActivityProvider } from "./context/ActivityContext"
import AddActivityPage from "./pages/Activity/AddActivityPage"
import ActivityPage from "./pages/Activity/ActivityPage"
import SingleActivityPage from "./pages/Activity/SingleActivityPage"
import UpdateActivity from "./pages/Activity/UpdateActivity"
import SingleResPersonPage from "./pages/resource-person/SingleResPersonPage"
import UpdateResPersonPage from "./pages/resource-person/UpdateResPersonPage"
import { CommitteeProvider } from "./context/committeeContext"
import CommitteesPage from "./pages/Committees/CommitteesPage"
import AddCommiteePage from "./pages/Committees/AddCommiteePage"
import SingleCommitteePage from "./pages/Committees/SingleCommitteePage"
import UpdateCommitteePage from "./pages/Committees/UpdateCommitteePage"
import SingleTagPage from "./pages/Tags/SingleTagPage"
import AddResoucePersonPage from "./pages/resource-person/AddResoucePersonPage"

const App = () => {
  return (
    <div>
      <UserProvider>
        <ResourcePersonProvider>
          <TagsProvider>
            <ActivityProvider>
              <CommitteeProvider>
                <ToastContainer
                  autoClose={2000}
                  position='top-center'
                  theme='colored'
                />
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route
                    path='/forgot-password'
                    element={<ForgotPasswordPage />}
                  />
                  {/* Secured routes */}
                  <Route path='/dashboard' element={<PrivateRoute />}>
                    <Route path='/dashboard' element={<DashboardPage />} />
                  </Route>
                  <Route path='/users' element={<UsersPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                  <Route path='/user/:id' element={<SingleUserPage />} />
                  <Route
                    path='/resource-person'
                    element={<ResourcePersonPage />}
                  />
                  <Route path='/add-resp' element={<AddResoucePersonPage />} />
                  <Route
                    path='/single-resp/:id'
                    element={<SingleResPersonPage />}
                  />
                  <Route
                    path='/update-resp/:id'
                    element={<UpdateResPersonPage />}
                  />
                  <Route path='/tags' element={<TagsPage />} />
                  <Route path='/tag/:id' element={<SingleTagPage />} />
                  <Route path='/add-activity' element={<AddActivityPage />} />
                  <Route path='/activities' element={<ActivityPage />} />
                  <Route
                    path='/activity/:id'
                    element={<SingleActivityPage />}
                  />
                  <Route
                    path='/update-activity/:id'
                    element={<UpdateActivity />}
                  />
                  <Route path='/committees' element={<CommitteesPage />} />
                  <Route
                    path='/single-committee/:id'
                    element={<SingleCommitteePage />}
                  />
                  <Route path='/add-committee' element={<AddCommiteePage />} />
                  <Route
                    path='/update-committee/:id'
                    element={<UpdateCommitteePage />}
                  />
                </Routes>
              </CommitteeProvider>
            </ActivityProvider>
          </TagsProvider>
        </ResourcePersonProvider>
      </UserProvider>
    </div>
  )
}

export default App
