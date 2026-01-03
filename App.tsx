
import React, { useState, useCallback, useEffect } from 'react';
import { GeminiService } from './services/geminiService';
import { AnalysisResult } from './types';
import AnalysisDashboard from './components/AnalysisDashboard';
import FrameworkPage from './components/FrameworkPage';
import { ShareService } from './services/shareService';
import { BRAND_MODULES } from './constants';

const App: React.FC = () => {
  const [brandInput, setBrandInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFramework, setShowFramework] = useState(false);

  // Check for shared report in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedReport = params.get('report');
    if (encodedReport) {
      const decoded = ShareService.decodeReport(encodedReport);
      if (decoded) {
        setResult(decoded);
        setBrandInput(decoded.brandName.split(' / ')[0]); // Extract main name
      } else {
        setError('无法加载分享的报告。链接可能已损坏或格式不正确。 / Unable to load shared report.');
      }
    }
  }, []);

  const handleBack = () => {
    setResult(null);
    setShowFramework(false);
    // Clear URL param when going back
    const url = new URL(window.location.href);
    url.searchParams.delete('report');
    window.history.replaceState({}, '', url.toString());
  };

  const handleAnalyze = useCallback(async () => {
    if (!brandInput.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setShowFramework(false);

    const service = new GeminiService();
    try {
      const analysis = await service.analyzeBrand(brandInput);
      setResult(analysis);
      
      // Update title
      document.title = `${brandInput} - 全息品牌分析报告 / Holographic Report`;
    } catch (err) {
      console.error(err);
      setError('分析过程中发生错误，请检查网络或稍后重试。 / Error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [brandInput]);

  if (showFramework) {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 glass-morphism no-print">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleBack}>
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                BrandDeconstructor <span className="text-blue-600">Pro</span>
              </span>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-6 py-12">
          <FrameworkPage onBack={handleBack} currentBrand={brandInput} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Navigation / Header */}
      <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 glass-morphism no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center cursor-pointer" onClick={handleBack}>
              <span className="text-white font-black text-lg">B</span>
            </div>
            <span 
              className="text-xl font-bold text-slate-800 tracking-tight cursor-pointer"
              onClick={handleBack}
            >
              BrandDeconstructor <span className="text-blue-600">Pro</span>
            </span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <button onClick={() => setShowFramework(true)} className="hover:text-blue-600 transition-colors">500 Index Framework</button>
            <span className="hover:text-slate-900 cursor-default">Holographic Deconstruction</span>
            <span className="hover:text-slate-900 cursor-default">Gemini 3 Pro Engine</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        {/* Search Hero */}
        {!result && !isAnalyzing && (
          <div className="search-hero max-w-4xl mx-auto text-center mb-24 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest animate-bounce">
              Deep Business Intelligence Platform
            </div>
            <h2 className="text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              洞穿商业本质，<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">解构品牌底层基因</span>
            </h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
              输入品牌名称，启动基于 <span className="text-slate-900 font-bold">500 个核心关键词</span>、<span className="text-slate-900 font-bold">10 个专业维度</span> 的全息商业拆解。
            </p>
            
            <div className="flex gap-2 p-2 bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl mx-auto transform transition-transform focus-within:scale-[1.02]">
              <input
                type="text"
                placeholder="输入品牌 (例如: Apple, Tesla, 瑞幸咖啡...)"
                className="flex-1 px-6 py-4 bg-transparent outline-none text-slate-800 text-lg font-medium"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                disabled={isAnalyzing}
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !brandInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 transition-all flex items-center gap-2 group"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    正在解构...
                  </>
                ) : (
                  <>
                    启动分析
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-20 space-y-10 no-print max-w-3xl mx-auto">
            <div className="relative w-32 h-32">
                <div className="absolute top-0 left-0 w-full h-full border-[6px] border-slate-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-[6px] border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-black text-xl">
                    {brandInput ? brandInput[0].toUpperCase() : 'B'}
                </div>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-black text-slate-900">全息分析引擎深度检索中</h3>
              <p className="text-slate-500 text-lg">正在扫描 Google Search 实时资讯并映射 10 大商业维度...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto p-8 bg-red-50 border border-red-200 rounded-3xl text-red-700 text-center no-print shadow-xl shadow-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <p className="text-xl font-black mb-2">分析引擎受阻</p>
            <p className="text-sm font-medium mb-6 opacity-80">{error}</p>
            <button 
              onClick={() => { setError(null); handleBack(); }}
              className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              返回重新输入
            </button>
          </div>
        )}

        {/* Analysis Dashboard */}
        {result && !isAnalyzing && (
            <AnalysisDashboard result={result} onBack={handleBack} />
        )}

        {/* Dimensions Display at Bottom */}
        {!result && !isAnalyzing && (
            <div className="footer-index mt-32 space-y-12">
                <div className="flex items-end justify-between border-b border-slate-200 pb-6">
                    <div>
                        <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-2">The Analysis Framework</h3>
                        <h4 className="text-4xl font-black text-slate-900 tracking-tight">10 个全息分析维度 / 10 Dimensions</h4>
                    </div>
                    <button 
                        onClick={() => setShowFramework(true)}
                        className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                    >
                        查看 500 个完整指标 / View Full Index
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {BRAND_MODULES.map((m) => (
                        <div 
                            key={m.id} 
                            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                            onClick={() => setShowFramework(true)}
                        >
                            <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-white bg-${m.color}-600 shadow-lg shadow-${m.color}-100 group-hover:scale-110 transition-transform`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={m.icon} />
                                </svg>
                            </div>
                            <h5 className="font-black text-slate-900 text-sm mb-2 leading-snug">
                                M{m.id}: {m.title.split(' / ')[0]}
                            </h5>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">{m.title.split(' / ')[1]}</p>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2">
                                {m.core}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;
