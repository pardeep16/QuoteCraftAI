import { useRef, useState } from "react";
import { toPng } from 'html-to-image';
import { DownloadIcon } from "lucide-react";

type QuoteCardProps = {
    quoteText: string;
    topic: string;
    tone: string;
    isFavorite?: boolean;
    onToggleFavorite?: () => Promise<void> | void;
    imageUrl?: string;
    language?: string;
};

export default function QuoteCard({ quoteText, topic, tone, isFavorite = false, onToggleFavorite, imageUrl, language }: QuoteCardProps) {

    const [copied, setCopied] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [downloading, setDownloading] = useState(false);

    const copyQuote = async () => {
        await navigator.clipboard.writeText(quoteText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    const downloadImageWithQuote = async () => {
        if (!cardRef.current) return;
        try {
            setDownloading(true);
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: '#111218'
            });
            const link = document.createElement('a');
            link.download = `quotecraft-${topic.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = dataUrl;
            link.click();
        }
        catch (err) {
            console.error("Failed to download image:", err);
        }
        finally {
            setDownloading(false);
        }
    }

    const downloadImage = async () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.download = `quotecraft-image-${topic.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = imageUrl;
        link.click();
    }

    return (
        <div className="quote-card-wrapper">
            <div ref={cardRef} className="quote-card">
                {imageUrl && (
                    <div className="quote-image-banner">
                        <img
                            src={imageUrl}
                            alt={`Visual for "${topic}"`}
                            className="quote-image"
                            loading="lazy"
                            crossOrigin="anonymous"
                        />
                        <div className="quote-image-overlay" />
                    </div>
                )}

                <p className="quote-mark">"</p>
                <p className="quote-text">{quoteText}</p>

                <div className="quote-meta">
                    <span className="meta-pill topic">📌 {topic}</span>
                    <span className="meta-pill tone">🎭 {tone}</span>
                    {language && (
                        <span className="meta-pill bg-emerald-100 border-emerald-300 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-300">
                            🌐 {language}
                        </span>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="quote-actions">
                <button type="button" onClick={copyQuote} className="button secondary sm">
                    {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
            </div>

            {imageUrl && (
                <button type="button" onClick={downloadImage} className="button secondary sm">
                    <DownloadIcon size={16} className="inline" /> Image Only
                </button>)}

            <button type="button" onClick={downloadImageWithQuote} className="button primary sm">
                {downloading ?
                    <>
                        <span className="spinner" /> Exporting…
                    </>
                    : <><DownloadIcon size={16} className="inline" /> Download Image with Quote</>
                }
            </button>
        </div>
    )

}