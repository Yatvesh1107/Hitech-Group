import { Routes, Route, Outlet } from "react-router-dom"
import AuthProvider from "./context/AuthProvider"
import ToastProvider from "./context/ToastProvider"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import TopBar from "./components/layout/TopBar"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ScrollToTop from "./components/layout/ScrollToTop"
import Home from "./pages/Home"
import About from "./pages/About"
import Divisions from "./pages/Divisions"
import Projects from "./pages/Projects"
import Clients from "./pages/Clients"
import Contact from "./pages/Contact"
import IndustrialInsulation from "./pages/IndustrialInsulation"
import ExpertsUltrasonics from "./pages/ExpertsUltrasonics"
import PrecisionTech from "./pages/PrecisionTech"
import Login from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"
import Customers from "./pages/admin/customer/CustomerList"
import AddCustomer from "./pages/admin/customer/AddCustomer"
import EditCustomer from "./pages/admin/customer/EditCustomer"
import CustomerDetails from "./pages/admin/customer/CustomerDetails"
import ServiceList from "./pages/admin/service/ServiceList"
import AddService from "./pages/admin/service/AddService"
import ServiceDetails from "./pages/admin/service/ServiceDetails"
import EditService from "./pages/admin/service/EditService"

function PublicLayout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers/new"
            element={
              <ProtectedRoute>
                <AddCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers/:id/edit"
            element={
              <ProtectedRoute>
                <EditCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers/:id"
            element={
              <ProtectedRoute>
                <CustomerDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <ServiceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/new"
            element={
              <ProtectedRoute>
                <AddService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/:id"
            element={
              <ProtectedRoute>
                <ServiceDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/:id/edit"
            element={
              <ProtectedRoute>
                <EditService />
              </ProtectedRoute>
            }
          />
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/divisions" element={<Divisions />} />
            <Route path="/divisions/industrial-insulation" element={<IndustrialInsulation />} />
            <Route path="/divisions/experts-in-ultrasonics" element={<ExpertsUltrasonics />} />
            <Route path="/divisions/precision-tech" element={<PrecisionTech />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
