
import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  brandName: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl, brandName }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const shareViaWebAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${brandName} - 全息品牌拆解报告`,
          text: `查看基于 BrandDeconstructor Pro 的 ${brandName} 深度商业分析报告。`,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">分享分析报告</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">报告链接</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={shareUrl} 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none"
              />
              <button 
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                {copied ? '已复制' : '复制'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {navigator.share && (
              <button 
                onClick={shareViaWebAPI}
                className="flex items-center justify-center gap-2 p-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-bold text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                系统原生分享
              </button>
            )}
            <a 
              href={`https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`【全息品牌分析】${brandName}的商业底牌究竟是什么？查看深度报告：`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-bold text-sm"
            >
              分享到微博
            </a>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 text-center">
          <p className="text-xs text-slate-400">
            报告数据已编码至 URL 中，无需后台存储，链接永久有效。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
