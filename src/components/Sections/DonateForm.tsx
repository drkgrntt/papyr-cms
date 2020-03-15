import React, { useState, useContext } from 'react'
import axios from 'axios'
import userContext from '../../context/userContext'
import CreditCardForm from '../CreditCardForm'
import Input from '../Input'

type Props = {
  className: string
}

const DonateForm = (props: Props) => {

  const { currentUser } = useContext(userContext)
  const { className } = props
  const [email, setEmail] = useState(currentUser ? currentUser.email : '')
  const [amount, setAmount] = useState(1.00)
  const [paid, setPaid] = useState(false)


  const handleSubmit = (
    source: stripe.Source,
    setProcessing: React.Dispatch<React.SetStateAction<boolean>>,
    setValidation: React.Dispatch<React.SetStateAction<string>>
  ) => {

    switch (true) {

      case amount < 1:
        setValidation('You must donate at least 1 dollar.')
        setProcessing(false)
        return

      case email === '':
        setValidation('Please enter your email.')
        setProcessing(false)
        return

      default:
        const donationData = {
          source,
          amount,
          email,
        }

        axios.post('/api/utility/donate', donationData)
          .then(response => {
            if (response.data.status === 'succeeded') {
              setPaid(true)
            }
          })
          .catch(error => {
            console.error(error)
            setValidation('Something went wrong. Please try again later.')
            setProcessing(false)
          })
    }
  }

  if (paid) {
    return (
      <div className={`donate-form ${className}`}>
        <div className="donate-form__thanks">
          <h3 className="heading-tertiary">Thank you for your donation!</h3>
          <p>You will recieve a reciept of your donation via the email you submitted shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <section className={`donate-form ${className}`}>
      <form className="donate-form__form">
        <div className="u-form-row">
          <Input
            id="donation_email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(event: React.ChangeEvent<HTMLFormElement>) => setEmail(event.target.value)}
          />

          <Input
            id="donation_amount"
            label="Amount"
            type="number"
            required
            value={amount}
            onChange={(event: React.ChangeEvent<HTMLFormElement>) => setAmount(event.target.value)}
          />
        </div>

        <CreditCardForm onSubmit={handleSubmit} />
      </form>
    </section>
  )
}


export default DonateForm
