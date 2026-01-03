
export interface BrandModule {
  id: number;
  title: string;
  core: string;
  keywords: string[];
  color: string;
  icon: string;
}

export interface AnalysisResult {
  brandName: string;
  summary: string;
  moduleScores: Record<string, number>;
  moduleAnalysis: Record<string, string>;
  moduleSubScores: Record<string, Array<{label: string, value: number}>>;
  keyFindings: string[];
  groundingSources: Array<{
    title: string;
    uri: string;
  }>;
}

export interface IndicatorAnalysis {
  analysis: string;
  type: 'quantitative' | 'qualitative';
  visualizationType: 'bar' | 'pie' | 'line' | 'radar' | 'area' | 'composed' | 'none';
  dataPoints: Array<{ label: string, value: number, secondaryValue?: number, unit?: string }>;
  structuredPoints: Array<{ title: string, description: string }>;
  sources: Array<{ title: string, uri: string }>;
  timestamp?: number;
  indicatorName?: string;
}

export interface HistoryItem {
  brandName: string;
  indicatorName: string;
  analysis: IndicatorAnalysis;
  timestamp: number;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
