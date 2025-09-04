// main.jsx
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Optional: Error Boundary for catching runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service if needed
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

// Get the root element and ensure it exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element with id "root" not found.')
}

// Render the application
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      {/* 
        If you use React Router or Helmet, wrap <App /> here.
        Example:
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      */}
      <App />
    </ErrorBoundary>
  </StrictMode>
)
