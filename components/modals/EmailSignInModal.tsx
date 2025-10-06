'use client'

import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikErrors, FormikTouched } from 'formik'
import * as Yup from 'yup'
import { Mail, Lock, Eye, EyeOff, LucideIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import Button from '@/components/Button'
import { signUpWithEmail, signInWithEmail, setTokens } from '@/lib/auth'
import { useAuth } from '@/contexts/AuthContext'

interface EmailSignInModalProps {
    isOpen: boolean
    onClose: () => void
}

interface FormValues {
    email: string
    password: string
    confirmPassword: string
}

interface FormFieldProps {
    name: keyof FormValues
    label: string
    type?: string
    placeholder: string
    Icon: LucideIcon
    showPassword?: boolean
    onTogglePassword?: () => void
    errors: FormikErrors<FormValues>
    touched: FormikTouched<FormValues>
}

const FormField = ({
    name,
    label,
    type = 'text',
    placeholder,
    Icon,
    showPassword,
    onTogglePassword,
    errors,
    touched
}: FormFieldProps) => {
    const isPassword = type === 'password'
    const hasError = errors[name] && touched[name]

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="text-sm font-medium text-foreground">
                {label}
            </label>
            <div className="relative mt-2">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Field
                    type={isPassword && showPassword ? 'text' : type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className={`w-full pl-10 ${isPassword ? 'pr-12' : 'pr-4'} py-3 bg-secondary border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${hasError ? 'border-destructive' : 'border-border'
                        }`}
                />
                {isPassword && onTogglePassword && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            <ErrorMessage name={name} component="div" className="text-sm text-destructive" />
        </div>
    )
}

const EmailSignInModal = ({ isOpen, onClose }: EmailSignInModalProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const { login } = useAuth()

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        ...(isSignUp && {
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Please confirm your password'),
        }),
    })

    const handleSubmit = async (values: FormValues, { setSubmitting, setFieldError }: FormikHelpers<FormValues>) => {
        try {
            let response

            if (isSignUp) {
                response = await signUpWithEmail({
                    email: values.email,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                })
            } else {
                response = await signInWithEmail({
                    email: values.email,
                    password: values.password,
                })
            }

            // Store tokens
            setTokens(response.access_token, response.refresh_token)

            // Update auth context
            login()

            // Close modal on success
            onClose()
        } catch (error) {
            console.error('Authentication failed:', error)

            // Handle specific error cases
            if (error instanceof Error) {
                if (error.message.includes('email')) {
                    setFieldError('email', error.message)
                } else if (error.message.includes('password')) {
                    setFieldError('password', error.message)
                } else if (error.message.includes('confirm')) {
                    setFieldError('confirmPassword', error.message)
                } else {
                    // General error - you might want to show a toast or general error message
                    console.error('Authentication error:', error.message)
                }
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-foreground">
                        {isSignUp ? 'Create Account' : 'Sign In with Email'}
                    </DialogTitle>
                </DialogHeader>

                <Formik<FormValues>
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-4">
                            <FormField
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                Icon={Mail}
                                errors={errors}
                                touched={touched}
                            />

                            <FormField
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                Icon={Lock}
                                showPassword={showPassword}
                                onTogglePassword={() => setShowPassword(!showPassword)}
                                errors={errors}
                                touched={touched}
                            />

                            {isSignUp && (
                                <FormField
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Re-enter your password"
                                    Icon={Lock}
                                    showPassword={showConfirmPassword}
                                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                    errors={errors}
                                    touched={touched}
                                />
                            )}

                            {/* Forgot Password Link */}
                            {!isSignUp && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="sm"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        <span>Please wait...</span>
                                    </>
                                ) : (
                                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                                )}
                            </Button>

                            {/* Toggle Sign In/Sign Up */}
                            <div className="text-center pt-2">
                                <p className="text-sm text-muted-foreground">
                                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsSignUp(!isSignUp)}
                                        className="text-primary hover:underline font-medium cursor-pointer"
                                    >
                                        {isSignUp ? 'Sign In' : 'Sign Up'}
                                    </button>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>

                <DialogFooter className="sm:justify-center border-t border-border pt-4">
                    <p className="text-muted-foreground text-xs text-center">
                        By continuing, you agree to our{' '}
                        <a href="#" className="text-primary hover:underline">
                            Terms of Service
                        </a>
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EmailSignInModal

