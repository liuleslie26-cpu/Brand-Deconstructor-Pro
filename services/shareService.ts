
import { AnalysisResult } from "../types";

export class ShareService {
  /**
   * Encodes the analysis result into a compressed base64 string suitable for URL parameters.
   */
  static encodeReport(result: AnalysisResult): string {
    try {
      const jsonString = JSON.stringify(result);
      // We use btoa and encodeURIComponent. 
      // For larger payloads, a compression library would be better, 
      // but for this scope, standard encoding is sufficient for most browsers (2-8KB).
      return btoa(unescape(encodeURIComponent(jsonString)));
    } catch (e) {
      console.error("Failed to encode report", e);
      return "";
    }
  }

  /**
   * Decodes a report string from a URL parameter back into an AnalysisResult object.
   */
  static decodeReport(encoded: string): AnalysisResult | null {
    try {
      const jsonString = decodeURIComponent(escape(atob(encoded)));
      return JSON.parse(jsonString) as AnalysisResult;
    } catch (e) {
      console.error("Failed to decode report", e);
      return null;
    }
  }

  /**
   * Generates the full shareable URL.
   */
  static generateShareLink(result: AnalysisResult): string {
    const encoded = this.encodeReport(result);
    const url = new URL(window.location.href);
    url.searchParams.set('report', encoded);
    return url.toString();
  }
}
