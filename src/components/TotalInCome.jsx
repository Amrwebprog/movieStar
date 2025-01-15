import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { GlobalContext } from './GlobalContext'

export default function TotalInCome() {
  const { allSupscriptions, setAllSupscriptions, setSupscriptionUser } =
    useContext(GlobalContext)
  const [cookies] = useCookies(['authToken'])
  const [usernames, setUsernames] = useState({})
  const [subscriptions, setSubscriptions] = useState({}) // لتخزين تفاصيل الاشتراكات

  const columns = [
    { field: 'user_id', headerName: 'User ID' },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'subscription_id', headerName: 'Sub ID' },
    { field: 'subscription_name', headerName: 'Subscription Name', width: 200 },
    { field: 'price', headerName: 'Price' },
    { field: 'expiry_date', headerName: 'Expiry Date' },
  ]

  useEffect(() => {
    const GetAllSupscription = async () => {
      try {
        const res = await axios.get(
          `http://Movie-Star.test/api/SubscriptionDetails`,
          {
            headers: { Authorization: `Bearer ${cookies.authToken}` },
          }
        )
        const totalPages = res.data.data.last_page

        const requests = Array.from({ length: totalPages }, (_, index) =>
          axios.get(
            `http://Movie-Star.test/api/SubscriptionDetails?page=${index + 1}`,
            {
              headers: { Authorization: `Bearer ${cookies.authToken}` },
            }
          )
        )

        const responses = await Promise.all(requests)
        const allData = responses.flatMap((response) => response.data.data.data)

        const seen = new Set()
        const allUserSupp = [
          ...allData.filter((el) => {
            if (seen.has(el.user_id)) return false
            seen.add(el.user_id)
            return true
          }),
        ]

        setSupscriptionUser(allUserSupp.length)
        setAllSupscriptions(allData)

        // Fetch usernames
        const uniqueUserIds = allUserSupp.map((user) => user.user_id)
        const usernameRequests = uniqueUserIds.map((user_id) =>
          axios
            .get(`http://Movie-Star.test/api/Users/${user_id}`, {
              headers: { Authorization: `Bearer ${cookies.authToken}` },
            })
            .then((response) => ({
              user_id,
              username: response.data.data.username,
            }))
        )

        const usernameResponses = await Promise.all(usernameRequests)
        const usernameMap = usernameResponses.reduce((acc, user) => {
          acc[user.user_id] = user.username
          return acc
        }, {})
        setUsernames(usernameMap)

        // Fetch subscription details (name and price)
        const uniqueSubscriptionIds = [
          ...new Set(allData.map((sub) => sub.subscription_id)),
        ]
        const subscriptionRequests = uniqueSubscriptionIds.map(
          (subscription_id) =>
            axios
              .get(
                `http://Movie-Star.test/api/Subscriptions/${subscription_id}`,
                {
                  headers: { Authorization: `Bearer ${cookies.authToken}` },
                }
              )
              .then((response) => ({
                subscription_id,
                subscription_name: response.data.data.name,
                price: response.data.data.price,
              }))
        )

        const subscriptionResponses = await Promise.all(subscriptionRequests)
        const subscriptionMap = subscriptionResponses.reduce((acc, sub) => {
          acc[sub.subscription_id] = {
            name: sub.subscription_name,
            price: sub.price,
          }
          return acc
        }, {})
        setSubscriptions(subscriptionMap)
      } catch (err) {
        console.error(err)
      }
    }

    GetAllSupscription()
  }, [cookies, setAllSupscriptions])

  return (
    <Box>
      <Paper
        elevation={24}
        sx={{
          padding: '40px',
          marginBottom: '20px',
          width: '100%',

          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">User Subscriptions</Typography>
          <FontAwesomeIcon
            icon={faDollarSign}
            style={{
              color: 'green',
              fontSize: '30px',
              background: 'gray',
              padding: '10px',
              marginRight: '50px',
            }}
          />
        </Box>
        {
          <div
            style={{
              height: 374,
              width: '100%',

              marginTop: '20px',
            }}
          >
            <DataGrid
              rows={allSupscriptions.map((row, index) => ({
                ...row,
                id: index + 1,
                username: usernames[row.user_id] || 'Loading...',
                subscription_name:
                  subscriptions[row.subscription_id]?.name || 'Loading...',
                price:
                  subscriptions[row.subscription_id]?.price || 'Loading...',
              }))}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              disableColumnFilter={false}
              disableColumnMenu={false}
              sx={{
                border: 0,
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f5f5f5',
                  fontWeight: 'bold',
                },
              }}
            />
          </div>
        }
      </Paper>
    </Box>
  )
}
