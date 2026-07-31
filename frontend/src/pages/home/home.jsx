import React, { useState } from 'react'
import Header from '../../components/Header/header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/foodDisplay/foodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import './home.css'

function Home() {
    const [category,setCategory] = useState("All") ; 
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home
