import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      recipient, 
      amount, 
      interestRate, 
      repaymentDate, 
      purpose, 
      collateralDetails,
      nomineeName,
      nomineeEmail,
      nomineePhone,
      files 
    } = body

    // Mock validation
    if (!recipient || !amount || !interestRate || !repaymentDate || !purpose) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock loan request creation
    const loanRequest = {
      id: Date.now().toString(),
      recipient,
      amount,
      interestRate,
      repaymentDate,
      purpose,
      collateralDetails,
      nominee: {
        name: nomineeName,
        email: nomineeEmail,
        phone: nomineePhone
      },
      files: files || [],
      status: 'pending',
      createdAt: new Date().toISOString(),
      sender: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      }
    }

    // Mock response
    return NextResponse.json({
      success: true,
      message: 'Loan request sent successfully',
      loanRequest
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
