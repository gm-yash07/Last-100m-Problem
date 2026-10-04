import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSpatial } from './components/HeroSpatial';
import { MacroVsMicroComparison } from './components/MacroVsMicroComparison';
import { DigitalTwinExplorer } from './components/DigitalTwinExplorer';
import { SectorCrisisHub } from './components/SectorSimulators/SectorCrisisHub';
import { CoreBarriersExplainer } from './components/CoreBarriersExplainer';
import { MicroGeocodeGenerator } from './components/MicroGeocodeGenerator';
import { ImpactCalculator } from './components/ImpactCalculator';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={scrollToSection} 
      />

      <main className="flex-1">
        {/* Hero Section: The 15-Minute Paradox */}
        <div id="overview">
          <HeroSpatial
            onExploreSimulator={() => scrollToSection('simulator')}
            onExploreSectors={() => scrollToSection('sectors')}
          />
        </div>

        {/* The Macro vs Micro Journey Step-by-Step Simulator */}
        <div id="journey">
          <MacroVsMicroComparison />
        </div>

        {/* Digital Twin & Sub-Metre Floorplan Router */}
        <div id="simulator">
          <DigitalTwinExplorer />
        </div>

        {/* 3 Sector Crises: Logistics, Emergency, Accessibility */}
        <div id="sectors">
          <SectorCrisisHub />
        </div>

        {/* The Four Core Technological & Structural Barriers */}
        <div id="barriers">
          <CoreBarriersExplainer />
        </div>

        {/* Micro-Geocode Address Standard Generator */}
        <div id="generator">
          <MicroGeocodeGenerator />
        </div>

        {/* Enterprise & Municipal ROI Impact Calculator */}
        <div id="calculator">
          <ImpactCalculator />
        </div>
      </main>

      <Footer />
    </div>
  );
}
