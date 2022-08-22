import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import NewUsers from './components/NewUsers'

function App() {
  
const [users, setUsers] = useState()
const [upgradeUser, setUpgradeUser] = useState()
const [newCard, setNewCard] = useState(false)


// get data from the API
let getUsers = () => {
  let URL = 'https://users-crud1.herokuapp.com/users/'
  axios.get(URL)
  .then(res => setUsers(res.data))
  .catch(err => console.log(err))
}

// Capture data from the API for the first render
useEffect(() => {
  getUsers()
}, [])


// Funcionalidad del Modal 

let openUser = () => setNewCard(true)
let closeUser = () => {
  setNewCard(false)
  setUpgradeUser()
}


  return (
    <div className="App">
      <h1>Management Users</h1>
      <button className='form__user' onClick={openUser}>Create User</button>
      <div className={newCard ? 'form__container' : 'form__none'}>
        <FormUsers
        getUsers={getUsers}
        upgradeUser={upgradeUser}
        setUpgradeUser={setUpgradeUser}
        closeUser={closeUser}
        />
      </div>
      <div className='card__container'>
        {
          users?.map(user => (
            <NewUsers
            key={user.id}
            user={user}
            getUsers={getUsers}
            setUpgradeUser={setUpgradeUser}
            openUser={openUser}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
