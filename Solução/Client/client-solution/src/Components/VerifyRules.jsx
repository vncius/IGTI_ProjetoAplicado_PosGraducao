import React from 'react'
import { isAutheticated } from '../auth'

export default function VerifyRules({ needPermission, children, displayAuthenticated = true }) {
  const userAutheticated = isAutheticated();

  if ((needPermission && !userAutheticated) || (userAutheticated && !displayAuthenticated)) {
    return (<></>)
  }

  return (
    <>
      {children}
    </>
  )
}
