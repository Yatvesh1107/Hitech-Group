import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, LoaderCircle, RotateCcw, Save } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getCompanySettings, updateCompanySettings, uploadCompanyImage } from "../../../services/settings"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import ErrorState from "../../../components/admin/ErrorState"
import CompanyProfileCard from "../../../components/admin/companySettings/CompanyProfileCard"
import BrandingCard from "../../../components/admin/companySettings/BrandingCard"
import ContactCard from "../../../components/admin/companySettings/ContactCard"
import AddressCard from "../../../components/admin/companySettings/AddressCard"
import TaxCard from "../../../components/admin/companySettings/TaxCard"
import BankCard from "../../../components/admin/companySettings/BankCard"
import DocumentDefaultsCard from "../../../components/admin/companySettings/DocumentDefaultsCard"
import TermsCard from "../../../components/admin/companySettings/TermsCard"
import { validateCompanySettings, trimCompanySettings } from "../../../utils/settingsValidation"

const DIVISIONS = ["Industrial Insulation", "Experts in Ultrasonics", "Precision Tech Engineering"]

const EMPTY_SETTINGS = {
  company: { name: "", tagline: "", description: "" },
  branding: { logo: "", seal: "", signature: "" },
  contact: { phone: "", alternatePhone: "", email: "", website: "" },
  address: { addressLine1: "", addressLine2: "", city: "", state: "", country: "", pincode: "" },
  tax: { gstNumber: "", panNumber: "" },
  bank: { bankName: "", accountName: "", accountNumber: "", ifscCode: "", branch: "", upiId: "" },
  documentDefaults: {
    quotationPrefix: "QT",
    invoicePrefix: "INV",
    technicalReportPrefix: "TR",
    defaultCurrency: "INR",
    defaultGst: 18,
    financialYearFormat: "YYYY-YY",
  },
  defaultTerms: { quotation: "", invoice: "", technicalReport: "" },
}

function normalizeSettings(settings) {
  return {
    company: { ...EMPTY_SETTINGS.company, ...(settings.company || {}) },
    branding: { ...EMPTY_SETTINGS.branding, ...(settings.branding || {}) },
    contact: { ...EMPTY_SETTINGS.contact, ...(settings.contact || {}) },
    address: { ...EMPTY_SETTINGS.address, ...(settings.address || {}) },
    tax: { ...EMPTY_SETTINGS.tax, ...(settings.tax || {}) },
    bank: { ...EMPTY_SETTINGS.bank, ...(settings.bank || {}) },
    documentDefaults: { ...EMPTY_SETTINGS.documentDefaults, ...(settings.documentDefaults || {}) },
    defaultTerms: { ...EMPTY_SETTINGS.defaultTerms, ...(settings.defaultTerms || {}) },
  }
}

export default function CompanySettings() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [settings, setSettings] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const [selectedDivision, setSelectedDivision] = useState(DIVISIONS[0])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState({})
  const [uploadingKey, setUploadingKey] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadSettings() {
      setLoading(true)
      setError("")

      try {
        const data = await getCompanySettings({ token, division: selectedDivision })
        if (cancelled) return
        const normalized = normalizeSettings(data)
        setSettings(normalized)
        setFormValues(normalized)
        setValidationErrors({})
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load company settings. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadSettings()

    return () => {
      cancelled = true
    }
  }, [token, selectedDivision, refreshKey])

  const handleGroupChange = (group, field, value) => {
    setFormValues((current) => ({
      ...current,
      [group]: { ...current[group], [field]: value },
    }))
  }

  const handleReset = () => {
    setFormValues(settings)
    setValidationErrors({})
    showToast("Changes discarded.", "info")
  }

  const handleUpload = async (field, file) => {
    setUploadingKey(field)

    try {
      const result = await uploadCompanyImage({ token, file })
      handleGroupChange("branding", field, result.url)
      showToast("Image uploaded successfully.")
    } catch (err) {
      showToast(err.message || "Image upload failed. Please try again.", "error")
    } finally {
      setUploadingKey("")
    }
  }

  const handleRemoveImage = (field) => {
    handleGroupChange("branding", field, "")
  }

  const handleSave = async () => {
    const errors = validateCompanySettings(formValues)
    setValidationErrors(errors)

    if (Object.keys(errors).length > 0) {
      showToast("Please fix the highlighted fields before saving.", "error")
      return
    }

    setSaving(true)

    try {
      const payload = trimCompanySettings(formValues)
      const updated = await updateCompanySettings({ token, division: selectedDivision, payload })
      const normalized = normalizeSettings(updated)
      setSettings(normalized)
      setFormValues(normalized)
      showToast("Company settings saved successfully.")
    } catch (err) {
      showToast(err.message || "Failed to save company settings. Please try again.", "error")
    } finally {
      setSaving(false)
    }
  }

  const handleRetry = () => {
    setRefreshKey((key) => key + 1)
  }

  const handleCancel = () => {
    navigate("/admin")
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors"
        >
          <ArrowLeft size={14} />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-[#0B2D5C] font-semibold">Company Settings</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Company Settings"
          subtitle="Manage information used across the ERP and printed on PDF documents. Each company keeps its own logo, contacts, GST and defaults."
        />
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-[#0F172A] mb-2">Select Company</p>
        <div className="flex flex-wrap gap-2">
          {DIVISIONS.map((division) => {
            const active = division === selectedDivision
            return (
              <button
                key={division}
                type="button"
                onClick={() => setSelectedDivision(division)}
                className={`h-10 px-4 rounded-[12px] text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#0B2D5C] text-white"
                    : "bg-white border border-gray-200 text-[#0F172A] hover:bg-gray-50"
                }`}
              >
                {division}
              </button>
            )
          })}
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8 flex items-center justify-center py-24">
          <LoaderCircle size={28} className="text-[#F4B400] animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-6">
            <CompanyProfileCard
              values={formValues.company}
              errors={validationErrors}
              onChange={(field, value) => handleGroupChange("company", field, value)}
            />

            <BrandingCard
              values={formValues.branding}
              onUpload={handleUpload}
              onRemove={handleRemoveImage}
              uploadingKey={uploadingKey}
            />

            <ContactCard
              values={formValues.contact}
              errors={validationErrors}
              onChange={(field, value) => handleGroupChange("contact", field, value)}
            />

            <AddressCard
              values={formValues.address}
              errors={validationErrors}
              onChange={(field, value) => handleGroupChange("address", field, value)}
            />

            <TaxCard
              values={formValues.tax}
              errors={validationErrors}
              onChange={(field, value) => handleGroupChange("tax", field, value)}
            />

            <BankCard
              values={formValues.bank}
              errors={validationErrors}
              onChange={(field, value) => handleGroupChange("bank", field, value)}
            />

            <DocumentDefaultsCard
              values={formValues.documentDefaults}
              onChange={(field, value) => handleGroupChange("documentDefaults", field, value)}
            />

            <TermsCard
              values={formValues.defaultTerms}
              onChange={(field, value) => handleGroupChange("defaultTerms", field, value)}
            />
          </div>

          <div className="sticky bottom-4 mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end bg-white/90 backdrop-blur rounded-[16px] border border-gray-200 p-3 shadow-sm">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[12px] border border-gray-200 bg-white text-[#0F172A] text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[12px] border border-gray-200 bg-white text-[#0F172A] text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors disabled:opacity-50"
            >
              {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
