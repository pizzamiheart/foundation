import { SearchResult } from '../types';
import { bloggers } from '../../data/bloggers';

const allEssays = bloggers.flatMap(blogger => 
  blogger.essays.map(essay => ({
    essayTitle: essay.title,
    essayUrl: essay.url,
    authorName: blogger.name,
  }))
);

export async function searchEssays(query: string, limit: number = 5): Promise<{
  results: SearchResult[];
  total: number;
}> {
  if (!query?.trim()) {
    return { results: [], total: 0 };
  }

  try {
    const searchPhrase = query.toLowerCase().trim();
    const searchTerms = searchPhrase.split(' ').filter(term => term.length > 0);
    
    const matches = allEssays
      .map(essay => {
        const titleLower = essay.essayTitle.toLowerCase();
        const authorLower = essay.authorName.toLowerCase();
        let relevanceScore = 0;

        // First try exact phrase matching
        if (titleLower.includes(searchPhrase)) {
          relevanceScore += 10;
          if (titleLower.startsWith(searchPhrase)) {
            relevanceScore += 5;
          }
        }
        
        if (authorLower.includes(searchPhrase)) {
          relevanceScore += 8;
          if (authorLower.startsWith(searchPhrase)) {
            relevanceScore += 4;
          }
        }

        // If no exact match, try term matching with AND logic
        if (relevanceScore === 0) {
          const allTermsMatch = searchTerms.every(term => 
            titleLower.includes(term) || authorLower.includes(term)
          );

          if (allTermsMatch) {
            searchTerms.forEach(term => {
              if (titleLower.includes(term)) {
                relevanceScore += 3;
                if (titleLower.startsWith(term)) {
                  relevanceScore += 2;
                }
              }
              if (authorLower.includes(term)) {
                relevanceScore += 1;
              }
            });
          }
        }

        return {
          ...essay,
          relevanceScore
        };
      })
      .filter(essay => essay.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    return {
      results: matches.slice(0, limit),
      total: matches.length
    };
  } catch (error) {
    console.error('Error searching essays:', error);
    return { results: [], total: 0 };
  }
}