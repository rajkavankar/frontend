import { Button, Chip } from "@mui/material"
import { Link } from "react-router-dom"
import TagFilter from "../components/TagFilter"

export const ActivitySchema = [
  {
    Header: "Title",
    accessor: (row) => row.data.activity_title,
  },
  {
    Header: "Type",
    accessor: (row) => row.data.activity_type,
  },
  {
    Header: "Status",
    accessor: (row) => (
      <>
        {row.data.status === "upcoming" ? (
          <Chip label={row.data.status} color='info' size='small' />
        ) : row.data.status === "completed" ? (
          <Chip label={row.data.status} color='success' size='small' />
        ) : (
          row.data.status === "cancelled" && (
            <Chip label={row.data.status} color='error' size='small' />
          )
        )}
      </>
    ),
    Filter: TagFilter,
  },

  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => {
      return (
        <>
          <Button
            component={Link}
            to={`/activity/${row.original.id}`}
            variant='contained'
            color='primary'
            sx={{ mr: 2 }}>
            View
          </Button>
        </>
      )
    },
  },
]
