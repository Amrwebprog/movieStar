import axios from 'axios'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useLoader from '../../components/CustomHook'
import NavBar2 from '../../components/NavBar2'

export default function NewPlan() {
  const Navigate = useNavigate()
  const { loading, setLoading, Loader } = useLoader()
  const fullUrl = window.location.href
  console.log(fullUrl.split('='))
  const id = fullUrl.split('=')[1]
  console.log(id)
  const [cookies] = useCookies(['authToken', 'username'])
  const pay = () => {
    setLoading(true)
    axios
      .post(
        `http://movie-star.test/api/SubscriptionDetails/store?session_id=${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.authToken}` },
        }
      )
      .then((res) => {
        console.log(cookies.authToken)
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Succesfully',
          text: res.data.message,
        })
        Navigate('/category')
      })
      .catch((err) => {
        console.log(cookies.authToken)
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    pay()
  }, [])
  return (
    <div>
      {Loader}
      <NavBar2 />
    </div>
  )
}
