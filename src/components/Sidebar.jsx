import { useState } from "react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  const items = [
    { id: "home", label: "Home", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9.5L12 3l9 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10.5v8a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
    { id: "tasks", label: "Tasks", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
    { id: "files", label: "Files", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>) },
    { id: "reports", label: "Reports", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M4 12h12M4 17h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
    { id: "messages", label: "Messages", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>) }
  ];

  return (
    <>
      <aside className="hidden md:flex flex-col justify-between items-center fixed left-6 top-6 bottom-6 w-20 rounded-2xl bg-gradient-to-b from-[#1b1220] via-[#24162a] to-[#0f1016] shadow-2xl py-6 z-50">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-[#2dd4bf] to-[#6366f1] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12 2C9.243 2 7 4.243 7 7c0 4.667 5 9 5 9s5-4.333 5-9c0-2.757-2.243-5-5-5z" fill="white"/></svg>
          </div>

          <nav className="flex flex-col items-center gap-4">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => setActive(it.id)}
                className={`group relative flex items-center justify-center w-12 h-12 rounded-md transition-all ${active === it.id ? "bg-white/8 ring-2 ring-white/10" : "hover:bg-white/3"} text-white`}
                aria-label={it.label}
              >
                <span className={`absolute left-1 -translate-x-full top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded-md text-sm bg-black/70 text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity`}>
                  {it.label}
                </span>
                <span className="w-5 h-5" style={{ color: active === it.id ? "#fff" : "rgba(255,255,255,0.85)" }}>
                  {it.icon}
                </span>
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full ${active === it.id ? "bg-gradient-to-b from-[#2dd4bf] to-[#6366f1]" : "bg-transparent"} transition-all`} />
              </button>
            ))}
          </nav>

          <div className="w-12 h-12 rounded-lg bg-[#0b4b9b] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="4" y="4" width="16" height="16" rx="2" fill="white" opacity="0.06"/>
              <path d="M8 12h8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8v8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button onClick={() => setActive("search")} className="w-10 h-10 rounded-md flex items-center justify-center opacity-90 hover:opacity-100 text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a8 8 0 10-14.8 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button onClick={() => setActive("settings")} className="w-10 h-10 rounded-md flex items-center justify-center opacity-90 hover:opacity-100 text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.4"/><path d="M19.4 15a8 8 0 10-14.8 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
            <img src="https://i.pravatar.cc/40" alt="avatar" className="w-full h-full object-cover"/>
          </div>
        </div>
      </aside>

      <div className="md:hidden">
        <div className="fixed left-4 bottom-6 z-50">
          <button onClick={() => setMobileOpen(true)} className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#6366f1] flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18M7 6h10M7 18h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
            <div className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#1b1220] via-[#24162a] to-[#0f1016] z-50 p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#2dd4bf] to-[#6366f1] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12 2C9.243 2 7 4.243 7 7c0 4.667 5 9 5 9s5-4.333 5-9c0-2.757-2.243-5-5-5z" fill="white"/></svg>
                  </div>
                  <span className="text-white font-medium">Menu</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M6 18L18 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                {items.map((it) => (
                  <button key={it.id} onClick={() => { setActive(it.id); setMobileOpen(false); }} className={`w-full flex items-center gap-3 p-3 rounded-lg ${active === it.id ? "bg-white/6" : "hover:bg-white/3"} text-white`}>
                    <span className="w-5 h-5">{it.icon}</span>
                    <span>{it.label}</span>
                  </button>
                ))}

                <div className="mt-4 border-t border-white/6 pt-4">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/3 text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a8 8 0 10-14.8 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>Notifications</span>
                  </button>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
                      <img src="https://i.pravatar.cc/80" alt="avatar" className="w-full h-full object-cover"/>
                    </div>
                    <div>
                      <div className="text-white font-medium">User Name</div>
                      <div className="text-white/60 text-sm">View profile</div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </>
  );
}
