import React from 'react'
import FadeIn from 'react-fade-in';

export default function EfeitoFade({ children }) {
  return (
    <FadeIn style={{ height: '100%' }} delay={200} transitionDuration={2000}>
      {children}
    </FadeIn>
  )
}
