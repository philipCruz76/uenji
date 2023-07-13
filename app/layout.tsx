import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Uenji',
  description: 'Professional services for your business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className,"antialiased")}>
        <NavBar />
        <main >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
