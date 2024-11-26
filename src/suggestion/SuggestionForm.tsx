import React, { useState } from 'react';
import { Send, Plus } from 'lucide-react';
import { Essay, FormData } from './types';
import EssayInput from './EssayInput';
import SuccessMessage from './SuccessMessage';
import { validateForm } from './validation';
import { submitSuggestion } from './api';

export default function SuggestionForm() {
  const [authorName, setAuthorName] = useState('');
  const [submitterTwitter, setSubmitterTwitter] = useState('');
  const [essays, setEssays] = useState<Essay[]>([{ title: '', url: '' }]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const addEssay = () => {
    if (essays.length < 3) {
      setEssays([...essays, { title: '', url: '' }]);
    }
  };

  const removeEssay = (index: number) => {
    if (essays.length > 1) {
      setEssays(essays.filter((_, i) => i !== index));
    }
  };

  const updateEssay = (index: number, field: keyof Essay, value: string) => {
    const newEssays = [...essays];
    newEssays[index] = { ...newEssays[index], [field]: value };
    setEssays(newEssays);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm(authorName, essays, submitCount, lastSubmitTime);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    setIsSubmitting(true);
    const now = Date.now();

    try {
      const formData: FormData = {
        authorName,
        submitterTwitter,
        essays: essays.map(essay => ({
          title: essay.title,
          url: essay.url
        }))
      };

      await submitSuggestion(formData);

      setIsSubmitted(true);
      setSubmitCount(prev => prev + 1);
      setLastSubmitTime(now);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit suggestion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-lg overflow-hidden bg-black border-2 border-white/20 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Suggest an Author</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-white/80 mb-2">
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g., Paul Graham"
              required
            />
          </div>

          <div>
            <label htmlFor="submitterTwitter" className="block text-sm font-medium text-white/80 mb-2">
              Your Twitter Handle (optional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2 text-white/40">@</span>
              <input
                type="text"
                id="submitterTwitter"
                value={submitterTwitter}
                onChange={(e) => setSubmitterTwitter(e.target.value)}
                className="w-full px-4 py-2 pl-8 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="username"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-white/80">
                Essays
              </label>
              {essays.length < 3 && (
                <button
                  type="button"
                  onClick={addEssay}
                  className="flex items-center gap-1 text-sm text-white/80 hover:text-red-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Essay
                </button>
              )}
            </div>
            {essays.map((essay, index) => (
              <EssayInput
                key={index}
                index={index}
                essay={essay}
                canRemove={essays.length > 1}
                onRemove={removeEssay}
                onChange={updateEssay}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
          </button>
        </form>
      </div>
    </div>
  );
}