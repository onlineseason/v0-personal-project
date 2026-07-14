'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the full error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Boundary] Full error details:', {
        name: error.name,
        message: error.message,
        digest: error.digest,
        stack: error.stack,
      })
    } else {
      // In production, log only the digest for debugging
      console.error('[Error Boundary] Error occurred:', {
        digest: error.digest,
        message: error.message,
      })
    }
  }, [error])

  const isDatabaseError = error.message?.includes('Supabase') || 
                          error.message?.includes('database') ||
                          error.message?.includes('RLS')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {isDatabaseError ? 'Database Error' : 'Something went wrong'}
          </h2>
          
          {process.env.NODE_ENV === 'development' ? (
            <div className="mt-4 text-left bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-destructive mb-2">Development Error Details:</p>
              <p className="text-xs text-destructive/80 font-mono break-words mb-2">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-destructive/60 font-mono">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-muted-foreground">
              {isDatabaseError 
                ? 'We&apos;re having trouble loading data. This has been reported.'
                : 'An unexpected error occurred. Please try again.'}
            </p>
          )}

          {isDatabaseError && (
            <div className="mt-4 text-xs text-muted-foreground bg-muted/50 rounded p-3 text-left">
              <p className="font-semibold mb-1">Troubleshooting:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Check that Supabase tables are created</li>
                <li>Verify RLS policies allow public reads</li>
                <li>Confirm NEXT_PUBLIC_SUPABASE_URL is set</li>
              </ul>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <button
              onClick={() => reset()}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors block text-center"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
