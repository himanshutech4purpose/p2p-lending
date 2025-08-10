"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Shield, 
  ArrowLeft, 
  User, 
  DollarSign, 
  Calendar,
  FileText,
  Upload,
  Users,
  Send
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const loanRequestSchema = z.object({
  recipient: z.string().min(1, 'Recipient is required'),
  amount: z.number().min(100, 'Minimum amount is $100'),
  interestRate: z.number().min(0).max(50, 'Interest rate must be between 0-50%'),
  repaymentDate: z.string().min(1, 'Repayment date is required'),
  purpose: z.string().min(10, 'Please provide a detailed purpose'),
  collateralDetails: z.string().optional(),
  nomineeName: z.string().optional(),
  nomineeEmail: z.string().email().optional().or(z.literal('')),
  nomineePhone: z.string().optional(),
})

type LoanRequestForm = z.infer<typeof loanRequestSchema>

export default function LoanRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoanRequestForm>({
    resolver: zodResolver(loanRequestSchema)
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: LoanRequestForm) => {
    setIsSubmitting(true)
    try {
      // Mock API call
      const response = await fetch('/api/send-loan-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          files: uploadedFiles.map(f => f.name)
        })
      })

      if (response.ok) {
        toast.success('Loan request sent successfully!')
        router.push('/dashboard')
      } else {
        toast.error('Failed to send loan request')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">New Loan Request</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <span>Loan Request Details</span>
              </CardTitle>
              <CardDescription>
                Send a loan request to friends, family, or verified lenders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Recipient */}
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="recipient"
                      {...register('recipient')}
                      placeholder="Email, phone, or referral code"
                      className="pl-10"
                    />
                  </div>
                  {errors.recipient && (
                    <p className="text-sm text-red-500">{errors.recipient.message}</p>
                  )}
                </div>

                {/* Amount and Interest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="amount"
                        type="number"
                        {...register('amount', { valueAsNumber: true })}
                        placeholder="0.00"
                        className="pl-10"
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-sm text-red-500">{errors.amount.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      {...register('interestRate', { valueAsNumber: true })}
                      placeholder="5.0"
                    />
                    {errors.interestRate && (
                      <p className="text-sm text-red-500">{errors.interestRate.message}</p>
                    )}
                  </div>
                </div>

                {/* Repayment Date */}
                <div className="space-y-2">
                  <Label htmlFor="repaymentDate">Repayment Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="repaymentDate"
                      type="date"
                      {...register('repaymentDate')}
                      className="pl-10"
                    />
                  </div>
                  {errors.repaymentDate && (
                    <p className="text-sm text-red-500">{errors.repaymentDate.message}</p>
                  )}
                </div>

                {/* Purpose */}
                <div className="space-y-2">
                  <Label htmlFor="purpose">Loan Purpose</Label>
                  <Textarea
                    id="purpose"
                    {...register('purpose')}
                    placeholder="Describe the purpose of this loan..."
                    rows={3}
                  />
                  {errors.purpose && (
                    <p className="text-sm text-red-500">{errors.purpose.message}</p>
                  )}
                </div>

                {/* Collateral Details */}
                <div className="space-y-2">
                  <Label htmlFor="collateralDetails">Collateral Details (Optional)</Label>
                  <Textarea
                    id="collateralDetails"
                    {...register('collateralDetails')}
                    placeholder="Describe any collateral you're offering..."
                    rows={2}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Collateral Documents (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Upload supporting documents
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>Choose Files</span>
                      </Button>
                    </label>
                  </div>
                  
                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Uploaded Files:</p>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Nominee Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Nominee Details (Optional)</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomineeName">Nominee Name</Label>
                      <Input
                        id="nomineeName"
                        {...register('nomineeName')}
                        placeholder="Full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nomineeEmail">Nominee Email</Label>
                      <Input
                        id="nomineeEmail"
                        type="email"
                        {...register('nomineeEmail')}
                        placeholder="email@example.com"
                      />
                      {errors.nomineeEmail && (
                        <p className="text-sm text-red-500">{errors.nomineeEmail.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label htmlFor="nomineePhone">Nominee Phone</Label>
                    <Input
                      id="nomineePhone"
                      type="tel"
                      {...register('nomineePhone')}
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Link href="/dashboard">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button type="submit" disabled={isSubmitting}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Sending Request...' : 'Send Loan Request'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
