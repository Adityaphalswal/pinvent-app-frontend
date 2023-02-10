import React, { useState } from 'react'
import styles from "./auth.module.scss"
import {BiMailSend} from "react-icons/bi"
import Card from '../../components/card/card'
import { Link } from 'react-router-dom'
import { forgotPassword, validateEmail } from '../../services/authService'
import { toast } from 'react-toastify'

const Forgot = () => {
  const [email,setEmail] = useState("")

  const forgot = async (e) => {
    e.preventDefault()
    if(!email) {
      return toast.error("Please Enter a Email")
    }
    if(!validateEmail(email) ) {
      return toast.error("Please Enter a valid Email")
    }

    const userData = {email}

    await forgotPassword(userData)
    setEmail("")

  }
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiMailSend size={35} color="#999"/>
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input type="email" placeholder='Email' required name='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
            <button type='submit' className='--btn --btn-primary --btn-block'>Get Reset Email</button>
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

export default Forgot