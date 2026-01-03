
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BRAND_MODULES } from '../constants';
import { GeminiService } from '../services/geminiService';
import { IndicatorAnalysis, HistoryItem } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  AreaChart, Area, ComposedChart, Legend
} from 'recharts';

interface FrameworkPageProps {
  onBack: () => void;
  currentBrand?: string;
}

const FrameworkPage: React.FC<FrameworkPageProps> = ({ onBack, currentBrand = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBrand, setActiveBrand] = useState(currentBrand);
  const [isAnalyzingIndicator, setIsAnalyzingIndicator] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState<{name: string, module: string} | null>(null);
  const [indicatorResult, setIndicatorResult] = useState<IndicatorAnalysis | null>(null);
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedForReport, setSelectedForReport] = useState<string[]>([]);
  const [showCustomReport, setShowCustomReport] = useState(false);
  const [isBatchAnalyzing, setIsBatchAnalyzing] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  // Load history
  useEffect(() => {
    const savedHistory = localStorage.getItem('indicator_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem('indicator_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndicator(null);
        setIndicatorResult(null);
        setShowCustomReport(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Automatically trigger batch analysis when report modal opens
  useEffect(() => {
    if (showCustomReport && activeBrand.trim()) {
      const pending = selectedForReport.filter(name => 
        !history.some(h => h.indicatorName === name && h.brandName === activeBrand)
      );
      if (pending.length > 0) {
        runBatchAnalysis(pending);
      }
    }
  }, [showCustomReport, selectedForReport, history, activeBrand]);

  const runBatchAnalysis = async (pendingNames: string[]) => {
    setIsBatchAnalyzing(true);
    setBatchProgress(0);
    const service = new GeminiService();

    for (let i = 0; i < pendingNames.length; i++) {
      const name = pendingNames[i];
      try {
        const result = await service.analyzeIndicator(activeBrand, name);
        const newItem: HistoryItem = {
          brandName: activeBrand,
          indicatorName: name,
          analysis: result,
          timestamp: Date.now()
        };
        setHistory(prev => [newItem, ...prev].slice(0, 100));
      } catch (err) {
        console.error(`Failed to analyze ${name}`, err);
      }
      setBatchProgress(((i + 1) / pendingNames.length) * 100);
    }
    setIsBatchAnalyzing(false);
  };

  const filteredModules = useMemo(() => BRAND_MODULES.map(module => ({
    ...module,
    keywords: module.keywords.filter(kw => 
      kw.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(module => module.keywords.length > 0), [searchTerm]);

  const colorMap: Record<string, { border: string, text: string, bg: string, accent: string, shadow: string }> = {
    blue: { border: 'border-blue-100', text: 'text-blue-600', bg: 'bg-blue-50', accent: 'bg-blue-600', shadow: 'shadow-blue-200' },
    indigo: { border: 'border-indigo-100', text: 'text-indigo-600', bg: 'bg-indigo-50', accent: 'bg-indigo-600', shadow: 'shadow-indigo-200' },
    teal: { border: 'border-teal-100', text: 'text-teal-600', bg: 'bg-teal-50', accent: 'bg-teal-600', shadow: 'shadow-teal-200' },
    emerald: { border: 'border-emerald-100', text: 'text-emerald-600', bg: 'bg-emerald-50', accent: 'bg-emerald-600', shadow: 'shadow-emerald-200' },
    purple: { border: 'border-purple-100', text: 'text-purple-600', bg: 'bg-purple-50', accent: 'bg-purple-600', shadow: 'shadow-purple-200' },
    cyan: { border: 'border-cyan-100', text: 'text-cyan-600', bg: 'bg-cyan-50', accent: 'bg-cyan-600', shadow: 'shadow-cyan-200' },
    amber: { border: 'border-amber-100', text: 'text-amber-600', bg: 'bg-amber-50', accent: 'bg-amber-600', shadow: 'shadow-amber-200' },
    rose: { border: 'border-rose-100', text: 'text-rose-600', bg: 'bg-rose-50', accent: 'bg-rose-600', shadow: 'shadow-rose-200' },
    slate: { border: 'border-slate-100', text: 'text-slate-600', bg: 'bg-slate-50', accent: 'bg-slate-600', shadow: 'shadow-slate-200' },
    violet: { border: 'border-violet-100', text: 'text-violet-600', bg: 'bg-violet-50', accent: 'bg-violet-600', shadow: 'shadow-violet-200' },
  };

  const handleIndicatorClick = async (kw: string, moduleTitle: string) => {
    setSelectedIndicator({ name: kw, module: moduleTitle });
    if (!activeBrand.trim()) return;

    // Check history first
    const cached = history.find(h => h.indicatorName === kw && h.brandName === activeBrand);
    if (cached) {
      setIndicatorResult(cached.analysis);
      return;
    }

    setIsAnalyzingIndicator(true);
    setIndicatorResult(null);

    const service = new GeminiService();
    try {
        const result = await service.analyzeIndicator(activeBrand, kw);
        setIndicatorResult(result);
        const newHistoryItem: HistoryItem = {
          brandName: activeBrand,
          indicatorName: kw,
          analysis: result,
          timestamp: Date.now()
        };
        setHistory(prev => [newHistoryItem, ...prev.filter(h => h.indicatorName !== kw || h.brandName !== activeBrand)].slice(0, 100));
    } catch (err) {
        console.error("Failed to analyze indicator", err);
    } finally {
        setIsAnalyzingIndicator(false);
    }
  };

  const toggleSelection = (e: React.MouseEvent, kw: string) => {
    e.stopPropagation();
    setSelectedForReport(prev => 
      prev.includes(kw) ? prev.filter(item => item !== kw) : [...prev, kw]
    );
  };

  const handleDownloadCustomReport = async () => {
    setIsExporting(true);
    const element = document.getElementById('custom-report-container');
    if (!element) {
      setIsExporting(false);
      return;
    }

    // Scroll container to top to ensure complete capture
    element.scrollTop = 0;

    const opt = {
      margin: 10,
      filename: `Holographic_Report_${activeBrand.split(' / ')[0] || 'Brand'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        logging: false,
        letterRendering: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      // @ts-ignore
      const html2pdf = (window as any).html2pdf;
      if (html2pdf) {
        await new Promise(r => setTimeout(r, 800)); // Delay for render stabilization
        await html2pdf().set(opt).from(element).save();
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const scrollToModule = (id: number) => {
    const element = document.getElementById(`module-${id}`);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const renderChart = (result: IndicatorAnalysis) => {
    if (result.type !== 'quantitative' || !result.dataPoints.length) return null;
    const data = result.dataPoints;
    const colors = ['#2563eb', '#4f46e5', '#0891b2', '#0d9488', '#9333ea', '#e11d48'];
    const vType = result.visualizationType;

    return (
      <div className="h-[240px] w-full mt-6 bg-slate-50/30 p-4 rounded-2xl border border-slate-100">
        <ResponsiveContainer width="100%" height="100%">
          {vType === 'bar' ? (
            <BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="label" tick={{fontSize: 10}} /><YAxis hide /><Tooltip /><Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} isAnimationActive={false} /></BarChart>
          ) : vType === 'line' ? (
            <LineChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="label" tick={{fontSize: 10}} /><YAxis hide /><Tooltip /><Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} isAnimationActive={false} /></LineChart>
          ) : vType === 'pie' ? (
            <PieChart><Pie data={data} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" isAnimationActive={false}>{data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip /></PieChart>
          ) : vType === 'radar' ? (
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}><PolarGrid /><PolarAngleAxis dataKey="label" tick={{fontSize: 10}} /><Radar dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} isAnimationActive={false} /><Tooltip /></RadarChart>
          ) : <AreaChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="label" /><YAxis hide /><Tooltip /><Area type="monotone" dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.2} isAnimationActive={false} /></AreaChart>}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      
      {/* Floating Report Button */}
      {selectedForReport.length > 0 && (
        <button 
          onClick={() => setShowCustomReport(true)}
          className="fixed bottom-10 right-10 z-[80] bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 hover:scale-105 transition-all font-black group active:scale-95 no-print"
        >
          <div className="flex -space-x-2 overflow-hidden">
             {selectedForReport.slice(0, 3).map((_, i) => (
               <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-blue-500 flex items-center justify-center text-[10px] font-black text-white">
                 {i + 1}
               </div>
             ))}
          </div>
          <span>生成 {selectedForReport.length} 项结构化报告</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </button>
      )}

      {/* History Carousel */}
      {history.length > 0 && (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-4 no-print">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">最近深度解析指标 / DIMENSION HISTORY</h4>
            <button onClick={() => setHistory([])} className="text-[10px] font-bold text-slate-300 hover:text-red-500 transition-colors">清除所有</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {history.map((h, i) => (
              <button 
                key={i} 
                onClick={() => { setSelectedIndicator({ name: h.indicatorName, module: '' }); setIndicatorResult(h.analysis); }}
                className="flex-shrink-0 px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-400 transition-all text-left group min-w-[140px]"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter mb-1">{h.brandName}</span>
                  <span className="text-xs font-black text-slate-800 line-clamp-1">{h.indicatorName.split('/')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Report Modal */}
      {showCustomReport && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md no-print">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">结构化商业情报报告</h3>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded uppercase tracking-widest">{activeBrand}</span>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Selected Dimensions: {selectedForReport.length}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {isBatchAnalyzing && (
                  <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 animate-pulse">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span className="text-xs font-black uppercase">智能解析中 {Math.round(batchProgress)}%</span>
                  </div>
                )}
                <button 
                  onClick={handleDownloadCustomReport}
                  disabled={isExporting || isBatchAnalyzing}
                  className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl disabled:bg-slate-300 flex items-center gap-2 active:scale-95"
                >
                  {isExporting ? '生成 PDF...' : '下载完整报告'}
                </button>
                <button onClick={() => setShowCustomReport(false)} className="p-3 hover:bg-slate-100 rounded-full transition-all text-slate-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            </div>
            
            <div id="custom-report-container" className="flex-1 overflow-y-auto p-12 space-y-16 bg-slate-50/30 scroll-smooth pdf-export-mode">
              <div className="text-center space-y-6 max-w-2xl mx-auto break-inside-avoid">
                <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Secret Portfolio v4.0</div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">{activeBrand}<br/>全息商业解构报告</h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">A Structured Analytical Framework for Strategic Decision Making</p>
                <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-12">
                {selectedForReport.map((name, idx) => {
                  const item = history.find(h => h.indicatorName === name && h.brandName === activeBrand);
                  return (
                    <div key={idx} className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm space-y-10 break-inside-avoid group hover:shadow-xl transition-all duration-500">
                      <div className="flex items-start justify-between border-b border-slate-100 pb-8">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Dimension Intelligence #{idx + 1}</span>
                          <h4 className="text-3xl font-black text-slate-900 tracking-tight">{name}</h4>
                        </div>
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <span className="text-lg font-black">{idx + 1}</span>
                        </div>
                      </div>
                      
                      {!item ? (
                        <div className="py-20 flex flex-col items-center justify-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 gap-4 animate-pulse">
                           <svg className="w-12 h-12 text-slate-200 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           <p className="text-slate-400 font-black text-sm uppercase tracking-widest">智能解析中...</p>
                        </div>
                      ) : (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                          <div className="bg-slate-900 p-10 rounded-[2.5rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5"><svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
                            <p className="relative z-10 text-xl text-slate-100 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-8">
                              "{item.analysis.analysis}"
                            </p>
                          </div>
                          
                          {item.analysis.type === 'quantitative' ? (
                            <div className="space-y-8">
                               <div className="flex items-center gap-4">
                                  <div className="h-0.5 w-12 bg-blue-600 rounded-full"></div>
                                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quant Insight Map</h5>
                               </div>
                               {renderChart(item.analysis)}
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                 {item.analysis.dataPoints.map((dp, i) => (
                                   <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1 truncate">{dp.label}</p>
                                      <p className="text-xl font-black text-slate-900">{dp.value}<span className="text-xs text-slate-400 ml-1">{dp.unit || '%'}</span></p>
                                   </div>
                                 ))}
                               </div>
                            </div>
                          ) : (
                            <div className="space-y-8">
                               <div className="flex items-center gap-4">
                                  <div className="h-0.5 w-12 bg-indigo-600 rounded-full"></div>
                                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Logical Matrix View</h5>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {item.analysis.structuredPoints.map((p, i) => (
                                   <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group/point hover:bg-white hover:shadow-xl transition-all duration-500">
                                      <h6 className="text-lg font-black text-slate-900 mb-3 group-hover/point:text-indigo-600 transition-colors">{p.title}</h6>
                                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{p.description}</p>
                                   </div>
                                 ))}
                               </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Report Footer (visible in PDF) */}
              <div className="pt-20 border-t border-slate-100 text-center space-y-4 break-inside-avoid">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Confidential Business Intelligence • {activeBrand}</p>
                 <p className="text-[9px] text-slate-400 font-bold italic">Generated by BrandDeconstructor Pro AI on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Detail Panel */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${selectedIndicator ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} no-print`}>
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]" onClick={() => { setSelectedIndicator(null); setIndicatorResult(null); }} />
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${selectedIndicator ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">维度深度透视</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 py-0.5 bg-blue-50 rounded">Indicator Detail</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[200px]">{selectedIndicator?.name}</span>
                    </div>
                </div>
                <button onClick={() => { setSelectedIndicator(null); setIndicatorResult(null); }} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 space-y-8 scroll-smooth">
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Analysis Brand</p>
                    <div className="flex gap-2">
                        <input 
                            type="text"
                            placeholder="输入品牌名称 (如 Apple, Tesla...)"
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold text-slate-900"
                            value={activeBrand}
                            onChange={(e) => setActiveBrand(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && selectedIndicator && handleIndicatorClick(selectedIndicator.name, selectedIndicator.module)}
                        />
                        <button 
                            onClick={() => selectedIndicator && handleIndicatorClick(selectedIndicator.name, selectedIndicator.module)}
                            disabled={!activeBrand.trim() || isAnalyzingIndicator}
                            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black disabled:bg-slate-200 disabled:text-slate-400 hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                        >
                            {isAnalyzingIndicator ? <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : "开始分析"}
                        </button>
                    </div>
                </div>

                <div className="relative">
                    {isAnalyzingIndicator ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="relative w-16 h-16"><div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div><div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div></div>
                            <div className="text-center space-y-1"><p className="text-sm font-black text-slate-900 uppercase tracking-widest">Generating Insight</p><p className="text-xs text-slate-500 font-medium">正在检索实时情报并生成可视化图谱...</p></div>
                        </div>
                    ) : indicatorResult ? (
                        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
                            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
                                <p className="relative z-10 text-slate-100 leading-relaxed text-lg font-medium whitespace-pre-line italic">"{indicatorResult.analysis}"</p>
                            </div>

                            <div className="space-y-4">
                               <div className="flex items-center gap-2"><div className="h-0.5 w-6 bg-blue-600 rounded-full" /><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Dimension Rendering</h4></div>
                               {renderChart(indicatorResult)}
                            </div>

                            {indicatorResult.type === 'qualitative' && (
                                <div className="grid grid-cols-1 gap-4">
                                    {indicatorResult.structuredPoints.map((pt, i) => (
                                        <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex gap-4 shadow-sm hover:bg-white hover:border-blue-200 transition-all group">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">{i+1}</div>
                                            <div className="space-y-1"><h5 className="text-sm font-black text-slate-900">{pt.title}</h5><p className="text-xs text-slate-500 leading-relaxed font-medium">{pt.description}</p></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 animate-in fade-in duration-500">
                             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                             <div className="space-y-2"><p className="text-slate-900 font-black">准备深度解构</p><p className="text-xs text-slate-500 font-medium">输入品牌名称，启动单项指标的实时可视化分析。</p></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-6 bg-slate-50 text-center border-t border-slate-100"><p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Deconstructor Pro · Holographic Intelligence</p></div>
        </div>
      </div>

      {/* Main Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 no-print">
        <div className="space-y-6 flex-1">
          <button onClick={onBack} className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"><svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>返回主页 / Back to Home</button>
          <div className="space-y-3">
            <div className="flex items-center gap-3"><span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Methodology v4.0</span><span className="text-slate-300 font-bold">|</span><span className="text-slate-400 text-sm font-bold tracking-tight">BRAND ANALYSIS FRAMEWORK</span></div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">500 项全息解构指标体系</h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">勾选所需指标，系统将自动穿透数据并生成结构化报告。</p>
          </div>
        </div>
        <div className="w-full md:w-96 relative group mt-10 md:mt-0">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
          <input type="text" className="block w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all shadow-xl shadow-slate-100" placeholder="搜索解构指标 (e.g. 长期主义)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {/* Modules & Indicators Grid */}
      <div className="flex flex-col lg:flex-row gap-10 no-print">
        <aside className="lg:w-72 flex-shrink-0 hidden lg:block">
            <div className="sticky top-32 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">快速定位 / NAVIGATION</h4>
                <div className="space-y-1">
                    {BRAND_MODULES.map((m) => (
                        <button key={m.id} onClick={() => scrollToModule(m.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left hover:bg-white hover:shadow-md group`}><div className={`w-2 h-2 rounded-full bg-${m.color}-600 group-hover:scale-150 transition-transform`} /><span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">M{m.id}: {m.title.split(' / ')[0]}</span></button>
                    ))}
                </div>
            </div>
        </aside>

        <div className="flex-1 space-y-12 pb-32">
            {filteredModules.map((module) => {
                const colors = colorMap[module.color] || colorMap.slate;
                return (
                    <section key={module.id} id={`module-${module.id}`} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-500 group">
                        <div className={`p-8 ${colors.bg} border-b ${colors.border} flex flex-col md:flex-row md:items-center justify-between gap-6`}>
                            <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 ${colors.accent} rounded-2xl flex items-center justify-center text-white shadow-xl ${colors.shadow} group-hover:scale-110 transition-transform`}><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={module.icon} /></svg></div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3"><h3 className="text-2xl font-black text-slate-900 leading-tight">M{module.id}: {module.title.split(' / ')[0]}</h3><span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${colors.border} ${colors.text} uppercase`}>Module {module.id}</span></div>
                                    <p className={`text-sm font-black uppercase tracking-widest ${colors.text}`}>{module.title.split(' / ')[1]}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-white grow"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">{module.keywords.map((kw, idx) => {
                            const isSelected = selectedForReport.includes(kw);
                            return (
                                <button key={idx} onClick={() => handleIndicatorClick(kw, module.title)} className={`flex items-start gap-4 py-4 px-3 -mx-3 rounded-2xl text-left transition-all group/item border border-transparent ${isSelected ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'hover:bg-slate-50 hover:border-slate-100'}`}>
                                    <div 
                                        onClick={(e) => toggleSelection(e, kw)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${isSelected ? 'bg-blue-600 border-blue-600 scale-110' : 'border-slate-200 hover:border-blue-400 hover:scale-105'}`}
                                    >
                                        {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className={`text-xs font-black transition-colors ${isSelected ? 'text-blue-700' : 'text-slate-700 group-hover/item:text-blue-600'}`}>{kw.includes(' / ') ? kw.split(' / ')[0].split('. ')[1] || kw.split(' / ')[0].split('.')[1] || kw.split(' / ')[0] : kw}</p>
                                        {kw.includes(' / ') && (<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{kw.split(' / ')[1]}</p>)}
                                    </div>
                                </button>
                            );
                        })}</div></div>
                    </section>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default FrameworkPage;
