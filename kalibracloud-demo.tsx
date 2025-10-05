import React, { useState } from 'react';
import { LogOut, Plus } from 'lucide-react';

const initialData = {
  users: [
    { id: 1, name: "Admin", email: "admin@kalibracloud.com", password: "123456", role: "admin" },
    { id: 2, name: "PT Petro Instruments", email: "client@kalibracloud.com", password: "123456", role: "client", companyName: "PT Petro Instruments" },
    { id: 3, name: "Lab Kalibrasi Tangerang", email: "lab@kalibracloud.com", password: "123456", role: "lab", accreditationNo: "LP-123-IDN-2024" }
  ],
  instruments: [
    { id: 1, name: "Pressure Gauge", serialNumber: "PG-001", clientId: 2, status: "active", lastCertDate: "2024-06-15" },
    { id: 2, name: "Thermometer", serialNumber: "TH-002", clientId: 2, status: "active", lastCertDate: null }
  ],
  requests: [],
  quotations: []
};

export default function KalibraCloud() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState(initialData);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = () => {
    setError('');
    const user = data.users.find(u => 
      u.email === formData.email && u.password === formData.password
    );
    
    if (user) {
      setCurrentUser(user);
      setCurrentPage('dashboard');
      setSuccess('Login berhasil!');
      setFormData({});
    } else {
      setError('Email atau password salah');
    }
  };

  const handleRegister = () => {
    setError('');
    
    const emailExists = data.users.find(u => u.email === formData.email);
    if (emailExists) {
      setError('Email sudah terdaftar');
      return;
    }

    const newUser = {
      id: data.users.length + 1,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role || 'client',
      companyName: formData.companyName || null
    };

    setData({
      ...data,
      users: [...data.users, newUser]
    });
    
    setSuccess('Registrasi berhasil! Silakan login.');
    setCurrentPage('login');
    setFormData({});
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
    setFormData({});
    setError('');
    setSuccess('');
  };

  const addInstrument = () => {
    const newInstrument = {
      id: data.instruments.length + 1,
      name: formData.instrumentName,
      serialNumber: formData.serialNumber,
      clientId: currentUser.id,
      status: 'active',
      lastCertDate: null
    };
    
    setData({
      ...data,
      instruments: [...data.instruments, newInstrument]
    });
    
    setSuccess('Alat berhasil ditambahkan!');
    setFormData({});
  };

  const createRequest = () => {
    const newRequest = {
      id: data.requests.length + 1,
      clientId: currentUser.id,
      labId: parseInt(formData.labId),
      instrumentId: parseInt(formData.instrumentId),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setData({
      ...data,
      requests: [...data.requests, newRequest]
    });
    
    setSuccess('Permintaan kalibrasi berhasil dibuat!');
    setFormData({});
  };

  const createQuotation = (requestId) => {
    const newQuotation = {
      id: data.quotations.length + 1,
      requestId: requestId,
      cost: parseFloat(formData.cost || 0),
      duration: parseInt(formData.duration || 0),
      status: 'draft'
    };
    
    setData({
      ...data,
      quotations: [...data.quotations, newQuotation],
      requests: data.requests.map(r => 
        r.id === requestId ? {...r, status: 'quoted'} : r
      )
    });
    
    setSuccess('Penawaran berhasil dibuat!');
    setFormData({});
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">KalibraCloud</h1>
          <div className="space-x-4">
            <button onClick={() => setCurrentPage('login')} className="text-gray-600 hover:text-indigo-600">
              Login
            </button>
            <button onClick={() => setCurrentPage('register')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Platform Kalibrasi Digital Terpadu
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Kelola seluruh proses kalibrasi dari permintaan hingga sertifikat digital dengan mudah dan aman
        </p>
        <button onClick={() => setCurrentPage('register')} className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700">
          Mulai Gratis
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="text-4xl mb-4">🔄</div>
          <h3 className="text-xl font-bold mb-2">Digitalisasi Proses Kalibrasi</h3>
          <p className="text-gray-600">Otomatisasi seluruh workflow dari permintaan hingga pembayaran</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">Dashboard Multi-Role</h3>
          <p className="text-gray-600">Admin, Client, dan Laboratorium memiliki akses sesuai kebutuhan</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Sertifikat QR Aman</h3>
          <p className="text-gray-600">Sertifikat digital dengan QR Code untuk validasi instan</p>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">KalibraCloud</h1>
          <p className="text-gray-600 mt-2">Login ke Dashboard</p>
        </div>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm">{success}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              value={formData.password || ''}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button onClick={handleLogin} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium">
            Login
          </button>
        </div>

        <p className="text-center mt-4 text-gray-600">
          Belum punya akun?{" "}
          <button onClick={() => setCurrentPage('register')} className="text-indigo-600 hover:underline font-medium">
            Daftar di sini
          </button>
        </p>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-500 text-center mb-2">Demo Login:</p>
          <div className="text-xs text-gray-400 space-y-1">
            <p>Admin: admin@kalibracloud.com / 123456</p>
            <p>Client: client@kalibracloud.com / 123456</p>
            <p>Lab: lab@kalibracloud.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );

  const RegisterPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">KalibraCloud</h1>
          <p className="text-gray-600 mt-2">Daftar Akun Baru</p>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Nama Lengkap</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              value={formData.password || ''}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Daftar Sebagai</label>
            <select
              value={formData.role || 'client'}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="client">Client (Perusahaan)</option>
              <option value="lab">Laboratorium Kalibrasi</option>
            </select>
          </div>
          {formData.role === 'client' && (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Nama Perusahaan</label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}
          <button onClick={handleRegister} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium">
            Daftar
          </button>
        </div>

        <p className="text-center mt-4 text-gray-600">
          Sudah punya akun?{" "}
          <button onClick={() => setCurrentPage('login')} className="text-indigo-600 hover:underline font-medium">
            Login di sini
          </button>
        </p>
      </div>
    </div>
  );

  const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showAddForm, setShowAddForm] = useState(false);

    const userInstruments = data.instruments.filter(i => i.clientId === currentUser.id);
    const userRequests = data.requests.filter(r => r.clientId === currentUser.id);
    const labRequests = data.requests.filter(r => r.labId === currentUser.id);
    const labs = data.users.filter(u => u.role === 'lab');

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">
              KalibraCloud {currentUser.role === 'admin' && 'Admin'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {currentUser.role === 'admin' && '⚙️ '}
                {currentUser.role === 'client' && '👤 '}
                {currentUser.role === 'lab' && '🔬 '}
                {currentUser.name}
              </span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4">{success}</div>}
          
          {currentUser.role === 'client' && (
            <>
              <div className="bg-white rounded-lg shadow mb-6">
                <nav className="flex gap-4 px-6 border-b">
                  {['overview', 'instruments', 'requests'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => {setActiveTab(tab); setShowAddForm(false); setSuccess('');}}
                      className={`py-4 px-4 border-b-2 font-medium ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                    >
                      {tab === 'overview' && '📊 Overview'}
                      {tab === 'instruments' && '🔧 Alat'}
                      {tab === 'requests' && '📝 Permintaan'}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Dashboard Client</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Total Alat</h3>
                        <p className="text-3xl font-bold text-blue-600">{userInstruments.length}</p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Permintaan Aktif</h3>
                        <p className="text-3xl font-bold text-green-600">{userRequests.length}</p>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Sertifikat Valid</h3>
                        <p className="text-3xl font-bold text-purple-600">0</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'instruments' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Daftar Alat</h2>
                      <button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                        <Plus size={16} /> Tambah Alat
                      </button>
                    </div>

                    {showAddForm && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-gray-700 mb-2">Nama Alat</label>
                            <input
                              type="text"
                              value={formData.instrumentName || ''}
                              onChange={(e) => setFormData({...formData, instrumentName: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-2">Serial Number</label>
                            <input
                              type="text"
                              value={formData.serialNumber || ''}
                              onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg"
                            />
                          </div>
                        </div>
                        <button onClick={addInstrument} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                          Simpan
                        </button>
                      </div>
                    )}

                    <div className="space-y-4">
                      {userInstruments.map(inst => (
                        <div key={inst.id} className="border p-4 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold">{inst.name}</h3>
                              <p className="text-sm text-gray-600">SN: {inst.serialNumber}</p>
                              <p className="text-sm text-gray-500">
                                Last Cert: {inst.lastCertDate || 'Belum ada'}
                              </p>
                            </div>
                            <span className="text-green-600 font-medium">{inst.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'requests' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Permintaan Kalibrasi</h2>
                      <button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                        <Plus size={16} /> Buat Permintaan
                      </button>
                    </div>

                    {showAddForm && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-gray-700 mb-2">Pilih Alat</label>
                            <select
                              value={formData.instrumentId || ''}
                              onChange={(e) => setFormData({...formData, instrumentId: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg"
                            >
                              <option value="">-- Pilih Alat --</option>
                              {userInstruments.map(inst => (
                                <option key={inst.id} value={inst.id}>{inst.name} ({inst.serialNumber})</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-2">Pilih Laboratorium</label>
                            <select
                              value={formData.labId || ''}
                              onChange={(e) => setFormData({...formData, labId: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg"
                            >
                              <option value="">-- Pilih Lab --</option>
                              {labs.map(lab => (
                                <option key={lab.id} value={lab.id}>{lab.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <button onClick={createRequest} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                          Kirim Permintaan
                        </button>
                      </div>
                    )}

                    <div className="space-y-4">
                      {userRequests.map(req => {
                        const instrument = data.instruments.find(i => i.id === req.instrumentId);
                        const lab = data.users.find(u => u.id === req.labId);
                        return (
                          <div key={req.id} className="border p-4 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-bold">{instrument?.name}</h3>
                                <p className="text-sm text-gray-600">Lab: {lab?.name}</p>
                                <p className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</p>
                              </div>
                              <span className={`px-3 py-1 rounded text-sm ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                                {req.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {currentUser.role === 'lab' && (
            <>
              <div className="bg-white rounded-lg shadow mb-6">
                <nav className="flex gap-4 px-6 border-b">
                  {['overview', 'requests', 'quotations'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => {setActiveTab(tab); setShowAddForm(false); setSuccess('');}}
                      className={`py-4 px-4 border-b-2 font-medium ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                    >
                      {tab === 'overview' && '📊 Overview'}
                      {tab === 'requests' && '📥 Permintaan'}
                      {tab === 'quotations' && '💰 Penawaran'}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Dashboard Laboratorium</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-orange-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Permintaan Baru</h3>
                        <p className="text-3xl font-bold text-orange-600">{labRequests.filter(r => r.status === 'pending').length}</p>
                      </div>
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Total Permintaan</h3>
                        <p className="text-3xl font-bold text-blue-600">{labRequests.length}</p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Penawaran Dibuat</h3>
                        <p className="text-3xl font-bold text-green-600">{data.quotations.length}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'requests' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Permintaan Masuk</h2>
                    <div className="space-y-4">
                      {labRequests.map(req => {
                        const instrument = data.instruments.find(i => i.id === req.instrumentId);
                        const client = data.users.find(u => u.id === req.clientId);
                        const hasQuotation = data.quotations.find(q => q.requestId === req.id);
                        
                        return (
                          <div key={req.id} className="border p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold">{instrument?.name}</h3>
                                <p className="text-sm text-gray-600">Client: {client?.name}</p>
                                <p className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div className="flex gap-2">
                                <span className={`px-3 py-1 rounded text-sm ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                                  {req.status}
                                </span>
                                {!hasQuotation && req.status === 'pending' && (
                                  <button 
                                    onClick={() => {setActiveTab('quotations'); setFormData({requestId: req.id});}}
                                    className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                                  >
                                    Buat Penawaran
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'quotations' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Buat Penawaran</h2>
                    
                    {formData.requestId && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-gray-700 mb-2">Biaya (Rp)</label>
                            <input
                              type="number"
                              value={formData.cost || ''}
                              onChange={(e) => setFormData({...formData, cost: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-2">Durasi (hari)</label>
                            <input
                              type="number"
                              value={formData.duration || ''}
                              onChange={(e) => setFormData({...formData, duration: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => createQuotation(formData.requestId)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            Simpan Penawaran
                          </button>
                          <button onClick={() => setFormData({})} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            Batal
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {data.quotations.map(quot => {
                        const request = data.requests.find(r => r.id === quot.requestId);
                        const instrument = data.instruments.find(i => i.id === request?.instrumentId);
                        const client = data.users.find(u => u.id === request?.clientId);
                        
                        return (
                          <div key={quot.id} className="border p-4 rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-bold">{instrument?.name}</h3>
                                <p className="text-sm text-gray-600">Client: {client?.name}</p>
                                <p className="text-sm text-gray-700 font-medium">Biaya: Rp {quot.cost.toLocaleString()}</p>
                                <p className="text-sm text-gray-700">Durasi: {quot.duration} hari</p>
                              </div>
                              <span className="px-3 py-1 rounded text-sm bg-purple-100 text-purple-700">
                                {quot.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {currentUser.role === 'admin' && (
            <>
              <div className="bg-white rounded-lg shadow mb-6">
                <nav className="flex gap-4 px-6 border-b">
                  {['overview', 'users', 'orders'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => {setActiveTab(tab); setSuccess('');}}
                      className={`py-4 px-4 border-b-2 font-medium ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                    >
                      {tab === 'overview' && '📊 Overview'}
                      {tab === 'users' && '👥 Users'}
                      {tab === 'orders' && '📦 Orders'}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Dashboard Admin</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600">{data.users.length}</p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Total Alat</h3>
                        <p className="text-3xl font-bold text-green-600">{data.instruments.length}</p>
                      </div>
                      <div className="bg-yellow-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Total Permintaan</h3>
                        <p className="text-3xl font-bold text-yellow-600">{data.requests.length}</p>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-gray-600 mb-2">Total Penawaran</h3>
                        <p className="text-3xl font-bold text-purple-600">{data.quotations.length}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'users' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Kelola User</h2>
                    <div className="space-y-4">
                      {data.users.map(user => (
                        <div key={user.id} className="border p-4 rounded-lg flex justify-between items-center">
                          <div>
                            <h3 className="font-bold">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            {user.companyName && <p className="text-xs text-gray-500">Company: {user.companyName}</p>}
                          </div>
                          <span className={`px-3 py-1 rounded text-sm ${user.role === 'admin' ? 'bg-red-100 text-red-700' : user.role === 'client' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                            {user.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Daftar Order</h2>
                    <div className="space-y-4">
                      {data.requests.map(req => {
                        const instrument = data.instruments.find(i => i.id === req.instrumentId);
                        const client = data.users.find(u => u.id === req.clientId);
                        const lab = data.users.find(u => u.id === req.labId);
                        
                        return (
                          <div key={req.id} className="border p-4 rounded-lg">
                            <div className="grid md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Alat</p>
                                <p className="font-bold">{instrument?.name}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Client</p>
                                <p className="font-medium">{client?.name}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Lab</p>
                                <p className="font-medium">{lab?.name}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Status</p>
                                <span className={`px-2 py-1 rounded text-xs ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                                  {req.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'dashboard' && <Dashboard />}
    </div>
  );
}