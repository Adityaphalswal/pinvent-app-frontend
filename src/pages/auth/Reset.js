import React, { useState } from 'react'
import styles from "./auth.module.scss"
import {MdPassword} from "react-icons/md"
import Card from '../../components/card/card'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPassword } from '../../services/authService'

const initialState= {
  password:"",
  confirmPassword:""
}

const Reset = () => {
  const [formData, setformData] = useState(initialState)
  const {password,confirmPassword} = formData

  const {resetToken} = useParams()

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setformData({...formData, [name] : value})
  };

  const reset = async (e) => {
    e.preventDefault()
    if(password.length < 8 ) {
      return toast.error("Password must be greater than 8 characters")
    }
    if(password !== confirmPassword ) {
      return toast.error("Password do not match!")
    }

    const userData = {
      password,confirmPassword
    }

    try {
      const data = await resetPassword(userData,resetToken)
      toast.success(data.message)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999"/>
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <input type="password" placeholder='New Password' required name='password' value={password} onChange={handleInputChange} />
            <input type="password" placeholder='Confirm New Password' required name='confirmPassword' value={confirmPassword} onChange={handleInputChange} />
            <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
            <div className={styles.links}>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Reset