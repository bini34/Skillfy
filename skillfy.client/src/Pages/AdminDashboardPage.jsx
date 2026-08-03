import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import useAuthStore from '../store/authStore';

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <Header color="black" />
      <main className="page-container py-10 min-h-screen">
        <div className="mb-8">
          <h1 className="section-heading">Admin Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome back, {user?.Fname || 'Admin'}.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Users', value: '—', color: 'bg-blue-50 text-blue-700' },
            { label: 'Total Courses', value: '—', color: 'bg-purple-50 text-purple-700' },
            { label: 'Enrollments', value: '—', color: 'bg-green-50 text-green-700' },
            { label: 'Revenue', value: '—', color: 'bg-yellow-50 text-yellow-700' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card p-6">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className={`mt-2 text-3xl font-bold ${color} inline-block px-2 py-0.5 rounded`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin Features</h2>
          <p className="text-sm text-gray-500">
            User management, course moderation, and analytics are coming soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
