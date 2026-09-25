"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapView } from "@/components/ui/MapView";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Star,
  Activity,
  Bed,
  Phone,
  Navigation,
  CheckCircle2,
  Filter,
  ArrowRight,
} from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  type: string;
  distance: string;
  rating: number;
  availableBeds: number;
  icuBeds: number;
  specialties: string[];
  image: string;
}

const hospitalsList: Hospital[] = [
  {
    id: 1,
    name: "AIIMS New Delhi",
    type: "Govt Tertiary Hospital",
    distance: "4.2 km",
    rating: 4.8,
    availableBeds: 45,
    icuBeds: 8,
    specialties: ["Cardiology", "Neurology", "Oncology", "Trauma"],
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600",
  },
  {
    id: 2,
    name: "Safdarjung Hospital",
    type: "Govt Super Speciality",
    distance: "3.8 km",
    rating: 4.4,
    availableBeds: 28,
    icuBeds: 5,
    specialties: ["General Medicine", "Pediatrics", "Burns Care", "Orthopedics"],
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600",
  },
  {
    id: 3,
    name: "Rampur Primary Health Center",
    type: "Primary Health Center (PHC)",
    distance: "2.1 km",
    rating: 4.1,
    availableBeds: 6,
    icuBeds: 1,
    specialties: ["Maternal Care", "Immunization", "Basic Triage", "OPD"],
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=600",
  },
  {
    id: 4,
    name: "Yashoda Super Speciality",
    type: "Private Network Hospital",
    distance: "6.5 km",
    rating: 4.6,
    availableBeds: 32,
    icuBeds: 6,
    specialties: ["Advanced Cardiac", "Nephrology", "Minimally Invasive Surgery"],
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600",
  },
];

export default function HospitalExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [activeHospitalId, setActiveHospitalId] = useState<number | null>(1);

  const filteredHospitals = hospitalsList.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType =
      selectedType === "All" ||
      (selectedType === "Govt" && h.type.includes("Govt")) ||
      (selectedType === "PHC" && h.type.includes("PHC")) ||
      (selectedType === "Private" && h.type.includes("Private"));

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>OpenStreetMap & CartoDB Dark Integration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Find Healthcare & Live Beds
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time verified hospital network with instant queue token and bed availability.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-2xl border border-white/5">
          {["All", "Govt", "PHC", "Private"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === t
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Left Map, Right Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Leaflet Map (Height fixed for desktop, responsive on mobile) */}
        <div className="lg:col-span-6 h-[400px] lg:h-[620px] rounded-3xl overflow-hidden sticky top-28">
          <MapView
            selectedId={activeHospitalId}
            onSelectHospital={(id) => setActiveHospitalId(id)}
          />
        </div>

        {/* RIGHT: Search & Smart Cards Grid */}
        <div className="lg:col-span-6 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospitals, specialties (Cardiology, PHC, Beds)..."
              className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Cards List */}
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
            {filteredHospitals.map((hospital) => {
              const isSelected = activeHospitalId === hospital.id;

              return (
                <motion.div
                  key={hospital.id}
                  onClick={() => setActiveHospitalId(hospital.id)}
                  whileHover={{ scale: 1.01 }}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-xl ${
                    isSelected
                      ? "bg-slate-900/90 border-emerald-500/50 shadow-emerald-950/50"
                      : "bg-slate-900/50 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cover bg-center shrink-0 border border-white/10 relative overflow-hidden"
                      style={{ backgroundImage: `url(${hospital.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {hospital.rating}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 truncate">
                            {hospital.type}
                          </span>
                          <span className="text-xs text-slate-300 font-medium flex items-center gap-1 shrink-0">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            {hospital.distance}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white truncate mt-0.5">
                          {hospital.name}
                        </h3>

                        {/* Bed counts */}
                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="text-emerald-300 font-semibold flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5" />
                            {hospital.availableBeds} General Beds
                          </span>
                          <span className="text-teal-300 font-semibold">
                            {hospital.icuBeds} ICU Beds
                          </span>
                        </div>
                      </div>

                      {/* Specialties Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {hospital.specialties.map((s) => (
                          <span
                            key={s}
                            className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      ABHA & Ayushman PM-JAY Accepted
                    </span>
                    <Button
                      size="sm"
                      variant="emerald"
                      className="rounded-xl text-xs h-8 px-3.5 shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Book appointment token at ${hospital.name}`);
                      }}
                    >
                      <span>Book Token</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
