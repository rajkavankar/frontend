import React from "react"
import {
  FaHome,
  FaUserAlt,
  FaUsers,
  FaUserGraduate,
  FaTags,
  FaServer,
  FaNotesMedical,
} from "react-icons/fa"

const SidebarSchema = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <FaHome size={"1.5rem"} />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <FaUsers size={"1.5rem"} />,
  },
  {
    title: "Activities",
    path: "/activities",
    icon: <FaServer size={"1.5rem"} />,
  },
  {
    title: "Committees",
    path: "/committees",
    icon: <FaNotesMedical size={"1.5rem"} />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaUserAlt size={"1.5rem"} />,
  },
  {
    title: "Resource person",
    path: "/resource-person",
    icon: <FaUserGraduate size={"1.5rem"} />,
  },
  {
    title: "Tags",
    path: "/tags",
    icon: <FaTags size={"1.5rem"} />,
  },
]

export default SidebarSchema
