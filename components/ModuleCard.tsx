
import React from 'react';
import { BrandModule } from '../types';

interface ModuleCardProps {
  module: BrandModule;
  score: number;
  analysis: string;
  subScores: Array<{label: string, value: number}>;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, score, analysis, subScores }) => {
  const getScoreStatus = (s: number) => {
    if (s >= 85) return { label: '战略领先', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (s >= 65) return { label: '市场标准', class: 'bg-blue-100 text-blue-700 border-blue-200' };
    if (s >= 40) return { label: '潜力区间', class: 'bg-amber-100 text-amber-700 border-amber-200' };
    return { label: '风险警戒', class: 'bg-rose-100 text-rose-700 border-rose-200' };
  };

  const status = getScoreStatus(score);
  
  // Color mapping for bars
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600',
    indigo: 'bg-indigo-600',
    teal: 'bg-teal-600',
    emerald: 'bg-emerald-600',
    purple: 'bg-purple-600',
    cyan: 'bg-cyan-600',
    amber: 'bg-amber-600',
    rose: 'bg-rose-600',
    slate: 'bg-slate-600',
    violet: 'bg-violet-600',
  };

  const barColor = colorMap[module.color] || 'bg-slate-600';

  return (
    <div className="module-card bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className={`p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${barColor} text-white shadow-lg shadow-${module.color}-200`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={module.icon} />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">模块 {module.id}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.class}`}>
                    {status.label}
                </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[200px]">{module.title}</p>
          </div>
        </div>
        <div className="flex items-center">
            <div className="text-right">
                <div className="text-2xl font-black text-slate-900 leading-none">{score}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">指数</div>
            </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Visualization Area */}
        <div className="grid grid-cols-1 gap-4">
            <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">维度穿透分析</h4>
                <div className="space-y-3">
                    {subScores.map((ss, idx) => (
                        <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                                <span className="font-semibold text-slate-600">{ss.label}</span>
                                <span className="font-bold text-slate-400">{ss.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${barColor} rounded-full transition-all duration-1000 delay-300`} 
                                    style={{ width: `${ss.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-4 py-1">
          {analysis}
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">核心解构关键词</h4>
          <div className="flex flex-wrap gap-1.5">
            {module.keywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] rounded border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-colors">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
