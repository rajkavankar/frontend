import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export const ResourcePersonSchema = [
  {
    Header: "Name",
    accessor: (row) => row.data.name,
  },
  {
    Header: "Designation",
    accessor: (row) => row.data.designation,
  },

  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => {
      return (
        <>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to={`/single-resp/${row.original.id}`}>
            View
          </Button>
        </>
      )
    },
  },
]
