import axios from 'axios'
import React from 'react'


const NewUsers = ({user, getUsers, setUpgradeUser, openUser}) => {
  
  let deleteUser = () => {
    let URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
    axios.delete(URL)
    .then(res => {
      console.log(res.data)
      getUsers()
    })
    .catch(err => console.log(err))
  }

  let handleUpgrade = () => {
    setUpgradeUser(user)
    openUser()
  }
 
 //-console.log(user) 


  return (
    <article className='principal__card'>
      <h3 className='card__names'>{`${user['first_name']} ${user['last_name']}`}</h3>
      <ul className='card__content'>
        <li className='card__list'><span>Email: </span>{user['email']}</li>
        <li className='card__list'><span>Birthday: </span>{user['birthday']}</li>
      </ul>
      <div className='principal__btn'>
        <button onClick={handleUpgrade} className='card__btn'><i className="fa-solid fa-user-pen"></i> Edit</button>
        <button onClick={deleteUser} className='card__btn'><i className="fa-solid fa-trash"></i> Delete</button>
      </div>
    </article>
  )
}

export default NewUsers