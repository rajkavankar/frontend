import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export const CommitteeSchema = [
  {
    Header: "Title",
    accessor: (row) => row.data.title,
  },
  {
    Header: "Members",
    accessor: (row) => row.data.members.length,
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
            to={`/single-committee/${row.original.id}`}>
            View
          </Button>
        </>
      )
    },
  },
]
