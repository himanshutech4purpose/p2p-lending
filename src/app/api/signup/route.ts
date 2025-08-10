import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, password } = body

    // Mock validation
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock user creation
    const user = {
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      createdAt: new Date().toISOString(),
      trustScore: 0,
      kycVerified: false
    }

    // Mock response
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user,
      otpSent: true
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
