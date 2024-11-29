/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";


export default function AuthPage() {
    const handleGoogleSignIn=async()=>{
        const supabase = await createClient();
        const { data , error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `http://localhost:3000/auth/callback`,
              },
          })
          if(error) throw error;
    }
        return (
      <>
        <div id="AuthPage" className="w-full min-h-screen bg-white">
            <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
                <Link href="/" className="min-w-[170px]">
                    <img width="170" src="/logo/vstocks1.png"/>
                </Link>
            </div>

            <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
                Login / Register
            </div>

            <div className="max-w-[400px] mx-auto px-2">
            <div className="flex items-center justify-center h-screen dark:bg-gray-800">
    <button onClick={handleGoogleSignIn} className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <FcGoogle size={24}/>
        <span>Login with Google</span>
    </button>
</div>
            </div>

        </div>
      </>
    )
  }
  