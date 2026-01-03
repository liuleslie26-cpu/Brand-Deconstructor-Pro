
import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { BRAND_MODULES } from '../constants';
import ModuleCard from './ModuleCard';
import ShareModal from './ShareModal';
import { ShareService } from '../services/shareService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface AnalysisDashboardProps {
  result: AnalysisResult;
  onBack: () => void;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result, onBack }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const chartData = BRAND_MODULES.map(m => ({
    subject: `M${m.id}`,
    A: result.moduleScores[m.id.toString()] || 0,
    fullMark: 100,
  }));

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    const element = document.getElementById('report-content');
    
    if (!element) {
      console.error("Report content element not found");
      setIsGeneratingPDF(false);
      return;
    }

    // Ensure the page is at the top for correct canvas capture
    window.scrollTo(0, 0);

    const opt = {
      margin: 10,
      filename: `${result.brandName.split(' / ')[0]}_Holographic_Report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      // @ts-ignore
      const html2pdf = (window as any).html2pdf;
      if (html2pdf) {
        // Wait a small moment for any final render adjustments
        await new Promise(r => setTimeout(r, 500));
        await html2pdf().set(opt).from(element).save();
      } else {
        throw new Error("html2pdf library not loaded.");
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Action Bar (Sticky, No Print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print sticky top-20 z-40 py-2 px-1 bg-slate-50/80 backdrop-blur-sm">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          重新分析 / Re-analyze
        </button>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            分享报告 / Share
          </button>
          <button 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex-1 md:flex-none px-6 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all disabled:bg-slate-400 flex items-center justify-center gap-2 shadow-lg min-w-[140px]"
          >
            {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  生成中...
                </>
            ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  下载 PDF / Download PDF
                </>
            )}
          </button>
        </div>
      </div>

      {/* Main Report Container (Target for PDF/Print) */}
      <div id="report-content" className="space-y-12 bg-slate-50 p-1 md:p-4">
        {/* Header Section */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 overflow-hidden break-inside-avoid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-blue-600 font-black tracking-widest text-xs uppercase">Brand Holographic Report / 全息品牌报告</span>
                <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">{result.brandName}</h1>
              </div>
              <div className="p-6 bg-slate-900 rounded-2xl border-l-4 border-blue-500">
                <p className="text-slate-100 leading-relaxed text-lg font-medium italic">
                    {result.summary}
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">关键发现 / Key Strategic Insights</h4>
                <div className="flex flex-col gap-3">
                    {result.keyFindings.map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 group hover:border-blue-200 transition-colors">
                            <span className="w-8 h-8 bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center text-sm font-black shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {idx+1}
                            </span>
                            <p className="text-sm font-bold text-slate-700 leading-snug">{finding}</p>
                        </div>
                    ))}
                </div>
              </div>
            </div>
            {/* Capability Radar Chart */}
            <div className="h-[500px] w-full bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-4 relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">全息能力雷达图 / Capability Radar</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                  <Radar
                    name={result.brandName}
                    dataKey="A"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.5}
                    isAnimationActive={false}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* 10 Analysis Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BRAND_MODULES.map((module) => (
            <div key={module.id} className="break-inside-avoid">
              <ModuleCard 
                module={module}
                score={result.moduleScores[module.id.toString()] || 0}
                analysis={result.moduleAnalysis[module.id.toString()] || ""}
                subScores={result.moduleSubScores[module.id.toString()] || []}
              />
            </div>
          ))}
        </div>

        {/* Data Sources / Grounding Information */}
        {result.groundingSources && result.groundingSources.length > 0 && (
          <section className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl overflow-hidden relative break-inside-avoid">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-black">验证性数据源 / Grounding Sources</h3>
                        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Powered by Google Search</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.groundingSources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/30 transition-all no-print"
                    >
                      <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">REFERENCE {idx + 1}</span>
                      <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">{source.title}</span>
                      <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500 font-medium">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        点击访问 / Visit Source
                      </div>
                    </a>
                  ))}
                </div>
            </div>
          </section>
        )}
      </div>

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={ShareService.generateShareLink(result)}
        brandName={result.brandName}
      />
    </div>
  );
};

export default AnalysisDashboard;
