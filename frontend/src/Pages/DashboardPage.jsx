import React, { useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  ShieldX,
  Calendar,
  Clock,
  LogOut,
  Hash,
} from "lucide-react";

const InfoRow = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-sky-500/15 bg-slate-900/40 px-4 py-3">
      <div className="mt-0.5 rounded-lg bg-sky-500/10 p-2 text-sky-300">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-100">
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const formatted = useMemo(() => {
    const safeDate = (d) => {
      if (!d) return null;
      const dt = new Date(d);
      return Number.isNaN(dt.getTime()) ? String(d) : dt.toLocaleString();
    };

    return {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      isVerified: user?.isVerified,
      createdAt: safeDate(user?.createdAt),
      lastLogin: safeDate(user?.lastLogin),
      updatedAt: safeDate(user?.updatedAt),
    };
  }, [user]);

  const handleLogout = async() => {
    
    await logout();

  };

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
    
        <Motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-sky-300/90">Dashboard</p>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome{formatted.name ? `, ${formatted.name}` : ""} 
            </h1>
            <p className="mt-1 text-sm text-slate-300/80">
              Here are your account details.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-100
                       hover:bg-sky-500/15 hover:border-sky-500/35 active:scale-[0.99] transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </Motion.div>

        {/* Card */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="overflow-hidden rounded-2xl border border-sky-500/20 bg-slate-950/40 shadow-2xl backdrop-blur-xl"
        >
          {/* Top strip */}
          <div className="border-b border-sky-500/15 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10 px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-500/15 text-sky-200">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    {formatted.name || "User"}
                  </p>
                  <p className="text-xs text-slate-300/80">
                    {formatted.email || "No email found"}
                  </p>
                </div>
              </div>

              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold
                ${
                  formatted.isVerified
                    ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/25"
                    : "bg-rose-500/15 text-rose-200 border border-rose-500/25"
                }`}
              >
                {formatted.isVerified ? (
                  <ShieldCheck className="h-4 w-4" />
                ) : (
                  <ShieldX className="h-4 w-4" />
                )}
                {formatted.isVerified ? "Verified" : "Not Verified"}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {!user ? (
              <div className="rounded-2xl border border-sky-500/15 bg-slate-900/30 p-6 text-center">
                <p className="text-sm font-semibold text-slate-100">
                  No user data available
                </p>
                <p className="mt-1 text-sm text-slate-300/80">
                  Please login to see your dashboard details.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InfoRow icon={Hash} label="User ID" value={formatted.id} />
                <InfoRow icon={Mail} label="Email" value={formatted.email} />
                <InfoRow icon={UserIcon} label="Name" value={formatted.name} />
                <InfoRow
                  icon={formatted.isVerified ? ShieldCheck : ShieldX}
                  label="Verification"
                  value={formatted.isVerified ? "Verified" : "Not Verified"}
                />
                <InfoRow
                  icon={Calendar}
                  label="Created At"
                  value={formatted.createdAt}
                />
                <InfoRow
                  icon={Clock}
                  label="Last Login"
                  value={formatted.lastLogin}
                />
                <InfoRow
                  icon={Clock}
                  label="Updated At"
                  value={formatted.updatedAt}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-sky-500/15 px-6 py-4">
            <p className="text-xs text-slate-300/70">
              Tip: Connect the Logout button to your API call when ready.
            </p>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
