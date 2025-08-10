"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Send, 
  DollarSign, 
  Calendar, 
  User, 
  MessageSquare,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock data
const mockLoan = {
  id: '1',
  amount: 5000,
  interest: 8.5,
  dueDate: '2024-02-15',
  status: 'negotiating',
  borrower: 'Alice Smith',
  lender: 'John Doe',
  purpose: 'Home renovation project',
  transactionHash: null
}

const mockMessages = [
  {
    id: '1',
    sender: 'lender',
    message: 'Hi Alice, I received your loan request for $5,000. Can we discuss the terms?',
    timestamp: '2024-01-15T10:00:00Z',
    type: 'text'
  },
  {
    id: '2',
    sender: 'borrower',
    message: 'Hi John! Yes, I need this for home renovation. I can offer 8.5% interest and will repay by Feb 15th.',
    timestamp: '2024-01-15T10:05:00Z',
    type: 'text'
  },
  {
    id: '3',
    sender: 'lender',
    message: 'That sounds reasonable. Can you provide some collateral details?',
    timestamp: '2024-01-15T10:10:00Z',
    type: 'text'
  },
  {
    id: '4',
    sender: 'borrower',
    message: 'I can offer my car as collateral. It\'s worth about $8,000.',
    timestamp: '2024-01-15T10:15:00Z',
    type: 'text'
  }
]

export default function ChatPage() {
  const params = useParams()
  const loanId = params.loanId as string
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      sender: 'lender', // Mock: current user is lender
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    setIsTyping(true)

    // Simulate typing indicator
    setTimeout(() => {
      setIsTyping(false)
      // Mock response
      const response = {
        id: (Date.now() + 1).toString(),
        sender: 'borrower',
        message: 'Thanks for the clarification. I agree to the terms.',
        timestamp: new Date().toISOString(),
        type: 'text'
      }
      setMessages(prev => [...prev, response])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const acceptLoan = () => {
    toast.success('Loan accepted! Smart contract will be created.')
    // Mock API call to accept loan
  }

  const rejectLoan = () => {
    toast.error('Loan rejected.')
    // Mock API call to reject loan
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
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
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Loan Negotiation
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Loan ID: {loanId}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {mockLoan.status.charAt(0).toUpperCase() + mockLoan.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Messages */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span>Chat with {mockLoan.borrower}</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'lender' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'lender'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'lender' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mockLoan.borrower} is typing...
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Loan Details Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Loan Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                    <p className="font-semibold">${mockLoan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interest</p>
                    <p className="font-semibold">{mockLoan.interest}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Due Date</p>
                    <p className="font-semibold">{new Date(mockLoan.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <Badge variant="secondary">{mockLoan.status}</Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Purpose</p>
                  <p className="text-sm">{mockLoan.purpose}</p>
                </div>

                {mockLoan.transactionHash && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transaction Hash</p>
                    <p className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {mockLoan.transactionHash}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={acceptLoan} className="w-full" variant="default">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept Loan
                </Button>
                <Button onClick={rejectLoan} className="w-full" variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Loan
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
