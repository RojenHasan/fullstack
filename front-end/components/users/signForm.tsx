
import React, { use, useState } from 'react'
import StatusMessageParser from '../StatusMessageParser';
import { Button, Form } from "react-bootstrap"
import { User, StatusMessage } from '../../types';
import UserService from '@/service/UserService';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

type Props = {
  method: string,
  header: string
}

const Authentication: React.FC<Props> = ({ method, header }: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const validate = (): boolean => {
    let isValid = true
    setEmailError("")
    setPasswordError("")

    setStatusMessage(null)

    if (!email && email.trim() === "") {
      setEmailError("Email can't be empty")
      isValid = false
    }

    if (!password && password.trim() === "") {
      setPasswordError("Password can't be empty")
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (!validate()) {
      return
    }

    let response;
    const user: User = {
      email,
      password,
      role: 'user'
    }
    if (method === "login") {
      response = await UserService.login(user)
    } else if (method === "signup") {
      response = await UserService.signup(user)
    }
    const data = await response?.json()

    if (response?.status === 200) {
      if (method === "login") {
        setStatusMessage({
          type: "success",
          message: `Welcome ${email}`
        })
        router.push('/doctors');
        const token = data.token;
        const user = data.user;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));

      } else if (method === "signup") {
        setStatusMessage({
          type: "success",
          message: `User created`
        });
        router.push('/');
      }

    } else if (response?.status === 401) {
      setStatusMessage({
        type: "unauthorized",
        message: data.errorMessage
      })

    } else {
      setStatusMessage({
        type: "error",
        message: data.errorMessage
      })
    }
  }


  return (
    <>
      <article className="my-form-container col-4" >
        <h5>{header}</h5>
        {statusMessage !== null && (
          <StatusMessageParser statusMessage={statusMessage} />
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control id="email" type="text" value={email}
              onChange={(event) => { setEmail(event.target.value) }} />
            <Form.Text className="text-muted">
              {emailError && <div className="text-danger">{emailError}</div>}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" type="password" onChange={(event) => { setPassword(event.target.value) }} />
            <Form.Text className="text-muted">
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </Form.Text>
          </Form.Group>
          <Button variant="outline-primary" type="submit" style={{ color: 'black' }}>
           
            Submit
          </Button>
        </Form>
      </article>

    </>
  )
}

export default Authentication