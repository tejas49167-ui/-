import { useEffect, useState } from 'react'
import './List.css'

const List = ({ url }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    const response = await fetch(`${url}/api/food/list`)
    const result = await response.json()

    if (result.success) {
      setList(result.data)
    } else {
      alert('Error')
    }
  }

  const removeFood = async (foodId) => {
    const response = await fetch(`${url}/api/food/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: foodId }),
    })
    const result = await response.json()

    if (result.success) {
      await fetchList()
    } else {
      alert('Error')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">x</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
