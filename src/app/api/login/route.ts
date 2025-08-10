import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Mock validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Mock authentication
    if (email === 'john@example.com' && password === 'password123') {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          id: '1',
          email,
          fullName: 'John Doe',
          trustScore: 4.8
        },
        otpSent: true
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
