import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './List.css'

const List = ({ url }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    const result = response.data

    if (result.success) {
      setList(result.data)
    } else {
      toast.error('Error')
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
    const result = response.data

    if (result.success) {
      await fetchList()
      toast.success(result.message)
    } else {
      toast.error('Error')
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
