"use client"
import Image from "next/image";
import { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function UnsubscribePage() {
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Enter valid email address!",
        description: "",
        duration: 3000, // 3 seconds
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/newsletter-delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (response.ok) {
        toast({
          title: "Successfully unsubscribed to newsletter!",
          description: "",
          duration: 3000, // 3 seconds
        });
        setEmail(""); // Clear the input field
      } else {
        const errorData = await response.json();
        console.log(errorData)
        toast({
          title: "Email not found!",
          description: "",
          duration: 3000, // 3 seconds
        });
      }
    } catch (error) {
      toast({
        title: "Error occured!",
        description: "",
        duration: 3000, // 3 seconds
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col justify-between font-Lato">
      <header className="container mx-auto px-4 py-6 text-center">
        <Link href="/" className="inline-flex flex-col items-center space-y-2">
          <Image src="/logo.png" alt="Company Logo" width={60} height={60} />
          <span className="text-4xl font-bold text-white">FitnEarn</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md bg-neutral-800 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Unsubscribe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6">
              We&apos;re sorry to see you go. Please confirm your email address
              to unsubscribe from our newsletter.
            </p>
            <form className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-neutral-600 border-neutral-500 text-white placeholder-neutral-400"
              />
              <Button
               onClick={handleUnsubscribe}
                className="w-full bg-gradient-to-r from-[#F43F5E] to-[#FB923C] hover:from-[#F43F5E] hover:to-[#FB923C]"
              >
                Confirm Unsubscribe
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              className="text-neutral-300 hover:text-white"
            >
              Changed your mind? Keep me subscribed
            </Button>
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
  );
}
