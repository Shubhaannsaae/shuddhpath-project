import { SessionProvider } from '@/app/components/auth/SessionProvider'

export default function MainLayout({
  dashboard,
  map,
}: {
  dashboard: React.ReactNode
  map: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="h-screen flex">
        <div className="w-80 bg-white shadow-lg border-r overflow-y-auto">
          {dashboard}
        </div>
        <div className="flex-1 relative">
          {map}
        </div>
      </div>
    </SessionProvider>
  )
}
