import { Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { GlobalContext } from './GlobalContext'

export default function SupscriptionDetailsChart() {
  const [cookies] = useCookies(['authToken'])
  const { allNumber, SupcriptionUser } = useContext(GlobalContext)

  const chartData = [
    { name: 'Total Users', value: allNumber?.userNumber || 0 },
    { name: 'Subscribed Users', value: SupcriptionUser || 0 },
  ]

  return (
    <Paper elevation={24} sx={{ padding: '40px' }}>
      <Typography variant="h5" gutterBottom>
        User Subscription Details
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}
