// File: SubscriptionSettings.jsx
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

  // Pagination state
  const [page, setPage] = useState(0) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5) // Rows per page

  const handleDelete = (index) => {
    console.log('Edit Subscription:', subscriptions[index])
    // Add Edit Logic
  }

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to the first page
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
      {/* Pagination controls */}
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
