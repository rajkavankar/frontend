import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export const TagsSchema = [
  {
    Header: "Title",
    accessor: (row) => row.data.title,
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => {
      return (
        <>
          <Button
            variant='contained'
            color='info'
            component={Link}
            to={`/tag/${row.original.id}`}>
            View
          </Button>
        </>
      )
    },
  },
]
