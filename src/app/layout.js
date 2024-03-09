import './globals.css'

export const metadata = {
  title: 'Quiz App',
  description: 'Simple Quiz App Developed By jr. Front End Developer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
