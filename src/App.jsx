import { Routes, Route, Outlet } from "react-router-dom"
import AuthProvider from "./context/AuthProvider"
import CompanyProvider from "./context/CompanyProvider"
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
import QuotationList from "./pages/admin/quotation/QuotationList"
import CreateQuotation from "./pages/admin/quotation/CreateQuotation"
import QuotationDetails from "./pages/admin/quotation/QuotationDetails"
import EditQuotation from "./pages/admin/quotation/EditQuotation"
import InvoiceList from "./pages/admin/invoice/InvoiceList"
import CreateInvoice from "./pages/admin/invoice/CreateInvoice"
import InvoiceDetails from "./pages/admin/invoice/InvoiceDetails"
import EditInvoice from "./pages/admin/invoice/EditInvoice"
import TechnicalReportList from "./pages/admin/technicalReport/TechnicalReportList"
import CreateTechnicalReport from "./pages/admin/technicalReport/CreateTechnicalReport"
import TechnicalReportDetails from "./pages/admin/technicalReport/TechnicalReportDetails"
import EditTechnicalReport from "./pages/admin/technicalReport/EditTechnicalReport"
import CompanySettings from "./pages/admin/settings/CompanySettings"

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
      <CompanyProvider>
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
            path="/admin/quotations"
            element={
              <ProtectedRoute>
                <QuotationList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quotations/new"
            element={
              <ProtectedRoute>
                <CreateQuotation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quotations/:id"
            element={
              <ProtectedRoute>
                <QuotationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quotations/:id/edit"
            element={
              <ProtectedRoute>
                <EditQuotation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/invoices"
            element={
              <ProtectedRoute>
                <InvoiceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/invoices/new"
            element={
              <ProtectedRoute>
                <CreateInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/invoices/:id"
            element={
              <ProtectedRoute>
                <InvoiceDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/invoices/:id/edit"
            element={
              <ProtectedRoute>
                <EditInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/technical-reports"
            element={
              <ProtectedRoute>
                <TechnicalReportList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/technical-reports/new"
            element={
              <ProtectedRoute>
                <CreateTechnicalReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/technical-reports/:id"
            element={
              <ProtectedRoute>
                <TechnicalReportDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/technical-reports/:id/edit"
            element={
              <ProtectedRoute>
                <EditTechnicalReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/company"
            element={
              <ProtectedRoute>
                <CompanySettings />
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
      </CompanyProvider>
    </AuthProvider>
  )
}

export default App
