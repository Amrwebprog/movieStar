import React from 'react'
import { useParams } from 'react-router-dom'
import ShowMatches from '../../components/ShowMatches'
import ShowMovie from '../../components/ShowMovie'
import ShowSeries from '../../components/ShowSeries'

export default function ProductPage() {
  const { ProductType, ProductId } = useParams()
  const ShowPage = () => {
    if (ProductType === 'Films') {
      return <ShowMovie />
    }
    if (ProductType === 'Series') {
      return <ShowSeries />
    }
    if (ProductType === 'Matches') {
      return <ShowMatches />
    }
  }
  return <>{ShowPage()}</>
}
