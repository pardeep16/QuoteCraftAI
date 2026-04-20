import React, { useMemo, useState } from "react";

const TOPICS = [
    'success',
    'resilience',
    'creativity',
    'leadership',
    'mindfulness',
    'love',
    'innovation',
    'courage'
];

const TONES = [
    'motivational',
    'inspirational',
    'professional',
    'funny',
    'spiritual',
    'calm',
    'bold'
];
const LANGUAGES = ['english', 'hindi', 'spanish', 'french', 'german', 'chinese', 'japanese', 'arabic'];
const IMAGE_STYLES = ['plain', 'realistic', 'cartoon', 'cinematic', 'abstract', 'vintage', 'minimalist', 'surreal', 'pop art', 'watercolor', 'pixel art', 'line art'];

export type GenerateParams = {
    topic: string;
    tone: string;
    length: number;
    includeImage: boolean;
    language: string;
    imageStyle: string;
};

type QuoteFormProps = {
    loading: boolean;
    error: string | null;
    onSubmit: (quote: GenerateParams) => Promise<void>;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ loading, error, onSubmit }: QuoteFormProps) => {

    const [topicInput, setTopicInput] = useState('success');
    const [selectedTopic, setSelectedTopic] = useState('success');
    const [tone, setTone] = useState('motivational');
    const [length, setLength] = useState(180);

    const [includeImage, setIncludeImage] = useState(false);
    const [imageStyle, setImageStyle] = useState('realistic');
    const [language, setLanguage] = useState('english');
    const topic = useMemo(() => topicInput.trim(), [topicInput]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!topic){
            return;
        }
        await onSubmit({
            topic,
            tone,
            length,
            includeImage,
            language,
            imageStyle
        });
    }

    return (
        <div className="fade-in-up rounded-2xl border border-slate-200 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/55 lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-2xl font-semibold">Create Your Quote</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Describe your idea and let AI bring it to life.
            </p>

            <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Topic</label>
                    <input
                        value={topicInput}
                        onChange={(e) => {
                            setTopicInput(e.target.value);
                            setSelectedTopic('');
                        }}
                        placeholder="e.g. 10 Tips for Better Sleep"
                        maxLength={100}
                        required
                    />
                    <p className="text-right text-xs text-slate-500 dark:text-slate-400">{topicInput.length}/100</p>
                    <div className="tone-pills mt-1">
                        {TOPICS.map((topic) => (
                            <button
                                key={topic}
                                type="button"
                                className={`tone-pill${selectedTopic === topic ? ' selected' : ''}`}
                                onClick={() => {
                                    setSelectedTopic(topic);
                                    setTopicInput(topic);
                                }}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Tone</label>
                    <div className="tone-pills">
                        {TONES.map((item) => (
                            <button
                                key={item}
                                type="button"
                                className={`tone-pill${tone === item ? ' selected' : ''}`}
                                onClick={() => setTone(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        Max Length: <strong className="text-purple-600 dark:text-purple-300">{length}</strong>
                    </label>
                    <input
                        type="range"
                        min={60}
                        max={500}
                        step={20}
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="py-1"
                    />
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                        <input
                            type="checkbox"
                            checked={includeImage}
                            onChange={(e) => setIncludeImage(e.target.checked)}
                            className="size-4 rounded border-slate-300"
                        />
                        Include AI image (optional)
                    </label>

                    {includeImage && (
                        <div className="mt-4 grid gap-4">

                            <div className="form-group">
                                <label>Language</label>
                                <div className="tone-pills">
                                    {LANGUAGES.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            className={`tone-pill${language === item ? ' selected' : ''}`}
                                            onClick={() => setLanguage(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Image Style</label>
                                <div className="tone-pills">
                                    {IMAGE_STYLES.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            className={`tone-pill${imageStyle === item ? ' selected' : ''}`}
                                            onClick={() => setImageStyle(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                    )}
                </div>

                {error && (
                    <p className="error">
                        <span>⚠</span> {error}
                    </p>
                )}

                <button type="submit" disabled={loading} className="button primary w-full py-2.5">
                    {loading ? (
                        <>
                            <span className="spinner" /> Generating...
                        </>
                    ) : (
                        'Generate'
                    )}
                </button>

            </form>
        </div>
    )
}