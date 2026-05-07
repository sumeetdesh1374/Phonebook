import NavMenu from '@/components/navmenu';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }
  return (
    <html lang="en">
      <head>
        <title>Phone Book</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      </head>
      <body className="bg-gray-100">
      <NavMenu />
        
        {children}</body>
    </html>
  )
}