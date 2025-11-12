import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { X } from 'lucide-react'

/* ----------------------------
   PROVIDER
----------------------------- */
export const ToastProvider = ToastPrimitives.Provider

/* ----------------------------
   VIEWPORT (posicionamento)
----------------------------- */
export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(function ToastViewport(props, ref) {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 
                 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      {...props}
    />
  )
})

/* ----------------------------
   ROOT DO TOAST
----------------------------- */
export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
    variant?: "default" | "destructive"
  }
>(function Toast({ variant = "default", className = "", ...props }, ref) {

  const base =
    "group pointer-events-auto relative flex w-full items-center justify-between " +
    "space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all " +
    "data-[state=open]:animate-in data-[state=closed]:animate-out " +
    "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full " +
    "data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full"

  const variants = {
    default: "bg-gray-900 text-white border-gray-800",
    destructive: "bg-red-600 text-white border-red-700"
  }

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  )
})

/* ----------------------------
   TITLE
----------------------------- */
export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(function ToastTitle({ className = "", ...props }, ref) {
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={`text-sm font-semibold ${className}`}
      {...props}
    />
  )
})

/* ----------------------------
   DESCRIPTION
----------------------------- */
export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(function ToastDesc({ className = "", ...props }, ref) {
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={`text-sm opacity-90 ${className}`}
      {...props}
    />
  )
})

/* ----------------------------
   CLOSE BUTTON
----------------------------- */
export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(function ToastClose({ className = "", ...props }, ref) {
  return (
    <ToastPrimitives.Close
      ref={ref}
      className={`absolute right-2 top-2 p-1 rounded-md text-white/50 hover:text-white transition-opacity ${className}`}
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  )
})

/* ----------------------------
   ACTION BUTTON
----------------------------- */
export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(function ToastAction({ className = "", ...props }, ref) {
  return (
    <ToastPrimitives.Action
      ref={ref}
      className={`inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium 
                  bg-transparent hover:bg-gray-800 transition-colors ${className}`}
      {...props}
    />
  )
})

/* TYPES */
export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
export type ToastActionElement = React.ReactElement<typeof ToastAction>
