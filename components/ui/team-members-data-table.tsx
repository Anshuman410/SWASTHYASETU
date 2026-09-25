"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  Stethoscope,
  Shield,
  Activity,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: "Doctor" | "ASHA Worker" | "Nurse" | "Facility Admin";
  department: string;
  status: "Active" | "On Duty" | "On Leave";
  assignedPatients: number;
  joinedDate: string;
  avatar: string;
}

const initialStaff: StaffMember[] = [
  {
    id: "STF-01",
    name: "Dr. Ramesh Sharma",
    email: "ramesh.sharma@swasthya.gov.in",
    role: "Doctor",
    department: "Cardiology & General",
    status: "On Duty",
    assignedPatients: 24,
    joinedDate: "12 Jan 2024",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200",
  },
  {
    id: "STF-02",
    name: "Sunita Devi",
    email: "sunita.asha@swasthya.gov.in",
    role: "ASHA Worker",
    department: "Sitapur Village Node 4",
    status: "On Duty",
    assignedPatients: 56,
    joinedDate: "04 Mar 2023",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
  },
  {
    id: "STF-03",
    name: "Dr. Priya Iyer",
    email: "priya.iyer@swasthya.gov.in",
    role: "Doctor",
    department: "Pediatrics & Neonatal",
    status: "Active",
    assignedPatients: 19,
    joinedDate: "18 Aug 2024",
    avatar: "https://images.unsplash.com/photo-1594824813571-638f02614d3f?q=80&w=200",
  },
  {
    id: "STF-04",
    name: "Geeta Yadav",
    email: "geeta.asha@swasthya.gov.in",
    role: "ASHA Worker",
    department: "Rampur East Node 2",
    status: "Active",
    assignedPatients: 42,
    joinedDate: "22 Nov 2023",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=200",
  },
  {
    id: "STF-05",
    name: "Anand Verma",
    email: "anand.nurse@swasthya.gov.in",
    role: "Nurse",
    department: "Emergency & ICU",
    status: "On Duty",
    assignedPatients: 12,
    joinedDate: "05 Feb 2025",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200",
  },
  {
    id: "STF-06",
    name: "Dr. Vikram Seth",
    email: "vikram.seth@swasthya.gov.in",
    role: "Doctor",
    department: "Orthopedics & Trauma",
    status: "On Leave",
    assignedPatients: 0,
    joinedDate: "10 Jun 2022",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    id: "STF-07",
    name: "Meena Joshi",
    email: "meena.admin@swasthya.gov.in",
    role: "Facility Admin",
    department: "Operations & Logistics",
    status: "Active",
    assignedPatients: 0,
    joinedDate: "15 Jan 2023",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
  },
];

export default function TableBlock() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStaff.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStaff.map((m) => m.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getRoleBadge = (role: StaffMember["role"]) => {
    switch (role) {
      case "Doctor":
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
      case "ASHA Worker":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
      case "Nurse":
        return "bg-teal-500/10 text-teal-300 border-teal-500/30";
      case "Facility Admin":
        return "bg-purple-500/10 text-purple-300 border-purple-500/30";
      default:
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  const getStatusBadge = (status: StaffMember["status"]) => {
    switch (status) {
      case "On Duty":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Active":
        return "bg-teal-500/10 text-teal-300 border-teal-500/30";
      case "On Leave":
        return "bg-yellow-500/10 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="w-full rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl bg-transparent">
      {/* Table Controls Header */}
      <div className="p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search staff, doctors, village node..."
              className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-white/[0.03] rounded-xl border border-white/5">
            {["All", "Doctor", "ASHA Worker", "Nurse"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  roleFilter === role
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <span className="text-xs text-emerald-400 font-semibold px-2">
              {selectedIds.length} Selected
            </span>
          )}
          <Button
            size="sm"
            variant="emerald"
            className="rounded-xl text-xs font-semibold gap-1.5 shadow-md"
            onClick={() => alert("Add New Staff modal: Register Doctor or ASHA Node Worker")}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </Button>
        </div>
      </div>

      {/* Table Data View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={
                    filteredStaff.length > 0 &&
                    selectedIds.length === filteredStaff.length
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-0 cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">Staff Member</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Department / Village Node</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Assigned Active</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredStaff.map((member) => {
              const isSelected = selectedIds.includes(member.id);

              return (
                <tr
                  key={member.id}
                  className={`hover:bg-white/[0.03] transition-colors ${
                    isSelected ? "bg-emerald-500/[0.08]" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(member.id)}
                      className="rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-0 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full bg-cover bg-center border border-white/10"
                        style={{ backgroundImage: `url(${member.avatar})` }}
                      />
                      <div>
                        <div className="font-semibold text-white">
                          {member.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium text-[10px] border ${getRoleBadge(
                        member.role
                      )}`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {member.department}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium text-[10px] border ${getStatusBadge(
                        member.status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-200">
                    {member.assignedPatients > 0 ? (
                      <span className="text-emerald-400 font-bold">
                        {member.assignedPatients} Patients
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() =>
                        alert(`Manage staff profile for ${member.name} (${member.role})`)
                      }
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 bg-white/[0.01]">
        <span>
          Showing {filteredStaff.length} of {staff.length} staff members
        </span>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-medium text-slate-200">Page 1 of 1</span>
          <button className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
