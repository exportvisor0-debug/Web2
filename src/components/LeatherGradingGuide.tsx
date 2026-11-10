import React, { useState } from "react";
import {
  Layers,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Scissors,
  Sliders,
  BarChart2,
  Info,
} from "lucide-react";

export interface GradeSpec {
  grade: string;
  euroEquivalent: string;
  usEquivalent: string;
  usableCuttingArea: string;
  yieldPercent: number;
  grainIntegrity: string;
  toleratedDefects: string;
  recommendedUses: string[];
  recommendedFinishes: string[];
}

const GRADING_DATA: GradeSpec[] = [
  {
    grade: "Grade A (Table I)",
    euroEquivalent: "Prima Scelta (1ª)",
    usEquivalent: "Select / #1 Heavy Native",
    usableCuttingArea: "85% – 95% Clear Surface",
    yieldPercent: 90,
    grainIntegrity: "Uniform, unbroken epidermal grain pattern. Minimal grain looseness.",
    toleratedDefects: "Zero open scars, no flay cuts. Up to 1–2 closed pinhole hair follicle marks on periphery only.",
    recommendedUses: ["High-end dress shoe uppers", "Luxury handbags", "Executive leather goods"],
    recommendedFinishes: ["Full Grain Aniline", "Semi-Aniline", "Natural Milled Crust"],
  },
  {
    grade: "Grade B (Table II)",
    euroEquivalent: "Seconda Scelta (2ª)",
    usEquivalent: "#2 Native / Commercial Prime",
    usableCuttingArea: "70% – 85% Usable Area",
    yieldPercent: 78,
    grainIntegrity: "Tight grain in butt and center; slight grain variation in neck or flank boundaries.",
    toleratedDefects: "Minor healed tick bites or faint healed thorn scratches well outside the central butt cutting zone.",
    recommendedUses: ["Casual footwear uppers", "Wallets & portfolios", "Belt straps & small goods"],
    recommendedFinishes: ["Semi-Aniline", "Light Pigmented", "Pull-up & Oil Tanned"],
  },
  {
    grade: "Grade C (Table III)",
    euroEquivalent: "Terza Scelta (3ª)",
    usEquivalent: "#3 Branded / Utility",
    usableCuttingArea: "55% – 70% Usable Area",
    yieldPercent: 62,
    grainIntegrity: "Noticeable grain variability; slight vein impressions in shoulder or flank areas.",
    toleratedDefects: "Dispersed healed scratches, small closed grain defects, shallow flesh-side blade marks.",
    recommendedUses: ["Embossed fashion footwear", "Luggage & duffel side panels", "Tooling & heavy boots"],
    recommendedFinishes: ["Embossed / Printed Grain", "Pigmented Finished", "Corrected Grain"],
  },
  {
    grade: "Grade D (Table IV)",
    euroEquivalent: "Quarta Scelta (4ª)",
    usEquivalent: "Lining / Promotional Grade",
    usableCuttingArea: "40% – 55% Usable Area",
    yieldPercent: 48,
    grainIntegrity: "Buffed or corrected surface recommended. Variable fiber compactness across bellies.",
    toleratedDefects: "Prominent vein marks, healed horn marks, minor flay gouges along perimeter.",
    recommendedUses: ["Shoe & bag linings", "Work-safety glove palms", "Internal leather reinforcement"],
    recommendedFinishes: ["Heavy Corrected Grain", "Suede / Nubuck Split", "Pigmented Lining"],
  },
];

const HIDE_ZONES = [
  {
    name: "Croupon / Butt",
    yield: "88% – 95%",
    density: "Densest fiber structure, tightest grain pore alignment, lowest stretch.",
    idealFor: "Vamps, wholecut shoes, luxury bag face panels.",
    color: "bg-[#80420E]/15 text-[#80420E] border-[#80420E]/30",
  },
  {
    name: "Shoulder",
    yield: "72% – 82%",
    density: "Good tensile strength, prominent natural growth wrinkles (wrinkle grain).",
    idealFor: "Belts, shoe quarters, structured gussets, strapwork.",
    color: "bg-amber-100/70 text-amber-900 border-amber-300",
  },
  {
    name: "Belly & Flanks",
    yield: "45% – 60%",
    density: "Looser fiber weave, higher multidirectional elasticity, thinner substance.",
    idealFor: "Linings, non-load-bearing trim, small covered buttons.",
    color: "bg-stone-200/70 text-stone-700 border-stone-300",
  },
  {
    name: "Cheeks & Head",
    yield: "35% – 50%",
    density: "Irregular shape and grain texture; high collagen density but small cut area.",
    idealFor: "Internal reinforcing patches, stiffener shanks, small accessories.",
    color: "bg-stone-200/50 text-stone-600 border-stone-300",
  },
];

interface LeatherGradingGuideProps {
  onInquireGrade?: (gradeLabel: string) => void;
}

export const LeatherGradingGuide: React.FC<LeatherGradingGuideProps> = ({
  onInquireGrade,
}) => {
  const [activeView, setActiveView] = useState<"grades" | "zones" | "tr-packs">("grades");
  const [selectedGrade, setSelectedGrade] = useState<GradeSpec>(GRADING_DATA[0]);

  return (
    <div className="mt-16 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 lg:p-10 shadow-xs transition-colors duration-200">
      
      {/* Component Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-stone-200 dark:border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#7A5A17] dark:text-[#E5BE58]">
            <Award className="w-4 h-4 text-[#C89D43]" />
            <span>International Tannery Standards</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-stone-500 dark:text-stone-400 font-normal">Technical Grading Benchmark</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#15120E] dark:text-[#FAF6F0] tracking-tight mt-1">
            Visual Leather <span className="text-gold-gradient">Grading Guide & Specifications</span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Understand how Bangladesh export tanneries grade wet blue, crust, and finished leather against European (Italian Scelta), American (LIA), and International Tannery Run (TR) specifications.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 rounded-lg self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveView("grades")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeView === "grades"
                ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
            }`}
          >
            Table I–IV Grades
          </button>
          <button
            type="button"
            onClick={() => setActiveView("zones")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeView === "zones"
                ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
            }`}
          >
            Hide Anatomy & Yield
          </button>
          <button
            type="button"
            onClick={() => setActiveView("tr-packs")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeView === "tr-packs"
                ? "bg-[#C89D43] text-white dark:text-[#15120E] shadow-xs"
                : "text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700/50"
            }`}
          >
            Tannery Run (TR) Ratios
          </button>
        </div>
      </div>

      {/* VIEW 1: Grades Interactive Comparison */}
      {activeView === "grades" && (
        <div className="space-y-8">
          
          {/* Grade Selector Tabs with Usable Area Bars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {GRADING_DATA.map((g) => {
              const isSelected = selectedGrade.grade === g.grade;
              return (
                <button
                  key={g.grade}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={`p-3.5 text-left rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white dark:bg-[#1A1410] border-[#C89D43] ring-2 ring-[#C89D43]/40 shadow-xs"
                      : "bg-white/80 dark:bg-[#15100C] border-stone-200 dark:border-stone-800 hover:bg-white dark:hover:bg-[#1C1612] hover:border-[#C89D43]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-base font-bold text-[#181310] dark:text-[#FAF6F0]">
                      {g.grade.split(" ")[0]} {g.grade.split(" ")[1]}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {g.yieldPercent}% Yield
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                    {g.euroEquivalent}
                  </span>

                  {/* Visual Yield Meter Bar */}
                  <div className="mt-2.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        g.yieldPercent >= 85
                          ? "bg-emerald-600"
                          : g.yieldPercent >= 70
                          ? "bg-[#C89D43]"
                          : g.yieldPercent >= 55
                          ? "bg-amber-600"
                          : "bg-stone-500"
                      }`}
                      style={{ width: `${g.yieldPercent}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Grade In-Depth Dossier */}
          <div className="bg-white dark:bg-[#140F0C] border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-5 border-b border-stone-100 dark:border-stone-800 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 mb-1">
                  <span>Selected Specification</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#80420E] dark:text-[#E5BE58] font-semibold">{selectedGrade.euroEquivalent}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-600 dark:text-stone-300">{selectedGrade.usEquivalent}</span>
                </div>
                <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#181310] dark:text-[#FAF6F0]">
                  {selectedGrade.grade} Technical Profile
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-stone-600 dark:text-stone-400 block">
                    Usable Cutting Yield
                  </span>
                  <span className="font-mono-data text-lg font-bold text-emerald-800 dark:text-emerald-400">
                    {selectedGrade.usableCuttingArea}
                  </span>
                </div>
                {onInquireGrade && (
                  <button
                    type="button"
                    onClick={() => onInquireGrade(`Grade Inquiry: ${selectedGrade.grade}`)}
                    className="px-4 py-2 text-xs font-semibold text-white dark:text-[#15120E] bg-[#181310] dark:bg-[#D6AC4B] hover:bg-[#2C211B] dark:hover:bg-[#E5BE58] rounded-md transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                  >
                    Inquire on {selectedGrade.grade.split(" ")[0]} {selectedGrade.grade.split(" ")[1]}
                  </button>
                )}
              </div>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700 dark:text-stone-300">
              
              <div className="space-y-4">
                <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#1A1410] border border-stone-200/80 dark:border-stone-800 rounded-lg">
                  <span className="font-semibold text-stone-900 dark:text-white block mb-1">
                    Grain Pattern & Fiber Density
                  </span>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    {selectedGrade.grainIntegrity}
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#1A1410] border border-stone-200/80 dark:border-stone-800 rounded-lg">
                  <span className="font-semibold text-stone-900 dark:text-white block mb-1">
                    Defect Tolerance Thresholds
                  </span>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    {selectedGrade.toleratedDefects}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#1A1410] border border-stone-200/80 dark:border-stone-800 rounded-lg">
                  <span className="font-semibold text-stone-900 dark:text-white block mb-1.5">
                    Recommended Finished Leather Styles
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedGrade.recommendedFinishes.map((f, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white dark:bg-[#120E0B] border border-stone-200 dark:border-stone-700 rounded text-[11px] font-medium text-stone-800 dark:text-stone-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] dark:bg-[#1A1410] border border-stone-200/80 dark:border-stone-800 rounded-lg">
                  <span className="font-semibold text-stone-900 dark:text-white block mb-1.5">
                    Primary Commercial Applications
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedGrade.recommendedUses.map((u, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 rounded text-[11px] font-medium text-emerald-900 dark:text-emerald-300"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: Hide Anatomy & Cutting Yield Map */}
      {activeView === "zones" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Hide Schematic Illustration */}
            <div className="lg:col-span-6 bg-white dark:bg-[#140F0C] border border-stone-200 dark:border-stone-800 rounded-xl p-6 flex flex-col items-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-4 self-start">
                Bovine Hide Topography & Yield Distribution
              </span>
              
              {/* Stylized SVG Map of Leather Topography */}
              <div className="w-full max-w-sm aspect-4/5 relative flex flex-col items-center justify-between p-4 bg-stone-50 dark:bg-[#181310] rounded-lg border border-dashed border-stone-300 dark:border-stone-700 text-center">
                
                {/* Head / Cheeks */}
                <div className="w-1/2 p-2 rounded-t-xl bg-stone-200/70 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 text-[10px] font-mono font-medium text-stone-600 dark:text-stone-300">
                  <span>Cheeks & Head</span>
                  <span className="block text-[9px] text-stone-500 dark:text-stone-400">Yield: ~40%</span>
                </div>

                {/* Shoulder Zone */}
                <div className="w-3/4 p-3 rounded-md bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-xs font-semibold text-amber-900 dark:text-amber-300 my-1">
                  <span>Shoulder / Neck</span>
                  <span className="block text-[10px] font-mono font-normal text-amber-700 dark:text-amber-400">
                    Cutting Yield: 72% – 82% (Growth Marks)
                  </span>
                </div>

                {/* Croupon / Butt Center (Prime Zone) */}
                <div className="w-full p-6 rounded-lg bg-[#80420E]/15 dark:bg-[#C89D43]/15 border-2 border-[#80420E]/50 dark:border-[#C89D43]/50 text-sm font-bold text-[#80420E] dark:text-[#E5BE58] my-1 shadow-2xs">
                  <span>Prime Croupon / Butt</span>
                  <span className="block text-[11px] font-mono font-medium text-stone-700 dark:text-stone-300 mt-0.5">
                    Cutting Yield: 88% – 95% (Dense Fibers)
                  </span>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-white/90 dark:bg-[#15120E] rounded text-[9px] uppercase tracking-wider text-[#80420E] dark:text-[#E5BE58] font-bold">
                    Grade A / I Selection Zone
                  </span>
                </div>

                {/* Belly & Flank Flaps */}
                <div className="w-full flex justify-between gap-2 mt-1">
                  <div className="w-1/2 p-2 rounded-bl-lg bg-stone-200/70 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 text-[10px] font-mono text-stone-600 dark:text-stone-300">
                    <span>Left Flank</span>
                    <span className="block text-[9px] text-stone-500 dark:text-stone-400">Yield: 45–60%</span>
                  </div>
                  <div className="w-1/2 p-2 rounded-br-lg bg-stone-200/70 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 text-[10px] font-mono text-stone-600 dark:text-stone-300">
                    <span>Right Flank</span>
                    <span className="block text-[9px] text-stone-500 dark:text-stone-400">Yield: 45–60%</span>
                  </div>
                </div>

              </div>

              <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-4 text-center">
                Inspection performed under 1000-lux neutral D65 daylight frames at Savar tanneries.
              </span>
            </div>

            {/* Zone Descriptions */}
            <div className="lg:col-span-6 space-y-3.5">
              {HIDE_ZONES.map((zone, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#140F0C] shadow-2xs transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-display text-base font-bold text-[#181310] dark:text-[#FAF6F0]">
                      {zone.name}
                    </h5>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      Yield: {zone.yield}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-2">
                    {zone.density}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Ideal For:</span>
                    <span>{zone.idealFor}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* VIEW 3: Tannery Run (TR) Ratio Packs Explainer */}
      {activeView === "tr-packs" && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-800/60 rounded-lg text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">What is Tannery Run (TR)?</strong>
              <p className="mt-0.5 text-amber-900 dark:text-amber-300 leading-relaxed">
                In commercial volume leather export contracts (especially for wet blue and crust shipments), tanneries deliver batches under standardized percentage blends known as <strong>Tannery Run (TR)</strong> rather than 100% single grades. This balances production costs while providing predictable yield ratios.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* TR 1 Pack */}
            <div className="bg-white dark:bg-[#140F0C] border border-stone-200 dark:border-stone-800 rounded-lg p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                  Premium Selection
                </span>
                <h5 className="font-display text-xl font-bold text-[#181310] dark:text-[#FAF6F0]">
                  TR-1 Specification
                </h5>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-4">
                  For top-tier shoe brands and high-grade leather accessories.
                </p>

                {/* Visual Ratio Stack */}
                <div className="space-y-2 mb-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade A (Table I)</span>
                      <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">30%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[30%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade B (Table II)</span>
                      <span className="font-mono font-bold text-[#7A5A17] dark:text-[#E5BE58]">50%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#C89D43] h-full w-[50%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade C (Table III)</span>
                      <span className="font-mono font-bold text-amber-800 dark:text-amber-400">20%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-full w-[20%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400">
                Overall cutting yield averages <strong className="text-stone-900 dark:text-white font-mono">~81%</strong> across container lot.
              </div>
            </div>

            {/* TR 2 Pack */}
            <div className="bg-white dark:bg-[#140F0C] border-2 border-[#C89D43] rounded-xl p-5 flex flex-col justify-between shadow-gold-subtle relative">
              <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-gradient-to-r from-[#D6AC4B] to-[#C89D43] text-stone-950 text-[10px] font-mono uppercase font-bold tracking-wider rounded shadow-xs">
                Most Popular B2B Export
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A5A17] dark:text-[#E5BE58] font-bold block mb-1">
                  Balanced Commercial Standard
                </span>
                <h5 className="font-display text-xl font-bold text-[#181310] dark:text-[#FAF6F0]">
                  TR-2 Specification
                </h5>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-4">
                  Standard benchmark for commercial footwear and volume leather goods.
                </p>

                {/* Visual Ratio Stack */}
                <div className="space-y-2 mb-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade A (Table I)</span>
                      <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">15%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[15%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade B (Table II)</span>
                      <span className="font-mono font-bold text-[#7A5A17] dark:text-[#E5BE58]">45%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#C89D43] h-full w-[45%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade C (Table III)</span>
                      <span className="font-mono font-bold text-amber-800 dark:text-amber-400">30%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-full w-[30%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade D (Table IV)</span>
                      <span className="font-mono font-bold text-stone-700 dark:text-stone-300">10%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-stone-400 h-full w-[10%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400">
                Overall cutting yield averages <strong className="text-stone-900 dark:text-white font-mono">~72%</strong> across container lot.
              </div>
            </div>

            {/* TR 3 Pack */}
            <div className="bg-white dark:bg-[#140F0C] border border-stone-200 dark:border-stone-800 rounded-xl p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold block mb-1">
                  Cost-Optimized / Heavy Emboss
                </span>
                <h5 className="font-display text-xl font-bold text-[#181310] dark:text-[#FAF6F0]">
                  TR-3 Specification
                </h5>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-4">
                  Cost-effective for embossed leather, split suedes, and utility footwear.
                </p>

                {/* Visual Ratio Stack */}
                <div className="space-y-2 mb-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade B (Table II)</span>
                      <span className="font-mono font-bold text-[#7A5A17] dark:text-[#E5BE58]">25%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#C89D43] h-full w-[25%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade C (Table III)</span>
                      <span className="font-mono font-bold text-amber-800 dark:text-amber-400">50%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-full w-[50%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Grade D (Table IV)</span>
                      <span className="font-mono font-bold text-stone-700 dark:text-stone-300">25%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-stone-400 h-full w-[25%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400">
                Overall cutting yield averages <strong className="text-stone-900 dark:text-white font-mono">~61%</strong> across container lot.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Verification Notice */}
      <div className="mt-8 pt-4 border-t border-stone-200/70 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 gap-3">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Piece-by-piece inspection report & grading distribution sheet attached to each dispatch document.</span>
        </div>
        <span className="font-mono text-stone-400 dark:text-stone-500">Tolerance: SATRA / IUP Physical Testing Standards</span>
      </div>

    </div>
  );
};
