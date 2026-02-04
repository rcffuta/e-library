"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Download,
  Loader2,
  Eye,
  MoreVertical,
  Share2,
  Clock,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";
import { trackDownload } from "@/app/actions/download";

// --- Types ---
interface Material {
  id: string;
  title: string;
  type: "PQ" | "NOTE" | "TEXTBOOK";
  year?: string;
  semester?: "FIRST" | "SECOND";
  file_size: number;
  downloads: number;
  file_path: string; // The Cloudinary URL
}

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [imgError, setImgError] = useState(false);

  // --- Helpers ---
  
  // Cloudinary Magic: Change .pdf to .jpg to get the cover page
  const getThumbnailUrl = (url: string) => {
    if (!url) return null;
    // Check if it's a Cloudinary URL
    if (url.includes("cloudinary.com")) {
      // Replace .pdf extension with .jpg
      // Also adds 'w_400' to resize it for performance
      return url.replace(/\.pdf$/i, ".jpg").replace("/upload/", "/upload/w_400,q_auto,f_jpg/");
    }
    return null; // Fallback for non-cloudinary URLs
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getMeta = (type: string) => {
    switch (type) {
      case "PQ": return { label: "PQ", color: "bg-amber-500", icon: Clock };
      case "NOTE": return { label: "Note", color: "bg-blue-600", icon: FileText };
      case "TEXTBOOK": return { label: "Book", color: "bg-purple-600", icon: BookOpen };
      default: return { label: "Doc", color: "bg-gray-600", icon: GraduationCap };
    }
  };

  const meta = getMeta(material.type);
  const thumbnailUrl = getThumbnailUrl(material.file_path);

  // --- Actions ---

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      // Track analytics via server action
      const url = await trackDownload(material.id);
      
      if (url) {
        // Force download or open
        window.open(url, "_blank");
        toast.success("Download started");
      } else {
        toast.error("File unavailable");
      }
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  };

  return (
    <>
      {/* CARD CONTAINER */}
      <div 
        onClick={() => setShowPreview(true)}
        className="group relative flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full"
      >
        
        {/* 1. THUMBNAIL AREA (Aspect Ratio 16:9 or similar for density) */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100 border-b border-gray-100">
          
          {/* Badge (Overlaid for space) */}
          <div className={`absolute top-2 left-2 z-10 ${meta.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1`}>
            <meta.icon className="h-3 w-3" />
            {meta.label}
          </div>

          {/* Image or Fallback */}
          {thumbnailUrl && !imgError ? (
            <Image
              src={thumbnailUrl}
              alt={material.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">
              <FileText className="h-12 w-12" />
            </div>
          )}

          {/* Hover Overlay (Desktop) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-white/30 transition-colors">
              <Eye className="h-4 w-4" /> Preview
            </button>
          </div>
        </div>

        {/* 2. CONTENT AREA */}
        <div className="p-3 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-2" title={material.title}>
            {material.title}
          </h3>

          {/* Metadata Row */}
          <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
               <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-medium">
                  {material.year || "N/A"}
               </span>
               <span>{formatFileSize(material.file_size)}</span>
            </div>
            
            {/* Semester Dot */}
            {material.semester && (
              <span 
                className={`h-2 w-2 rounded-full ${material.semester === 'FIRST' ? 'bg-amber-400' : 'bg-blue-400'}`} 
                title={material.semester === 'FIRST' ? 'Harmattan' : 'Rain'}
              />
            )}
          </div>
        </div>

        {/* 3. ACTION FOOTER (Always visible for mobile) */}
        <div className="px-3 pb-3 pt-0 flex items-center gap-2">
          {/* Download Button (Primary) */}
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-2 rounded-lg transition-colors disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
            Download
          </button>

          {/* Share Button (Secondary) */}
          <button 
            onClick={handleShare}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 4. PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 truncate pr-4">{material.title}</h3>
              <div className="flex gap-2">
                 <button 
                   onClick={handleDownload}
                   className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm"
                 >
                   {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Download className="h-4 w-4"/>}
                   Download
                 </button>
                 <button onClick={() => setShowPreview(false)} className="p-1.5 hover:bg-gray-100 rounded-full">
                   <span className="sr-only">Close</span>
                   <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
            </div>
            {/* PDF Viewer */}
            <div className="flex-1 bg-gray-50">
               <iframe 
                 src={material.file_path} 
                 className="w-full h-full"
                 title="PDF Preview"
               />
            </div>
          </div>
        </div>
      )}
    </>
  );
}