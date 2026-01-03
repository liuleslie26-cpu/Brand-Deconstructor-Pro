
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, IndicatorAnalysis, GroundingChunk } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeBrand(brandName: string): Promise<AnalysisResult> {
    const prompt = `You are a world-class Business Analysis Master. 
Perform a holographic deconstruction of the brand: "${brandName}".
Base your analysis on the 10 modules (500 keywords) structure. 

CRITICAL REQUIREMENT: All generated text content (summary, moduleAnalysis, moduleSubScores labels, keyFindings) MUST be provided in BOTH Chinese and English.
Format each field as: "中文内容 / English Content".

Return a JSON object with the specified schema.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brandName: { type: Type.STRING },
            summary: { type: Type.STRING },
            moduleScores: {
              type: Type.OBJECT,
              properties: Object.fromEntries([1,2,3,4,5,6,7,8,9,10].map(i => [i.toString(), {type: Type.NUMBER}])),
              required: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
            },
            moduleSubScores: {
              type: Type.OBJECT,
              properties: Object.fromEntries([1,2,3,4,5,6,7,8,9,10].map(i => [i.toString(), {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                  },
                  required: ["label", "value"]
                }
              }])),
              required: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
            },
            moduleAnalysis: {
              type: Type.OBJECT,
              properties: Object.fromEntries([1,2,3,4,5,6,7,8,9,10].map(i => [i.toString(), {type: Type.STRING}])),
              required: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
            },
            keyFindings: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["brandName", "summary", "moduleScores", "moduleSubScores", "moduleAnalysis", "keyFindings"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk: GroundingChunk) => ({
        title: chunk.web?.title || 'External Source',
        uri: chunk.web?.uri || '#'
      }))
      .filter(s => s.uri !== '#');

    return { ...result, groundingSources: sources };
  }

  async analyzeIndicator(brandName: string, indicator: string): Promise<IndicatorAnalysis> {
    const prompt = `As a senior business analyst, analyze the brand "${brandName}" based on the indicator: "${indicator}".
    
    GUIDELINES:
    1. Output ALL text in bilingual format: "中文内容 / English Content".
    2. Decide if the indicator is "quantitative" (data-driven) or "qualitative" (conceptual).
    3. For quantitative, provide 4-6 dataPoints and pick the best visualizationType:
       - 'bar': For direct comparisons (e.g. market share vs competitors).
       - 'line': For time-based trends.
       - 'pie': For composition/breakdown (e.g. revenue by region).
       - 'radar': For multi-axis profiling (e.g. Brand Strength across 5 attributes).
       - 'area': For high-volume trends or market growth.
       - 'composed': For two metrics (e.g. Sales as bar, Growth % as line - use 'secondaryValue' for the line).
    4. If qualitative, provide 3-4 structuredPoints (title and description).
    5. Always include a sharp bilingual 'analysis' summary (approx 100 words).
    6. Use Google Search grounding for real-world accuracy.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['quantitative', 'qualitative'] },
            visualizationType: { type: Type.STRING, enum: ['bar', 'pie', 'line', 'radar', 'area', 'composed', 'none'] },
            dataPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                  secondaryValue: { type: Type.NUMBER },
                  unit: { type: Type.STRING }
                },
                required: ['label', 'value']
              }
            },
            structuredPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['title', 'description']
              }
            }
          },
          required: ['analysis', 'type', 'visualizationType']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk: GroundingChunk) => ({
        title: chunk.web?.title || 'External Source',
        uri: chunk.web?.uri || '#'
      }))
      .filter(s => s.uri !== '#');

    return {
      ...result,
      sources
    };
  }
}
