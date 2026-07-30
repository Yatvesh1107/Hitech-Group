function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-6 ${className}`}>
      {children}
    </div>
  )
}

export default Container
