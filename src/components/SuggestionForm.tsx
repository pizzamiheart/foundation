import React, { useState } from 'react';
import { Send, Plus, Minus, CheckCircle2 } from 'lucide-react';

interface Essay {
  title: string;
  url: string;
}

export default function SuggestionForm({ onClose }: { onClose: () => void }) {
  const [authorName, setAuthorName] = useState('');
  const [submitterTwitter, setSubmitterTwitter] = useState('');
  const [essays, setEssays] = useState<Essay[]>([{ title: '', url: '' }]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addEssay = () => {
    setEssays([...essays, { title: '', url: '' }]);
  };

  const removeEssay = (index: number) => {
    setEssays(essays.filter((_, i) => i !== index));
  };

  const updateEssay = (index: number, field: keyof Essay, value: string) => {
    const newEssays = [...essays];
    newEssays[index] = { ...newEssays[index], [field]: value };
    setEssays(newEssays);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg overflow-hidden bg-black border-2 border-white/20 p-8 text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold text-white mb-2">Thank you!</h2>
          <p className="text-white/80">Your suggestion has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form
        name="suggestions"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);

          const formData = new FormData(e.target as HTMLFormElement);
          formData.append("form-name", "suggestions");
          essays.forEach((essay, index) => {
            formData.append(`essayTitle${index}`, essay.title);
            formData.append(`essayUrl${index}`, essay.url);
          });

          fetch("/", {
            method: "POST",
            body: formData
          })
            .then(() => setIsSubmitted(true))
            .catch(error => console.error(error))
            .finally(() => setIsSubmitting(false));
        }}
        className="space-y-6"
      >
        <input type="hidden" name="form-name" value="suggestions" />
        <input type="hidden" name="bot-field" />
        
        <div className="rounded-lg overflow-hidden bg-black border-2 border-white/20 p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="authorName" className="block text-sm font-medium text-white mb-1">
                Author Name *
              </label>
              <input
                type="text"
                id="authorName"
                name="authorName"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-white mb-1">
                Recommended Essays *
              </label>
              {essays.map((essay, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name={`essayTitle${index}`}
                      required
                      placeholder="Essay title"
                      value={essay.title}
                      onChange={(e) => updateEssay(index, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      name={`essayUrl${index}`}
                      required
                      placeholder="URL"
                      value={essay.url}
                      onChange={(e) => updateEssay(index, 'url', e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {essays.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEssay(index)}
                        className="p-2 text-white/60 hover:text-red-500 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {essays.length < 3 && (
                <button
                  type="button"
                  onClick={addEssay}
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-red-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add another essay
                </button>
              )}
            </div>

            <div>
              <label htmlFor="submitterTwitter" className="block text-sm font-medium text-white mb-1">
                Your Twitter Handle (optional)
              </label>
              <input
                type="text"
                id="submitterTwitter"
                name="submitterTwitter"
                value={submitterTwitter}
                onChange={(e) => setSubmitterTwitter(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit suggestion'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}