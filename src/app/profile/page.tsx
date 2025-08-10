"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock,
  Award,
  Shield,
  Users,
  FileText,
  Settings
} from 'lucide-react'

// Mock data
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  trustScore: 4.8,
  totalLoans: 12,
  completedLoans: 10,
  defaultedLoans: 0,
  totalLent: 25000,
  totalBorrowed: 15000,
  memberSince: '2023-01-15',
  kycVerified: true,
  socialLinked: true
}

const mockLoanHistory = [
  {
    id: '1',
    type: 'lent',
    amount: 5000,
    recipient: 'Alice Smith',
    status: 'completed',
    interest: 8.5,
    date: '2024-01-15',
    rating: 5
  },
  {
    id: '2',
    type: 'borrowed',
    amount: 3000,
    lender: 'Bob Johnson',
    status: 'completed',
    interest: 6.0,
    date: '2023-12-01',
    rating: 4
  },
  {
    id: '3',
    type: 'lent',
    amount: 2000,
    recipient: 'Carol Wilson',
    status: 'active',
    interest: 7.0,
    date: '2024-01-20',
    rating: null
  }
]

const mockReviews = [
  {
    id: '1',
    reviewer: 'Alice Smith',
    rating: 5,
    comment: 'Great lender! Very reliable and professional.',
    date: '2024-01-15'
  },
  {
    id: '2',
    reviewer: 'Bob Johnson',
    rating: 4,
    comment: 'Good communication and fair terms.',
    date: '2023-12-01'
  },
  {
    id: '3',
    reviewer: 'Carol Wilson',
    rating: 5,
    comment: 'Excellent experience, highly recommended!',
    date: '2023-11-15'
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'reviews'>('overview')

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      negotiating: 'default',
      active: 'default',
      completed: 'secondary',
      defaulted: 'destructive'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your lending profile and reputation</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>{mockUser.name}</CardTitle>
                <CardDescription>{mockUser.email}</CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  {renderStars(Math.floor(mockUser.trustScore))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    ({mockUser.trustScore})
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Phone</span>
                  <span className="text-sm font-medium">{mockUser.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="text-sm font-medium">
                    {new Date(mockUser.memberSince).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">KYC Status</span>
                  <Badge variant={mockUser.kycVerified ? 'default' : 'destructive'}>
                    {mockUser.kycVerified ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Social Linked</span>
                  <Badge variant={mockUser.socialLinked ? 'default' : 'secondary'}>
                    {mockUser.socialLinked ? 'Connected' : 'Not Connected'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Trust Score Breakdown */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span>Trust Score Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Loan Completion Rate</span>
                  <span className="text-sm font-medium">
                    {Math.round((mockUser.completedLoans / mockUser.totalLoans) * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">On-time Payments</span>
                  <span className="text-sm font-medium">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Default Rate</span>
                  <span className="text-sm font-medium text-green-600">0%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(4)}
                    <span className="text-sm font-medium ml-1">(4.0)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUser.totalLoans}</div>
                  <p className="text-xs text-muted-foreground">
                    {mockUser.completedLoans} completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Lent</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockUser.totalLent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all loans
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockUser.totalBorrowed.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    From lenders
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockUser.totalLoans - mockUser.completedLoans}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently active
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 mb-6">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </Button>
              <Button
                variant={activeTab === 'history' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('history')}
              >
                Loan History
              </Button>
              <Button
                variant={activeTab === 'reviews' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({mockReviews.length})
              </Button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Loan completed with Alice Smith</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">2 days ago</p>
                      </div>
                      <span className="text-sm font-medium">$5,000</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New loan request received</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">1 week ago</p>
                      </div>
                      <span className="text-sm font-medium">$3,000</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Trust score increased</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">2 weeks ago</p>
                      </div>
                      <span className="text-sm font-medium">+0.2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'history' && (
              <Card>
                <CardHeader>
                  <CardTitle>Loan History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLoanHistory.map((loan) => (
                      <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold">${loan.amount.toLocaleString()}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {loan.type === 'lent' ? `To ${loan.recipient}` : `From ${loan.lender}`}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              {getStatusBadge(loan.status)}
                              <span className="text-xs text-gray-500">
                                {loan.interest}% interest
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(loan.date).toLocaleDateString()}
                          </p>
                          {loan.rating && (
                            <div className="flex items-center space-x-1 mt-1">
                              {renderStars(loan.rating)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'reviews' && (
              <Card>
                <CardHeader>
                  <CardTitle>Reviews from Lenders & Borrowers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{review.reviewer}</h3>
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {review.comment}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
