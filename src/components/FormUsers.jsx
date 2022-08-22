import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

// Value for default
let defaultValue = {
  first_name: '',
  last_name: '',
  birthday: '',
  email: '',
  password: ''
}

const FormUsers = ({getUsers, upgradeUser, setUpgradeUser, closeUser}) => {

// Capture from update info 
  useEffect(() => {
    if(upgradeUser){
      reset(upgradeUser)
    }
  }, [upgradeUser])


  // Create new user 

  let newUsers = data => {
    let URL = 'https://users-crud1.herokuapp.com/users/'
    //console.log(data)
    axios.post(URL, data)
    
      .then(res => {
      console.log(res.data)
      getUsers()
  }) 
  .catch(err => console.log(err))  
}



  // Update info from the API 
  let upgradeStaff = data => {
    let URL = `https://users-crud1.herokuapp.com/users/${upgradeUser.id}/`
    axios.patch(URL, data)
      .then(res => {
      console.log(res.data)
      getUsers()
    })
    .catch(err => console.log(err))
  }
  

  let {register, handleSubmit, reset} = useForm()

  let submit = data => {
    if(upgradeUser){
      upgradeStaff(data)
      setUpgradeUser()
    } else {
      newUsers(data)
    }
    reset(defaultValue)
    closeUser()
  }

  return (
    
    <form className='card__form' onSubmit={handleSubmit(submit)}>
      <div onClick={closeUser} className='form__close'><i className="fa-solid fa-xmark"></i></div>
      <h2 className='form__title'>{upgradeUser ? 'Update User Information' : 'Generate New User'}</h2>
        <ul className='form__list'>
            <li className='form__info'>
              <label htmlFor="first_name"><i className="fa-solid fa-address-card"></i> </label>
              <input {...register("first_name", { required: true, maxLength: 20 })} type="text" placeholder='First Name'/>
            </li>
            <li className='form__info'>
              {/* <label htmlFor="lastName">Last Name: </label> */}
              <input {...register("last_name", { required: true, minLength: 4 })} type="text" placeholder='Last Name' />
            </li>
          <li className='form__info'>
            <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i> </label>
            <input {...register("birthday")} type="date" placeholder='Birthday'/>
          </li>
          <li className='form__info'>
            <label htmlFor="email"><i className="fa-solid fa-envelope"></i> </label>
            <input {...register("email")} type="email" placeholder='Email' />
          </li>
          <li className='form__info'>
            <label htmlFor="password"><i className="fa-solid fa-lock"></i> </label>
            <input {...register("password")} type="password" placeholder='Password' />
          </li>
        </ul>
      
      <button className='form__btn'><i className="fa-solid fa-floppy-disk"></i> {upgradeUser ? 'Update' : 'Create'}</button>
    </form>
    
  )
}

export default FormUsers 