"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerificationExpiredPage() {
  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col justify-between">
      <header className="container mx-auto px-4 py-6 text-center">
        <Link href="/" className="inline-flex flex-col items-center space-y-2">
          <Image src="/logo.png" alt="Company Logo" width={60} height={60} />
          <span className="text-4xl font-bold text-white">FitnEarn</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md bg-neutral-700 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Verification Link Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6">
              Oops! It looks like your verification link has expired. Do not worry, we can help you get a new one.
            </p>
            <div className="space-y-4">
            <Link href="/" className="text-neutral-300  hover:text-white">

              <Button 
                className="w-full bg-gradient-to-r from-[#F43F5E] to-[#FB923C] hover:from-[#F43F5E] hover:to-[#FB923C]"
                onClick={() => {
                  // Add logic to request a new verification link
                  console.log("Requesting new verification link");
                }}
              >
                Request New Link
              </Button>
              </Link>
              <Link href="/contactUs" className="text-neutral-300  hover:text-white">

              <Button 
                variant="outline" 
                className="w-full mt-3 border-neutral-500 bg-neutral-700 text-white "
                onClick={() => {
                  // Add logic to contact support
                  console.log("Contacting support");
                }}
              >
                Contact Support
              </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/" className="text-neutral-300 hover:text-white">
            <Button 
              variant="link" 
              className="text-neutral-300 hover:text-white"
              onClick={() => {
                  // Add logic to return to homepage
                  console.log("Returning to homepage");
                }}
                >
              Return to Homepage
            </Button>
                </Link>
          </CardFooter>
        </Card>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-neutral-400">
        <nav className="space-x-4">
          <Link
            target="__blank"
            href="/privacy-policy"
            className="hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            target="__blank"
            href="/terms-and-conditions"
            className="hover:text-white"
          >
            Terms of Service
          </Link>
          <Link target="__blank" href="/contactUs" className="hover:text-white">
            Contact Us
          </Link>
        </nav>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Fitnearn. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

