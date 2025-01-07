import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export default function PlanContent() {
  React.useEffect(() => {
    AOS.init()
  }, [])
  const Navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState(null)
  const theme = useTheme()
  const [Cookies, SetCookies] = useCookies(['authToken', 'username'])
  const [plans, setPlans] = useState([])
  useEffect(() => {
    console.log(selectedCard)
    console.log(Cookies)
  }, [selectedCard, Cookies])
  const GetPlans = () => {
    axios
      .get('http://Movie-Star.test/api/Subscriptions', {
        headers: {
          Authorization: `Bearer ${Cookies.authToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data)
        setPlans(res.data.data)
      })
      .catch((err) => {
        console.log(err.data)
      })
  }
  useEffect(() => {
    GetPlans()
  }, [])
  /* const plans = [
    {
      id: 1,
      title: 'basic',
      price: 'EGP 70',
      quality: 'Good',
      resolution: '720p (HD)',

      popular: false,
    },
    {
      id: 2,
      title: 'Standard',
      price: 'EGP 120',
      quality: 'Great',
      resolution: '1080p (Full HD)',

      popular: false,
    },
    {
      id: 3,
      title: 'Premium',
      price: 'EGP 165',
      quality: 'Best',
      resolution: '4K (Ultra HD) + HDR',

      popular: true,
    },
  ] */

  const handleClick = (Selected) => {
    axios
      .post(
        'http://Movie-Star.test/api/SubscriptionDetails/pay',
        { id: Selected },
        {
          headers: { Authorization: `Bearer ${Cookies.authToken}` },
        }
      )
      .then((res) => {
        console.log(res.data)
        window.location.href = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCardClick = (id) => {
    setSelectedCard(id)
  }

  return (
    <div className="container my-5">
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        className="animate__animated animate__fadeInDown"
      >
        Step 1 of 3: Choose the plan that's right for you
      </Typography>
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={4} key={plan.id}>
            <Card
              sx={{
                minHeight: '500px',
                cursor: 'pointer',
                backgroundColor:
                  selectedCard === plan.id
                    ? theme.palette.custom.FoucsOverlay
                    : null, // Default color
                transform:
                  selectedCard === plan.id ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 1s, background-color 1s',
                boxShadow:
                  selectedCard === plan.id
                    ? '0px 4px 20px rgba(0, 0, 0, 0.2)'
                    : '0px 1px 5px rgba(0, 0, 0, 0.1)',
                border:
                  selectedCard === plan.id
                    ? `2px solid ${theme.palette.primary.dark}`
                    : 'none',
              }}
              onClick={() => handleCardClick(plan.id)}
              className={`${
                plan.popular
                  ? 'shadow-lg border-primary'
                  : 'shadow-lg border-primary'
              } animate__animated animate__fadeInUp`}
              data-aos="fade-up"
            >
              <CardContent
                sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
              >
                {plan.popular && (
                  <Chip
                    sx={{ width: '130px' }}
                    label="Most Popular"
                    color="primary"
                    size="small"
                    className="mb-2"
                  />
                )}
                <Typography
                  variant="h6"
                  align="center"
                  className="text-primary"
                >
                  {plan.name}
                </Typography>
                <Typography variant="h5" align="center" className="my-3">
                  <del> EGP {plan.price}</del>
                  {plan.discount > 0 && (
                    <span style={{ color: 'red', marginLeft: '8px' }}>
                      (-{(plan.discount * 100).toFixed(1)}%)
                    </span>
                  )}
                </Typography>
                <Typography
                  variant="h5"
                  color="green"
                  align="center"
                  className="my-3"
                >
                  EGP {(plan.price * (1 - plan.discount)).toFixed(2)}
                </Typography>
                <Typography variant="body2" className="text-center">
                  Subscription Period: <strong>{plan.period} months</strong>
                </Typography>
                <Typography variant="body2" className="text-center">
                  Video and sound quality: <strong>{plan.quality}</strong>
                </Typography>
                <Typography variant="body2" className="text-center">
                  Resolution: <strong>{plan.resolution}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="text-center mt-4">
        {selectedCard ? (
          <Button
            variant="contained"
            color="primary"
            className="px-5 py-2 animate__animated animate__rubberBand"
            size="large"
            onClick={() => {
              handleClick(selectedCard)
            }}
          >
            Next
          </Button>
        ) : null}
      </div>
    </div>
  )
}
