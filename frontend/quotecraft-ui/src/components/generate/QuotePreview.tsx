import type { Quote } from "../../types";


type QuotePreviewProps = {
    loading: boolean;
    includeImage: boolean;
    quote: Quote | null;
    onToggleFavorite: () => Promise<void>;
};
export const QuotePreview: React.FC<QuotePreviewProps> = ({ loading, includeImage, quote, onToggleFavorite }: QuotePreviewProps) => {
    return (
        <div className="fade-in-up rounded-2xl border border-slate-200 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/55">
            <h3 className="text-2xl font-semibold">Preview</h3>

            {!quote && !loading && (
                <div className="mt-4 flex min-h-[470px] items-center justify-center rounded-xl border border-dashed border-slate-300 text-center dark:border-slate-700">
                    <div>
                        <p className="text-lg font-medium">Generate your first quote</p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Fill out the form and click Generate.
                        </p>
                    </div>
                </div>
            )}

            {loading && (
                <div className="mt-4 flex min-h-[470px] items-center
                 justify-center rounded-xl border border-dashed border-slate-300
                  text-center dark:border-slate-700">
                    <div className="inline-flex flex-col items-center gap-3">
                        <span className="spinner size-8" />
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {includeImage ? 'Generating quote + image preview...' : 'Generating quote preview...'}
                        </p>
                    </div>
                </div>
            )}
            {quote && !loading && (<></>)}

        </div>
    )
}