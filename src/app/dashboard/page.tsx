"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Clock,
  Star,
  Plus,
  ArrowRight,
  MessageSquare,
  FileText,
  Settings
} from 'lucide-react'

// Mock data
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  trustScore: 4.8,
  totalLoans: 12,
  activeLoans: 3,
  totalLent: 25000,
  totalBorrowed: 15000
}

const mockLoans = [
  {
    id: '1',
    type: 'sent',
    amount: 5000,
    recipient: 'Alice Smith',
    status: 'active',
    interest: 8.5,
    dueDate: '2024-02-15',
    transactionHash: '0x1234...5678'
  },
  {
    id: '2',
    type: 'received',
    amount: 3000,
    lender: 'Bob Johnson',
    status: 'negotiating',
    interest: 6.0,
    dueDate: '2024-03-01',
    transactionHash: null
  },
  {
    id: '3',
    type: 'sent',
    amount: 2000,
    recipient: 'Carol Wilson',
    status: 'completed',
    interest: 7.0,
    dueDate: '2024-01-20',
    transactionHash: '0x8765...4321'
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sent' | 'received'>('overview')

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">P2P Loan</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Loan
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUser.trustScore}</div>
              <p className="text-xs text-muted-foreground">
                +0.2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lent</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockUser.totalLent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across {mockUser.totalLoans} loans
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
                From various lenders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUser.activeLoans}</div>
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
            variant={activeTab === 'sent' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('sent')}
          >
            Sent ({mockLoans.filter(l => l.type === 'sent').length})
          </Button>
          <Button
            variant={activeTab === 'received' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('received')}
          >
            Received ({mockLoans.filter(l => l.type === 'received').length})
          </Button>
        </div>

        {/* Loans List */}
        <div className="space-y-4">
          {mockLoans
            .filter(loan => activeTab === 'overview' || loan.type === activeTab)
            .map((loan) => (
              <Card key={loan.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          ${loan.amount.toLocaleString()}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {loan.type === 'sent' ? `To ${loan.recipient}` : `From ${loan.lender}`}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusBadge(loan.status)}
                          <span className="text-xs text-gray-500">
                            {loan.interest}% interest
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {loan.transactionHash && (
                        <Badge variant="outline" className="text-xs font-mono">
                          {loan.transactionHash}
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/loan-request">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Send Loan Request</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Request a loan from friends or family
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">View Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check your trust score and history
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Active Chats</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Continue loan negotiations
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
