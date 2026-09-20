import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminSettings() {

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Settings
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-navy-primary mb-4">
                  Account Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-dark mb-2">
                      Name
                    </label>
                    <p className="text-navy-primary">Admin</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-dark mb-2">
                      Email
                    </label>
                    <p className="text-navy-primary">farhanshahid973@gmail.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-dark mb-2">
                      Role
                    </label>
                    <p className="text-navy-primary capitalize">Admin</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-medium pt-6">
                <h2 className="text-xl font-semibold text-navy-primary mb-4">
                  System Information
                </h2>
                <div className="space-y-2 text-sm text-gray-dark">
                  <p>Environment: {process.env.NODE_ENV || 'development'}</p>
                  <p>Database: MongoDB</p>
                  <p>Version: 1.0.0</p>
                </div>
              </div>
              
              <div className="border-t border-gray-medium pt-6">
                <h2 className="text-xl font-semibold text-navy-primary mb-4">
                  Configuration
                </h2>
                <p className="text-gray-dark mb-4">
                  System configuration is managed through environment variables. 
                  Update your .env file to change settings.
                </p>
                <div className="bg-gray-light p-4 rounded-lg">
                  <p className="text-sm text-gray-dark font-mono">
                    .env.example file contains all required configuration variables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}