import { useState } from "react";
import { QuoteForm, type GenerateParams } from "../components/generate/QuoteForm";
import { QuotePreview } from "../components/generate/QuotePreview";
import type { Quote } from "../types";
import { generateQuote, generateQuoteWithImage } from "../api/quote";


export const GeneratePage = () => {

    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

    const onSubmit = async (quote: GenerateParams) => {
        setLoading(true);
        setError(null);
        setIsGeneratingImage(quote.includeImage);

        try{
            if(quote.includeImage){
                const quoteStyle = quote.tone;
                const response = await generateQuoteWithImage({
                    language: quote.language,
                    quoteStyle,
                    imageStyle: quote.imageStyle,
                    theme: quote.topic
                });
                setQuote(response);
            }
            else{
                const res = await generateQuote({
                    topic: quote.topic,
                    tone: quote.tone,
                    length: quote.length
                })

                setQuote(res);
            }
        }
        catch(err){
        }
        finally{
            setLoading(false);
        }

    }

    function toggleRecentFavorite(): Promise<void> {
        throw new Error("Function not implemented.");
    }

    return (
        <section className="page">
            <header className="page-header fade-in-up rounded-2xl border border-slate-200 bg-white/75 p-6 dark:border-slate-800 dark:bg-slate-900/45">
                <span className="eyebrow">Generate</span>
                <h2>
                    Create your{' '}
                    <span className="bg-gradient-to-r from-[#923FEF] to-[#C35DE8] bg-clip-text text-transparent">
                        Quote
                    </span>
                </h2>
                <p>Generate text quotes and optionally include AI image output in a single workflow.</p>
            </header>
            <div className="grid gap-5 lg:grid-cols-2">
                <QuoteForm loading={loading} error={error} onSubmit={onSubmit} />
                <QuotePreview loading={loading} includeImage={isGeneratingImage} quote={quote} onToggleFavorite={toggleRecentFavorite} />
            </div>
        </section>
    );
}