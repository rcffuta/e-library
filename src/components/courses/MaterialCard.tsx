"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    FileText,
    Download,
    Loader2,
    BookOpen,
    GraduationCap,
    Clock,
    Eye,
    ExternalLink,
    X,
    Share2,
    Star,
} from "lucide-react";
import { toast } from "sonner";

// Define the shape of a material based on your DB schema
interface Material {
    id: string;
    title: string;
    type: "PQ" | "NOTE" | "TEXTBOOK";
    year?: string;
    semester?: "FIRST" | "SECOND";
    file_size: number;
    downloads: number;
    // For demo purposes, we'll use a static PDF path
    pdf_url?: string;
}

interface MaterialCardProps {
    material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [pdfThumbnail, setPdfThumbnail] = useState<string | null>(null);
    const [thumbnailLoading, setThumbnailLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [pdfUrl] = useState("/data/The Power of Self-Confidence_ Become Unstoppable, Irresistible, and Unafraid in Every Area of Your Life ( PDFDrive ).pdf");

    // Generate PDF thumbnail on component mount
    useEffect(() => {
        const generateThumbnail = async () => {
            try {
                setThumbnailLoading(true);
                
                // Create a canvas to render the PDF first page
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                // For demo purposes, we'll create a placeholder thumbnail
                // In production, you'd use PDF.js or similar library
                canvas.width = 200;
                canvas.height = 260;
                
                if (context) {
                    // Create a simple PDF-like thumbnail
                    context.fillStyle = '#ffffff';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Add border
                    context.strokeStyle = '#e5e7eb';
                    context.lineWidth = 2;
                    context.strokeRect(0, 0, canvas.width, canvas.height);
                    
                    // Add some text lines to simulate PDF content
                    context.fillStyle = '#374151';
                    context.font = '12px Arial';
                    
                    // Title area
                    context.fillStyle = '#1f2937';
                    context.font = 'bold 14px Arial';
                    const title = material.title.substring(0, 25) + '...';
                    context.fillText(title, 10, 30);
                    
                    // Content lines
                    context.fillStyle = '#6b7280';
                    context.font = '10px Arial';
                    for (let i = 0; i < 15; i++) {
                        const y = 50 + (i * 12);
                        const width = Math.random() * 150 + 30;
                        context.fillRect(10, y, width, 2);
                    }
                    
                    // Add type badge
                    context.fillStyle = getTypeStyles(material.type).bg === 'bg-amber-50' ? '#fef3c7' : 
                                       getTypeStyles(material.type).bg === 'bg-blue-50' ? '#dbeafe' : '#f3e8ff';
                    context.fillRect(10, 200, 80, 20);
                    context.fillStyle = '#374151';
                    context.font = '8px Arial';
                    context.fillText(getTypeStyles(material.type).label, 15, 212);
                    
                    setPdfThumbnail(canvas.toDataURL());
                }
            } catch (error) {
                console.error('Failed to generate thumbnail:', error);
            } finally {
                setThumbnailLoading(false);
            }
        };

        generateThumbnail();
    }, [material.title, material.type]);

    // Helper: Format bytes to human readable string (KB/MB)
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Helper: Visual styling based on material type
    const getTypeStyles = (type: string) => {
        switch (type) {
            case "PQ":
                return {
                    label: "Past Question",
                    icon: Clock,
                    bg: "bg-amber-50",
                    text: "text-amber-700",
                    border: "border-amber-100",
                    iconBg: "bg-amber-100",
                };
            case "NOTE":
                return {
                    label: "Lecture Note",
                    icon: FileText,
                    bg: "bg-blue-50",
                    text: "text-blue-700",
                    border: "border-blue-100",
                    iconBg: "bg-blue-100",
                };
            case "TEXTBOOK":
                return {
                    label: "Textbook",
                    icon: BookOpen,
                    bg: "bg-purple-50",
                    text: "text-purple-700",
                    border: "border-purple-100",
                    iconBg: "bg-purple-100",
                };
            default:
                return {
                    label: "Resource",
                    icon: GraduationCap,
                    bg: "bg-gray-50",
                    text: "text-gray-700",
                    border: "border-gray-200",
                    iconBg: "bg-gray-100",
                };
        }
    };

    const styles = getTypeStyles(material.type);
    const Icon = styles.icon;

    // The Interaction Logic
    const handleDownload = async () => {
        setIsLoading(true);
        try {
            // 1. Call Server Action to track stats and get URL (for production)
            // const url = await trackDownload(material.id);
            
            // For demo, use the static PDF
            const url = pdfUrl;

            if (url) {
                // 2. Create download link
                const link = document.createElement('a');
                link.href = url;
                link.download = `${material.title}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                toast.success("Download started successfully!");
            } else {
                toast.error("File not found or access denied.");
            }
        } catch (error) {
            toast.error("Failed to initiate download.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: material.title,
                    text: `Check out this ${styles.label.toLowerCase()}: ${material.title}`,
                    url: window.location.href,
                });
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            }
        } catch (error) {
            toast.error("Failed to share material.");
        }
    };

    const openInNewTab = () => {
        window.open(pdfUrl, '_blank');
    };

    return (
        <>
            <div
                className={`group relative flex flex-col rounded-2xl border ${styles.border} bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 cursor-pointer overflow-hidden`}
                onClick={handlePreview}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Gradient Overlay for Hover Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                
                {/* Header: Icon & Type Badge */}
                <div className="relative p-5 pb-0">
                    <div className="flex items-start justify-between mb-4">
                        <div
                            className={`h-12 w-12 rounded-xl ${styles.iconBg} ${styles.text} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                            <Icon className="h-6 w-6" />
                        </div>
                        <span
                            className={`px-3 py-1.5 rounded-full text-xs font-bold ${styles.bg} ${styles.text} border ${styles.border} shadow-sm backdrop-blur-sm`}
                        >
                            {styles.label}
                        </span>
                    </div>
                </div>

                {/* Enhanced PDF Preview Thumbnail */}
                <div className="relative px-5 mb-4">
                    <div className="rounded-xl overflow-hidden border-2 border-gray-100 group-hover:border-gray-200 transition-all duration-300 bg-white shadow-lg">
                        {thumbnailLoading ? (
                            <div className="aspect-3/4 flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
                                <div className="text-center">
                                    <Loader2 className="h-8 w-8 text-gray-400 mx-auto mb-2 animate-spin" />
                                    <p className="text-xs text-gray-500">Generating preview...</p>
                                </div>
                            </div>
                        ) : pdfThumbnail ? (
                            <div className="relative aspect-3/4 group/thumbnail">
                                <Image 
                                    src={pdfThumbnail} 
                                    alt={`${material.title} preview`}
                                    width={200}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                                {/* Hover Play Overlay */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumbnail:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-90 group-hover/thumbnail:scale-100 transition-transform duration-300">
                                        <Eye className="h-6 w-6 text-rcf-navy" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="aspect-3/4 flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
                                <div className="text-center p-4">
                                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-xs text-gray-500">PDF Document</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Quick Preview Button */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePreview();
                                }}
                                className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-rcf-navy p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Body: Title & Details */}
                <div className="px-5 flex-1 space-y-4 mb-6">
                    <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-rcf-navy transition-colors duration-300 text-lg">
                        {material.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2">
                        {material.year && (
                            <span className="bg-linear-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-full text-xs text-gray-700 font-semibold border border-gray-200 shadow-sm">
                                📅 {material.year}
                            </span>
                        )}
                        {material.semester && (
                            <span className="bg-linear-to-r from-blue-50 to-blue-100 px-3 py-1.5 rounded-full text-xs text-blue-700 font-semibold border border-blue-200 shadow-sm">
                                🌤️ {material.semester === "FIRST" ? "Harmattan" : "Rain"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Enhanced Footer: Stats & Actions */}
                <div className="px-5 pb-5 space-y-4">
                    {/* File Stats with Better Icons */}
                    <div className="flex items-center justify-between text-sm bg-gray-50/70 rounded-xl p-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="font-semibold">{formatFileSize(material.file_size || 5000000)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>{material.downloads || 32} downloads</span>
                            </div>
                        </div>
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePreview();
                            }}
                            className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rcf-navy to-rcf-navy-light px-4 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-rcf-navy/30 hover:scale-105 active:scale-95"
                        >
                            <Eye className="h-4 w-4" />
                            <span>Preview</span>
                        </button>
                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openInNewTab();
                            }}
                            className="flex items-center justify-center rounded-xl bg-linear-to-r from-gray-100 to-gray-200 p-3 text-gray-700 transition-all hover:shadow-md hover:scale-105 active:scale-95"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDownload();
                            }}
                            disabled={isLoading}
                            className="flex items-center justify-center rounded-xl bg-linear-to-r from-rcf-gold to-amber-300 p-3 text-rcf-navy transition-all hover:shadow-lg hover:shadow-rcf-gold/30 hover:scale-105 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 disabled:shadow-none"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="h-4 w-4" />
                            )}
                        </button>
                    </div>

                    {/* Share Button - Full Width */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShare();
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-50 to-pink-50 px-4 py-2.5 text-sm font-semibold text-purple-700 border border-purple-200 transition-all hover:shadow-md hover:scale-105 active:scale-95"
                    >
                        <Share2 className="h-4 w-4" />
                        <span>Share Material</span>
                    </button>
                </div>
            </div>

            {/* PDF Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-full max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className={`h-8 w-8 rounded-lg ${styles.iconBg} ${styles.text} flex items-center justify-center`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 line-clamp-1">{material.title}</h3>
                                    <p className="text-sm text-gray-500">{styles.label} • {formatFileSize(material.file_size)}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={openInNewTab}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Open in New Tab
                                </button>
                                <button
                                    onClick={handleDownload}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rcf-navy hover:bg-rcf-navy-light rounded-lg transition-colors disabled:bg-gray-300"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="h-4 w-4" />
                                            Download
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 p-6">
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full rounded-lg border border-gray-200"
                                title={material.title}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
