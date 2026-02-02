// import React from 'react'
const PreLoader = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0b1226]">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400" />
          <div className="absolute inset-2 rounded-full border-4 border-blue-400/20 border-t-blue-400 animate-[spin_2.5s_linear_infinite]" />
          <div className="absolute inset-5 rounded-full bg-white/5 backdrop-blur" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/30">
            <span className="text-sm font-semibold">BT</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.3em] text-emerald-200">
            LOADING
          </p>
          <p className="mt-2 text-xs text-white/60">Preparing your dashboard…</p>
        </div>
      </div>
    </div>
  )
}

export default PreLoader