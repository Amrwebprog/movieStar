import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import React, { useState } from 'react'

export default function SubscriptionSettings({ subscriptionData }) {
  const [subscriptions, setSubscriptions] = useState(subscriptionData)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleDelete = (index) => {
    console.log('Edit Subscription:', subscriptions[index])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Show only rows for the current page */}
          {subscriptions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((sub, index) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.id}</TableCell>
                <TableCell>{sub.expiry_date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={subscriptions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  )
}
