import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export default function VillainPage() {
  const [story, setStory] = useState('');
  const [result, setResult] = useState<null | {
    verdict: 'Innocent Cinnamon Roll' | 'Mildly Problematic' | 'Full-on Villain Arc';
    explanation: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // This is a mock result - in a real app, this would come from an API call
      const verdicts = [
        'Innocent Cinnamon Roll',
        'Mildly Problematic',
        'Full-on Villain Arc'
      ] as const;
      
      const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];
      
      const explanations = {
        'Innocent Cinnamon Roll': "You've done nothing wrong. In fact, you might be too nice for your own good. Protect this sweet soul at all costs!",
        'Mildly Problematic': "You're not the worst, but maybe reconsider some of your life choices. There's room for growth here.",
        'Full-on Villain Arc': "Yikes. You might be the antagonist in someone else's story. Time for some serious self-reflection."
      };
      
      setResult({
        verdict: randomVerdict,
        explanation: explanations[randomVerdict]
      });
      
      setIsLoading(false);
    }, 1500);
  };

  // Function to get the appropriate emoji based on the verdict
  const getVerdictEmoji = (verdict: string | undefined) => {
    switch (verdict) {
      case 'Innocent Cinnamon Roll':
        return '😇';
      case 'Mildly Problematic':
        return '😬';
      case 'Full-on Villain Arc':
        return '😈';
      default:
        return '❓';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
          Am I The Villain? 🧐
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-2xl mx-auto">
          Confess your drama. Let AI judge you.
        </p>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea 
                placeholder="Tell us your story... What did you do? Why are you questioning your moral compass?" 
                className="min-h-[200px] text-lg p-4 border-purple-200 focus:border-purple-400"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                disabled={isLoading || story.trim().length < 10}
                className="w-full py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isLoading ? "Judging you..." : "Am I the Villain? 🔍"}
              </Button>
            </form>

            {/* Result Card */}
            {result && (
              <Card className="p-6 border-2 shadow-lg animate-in fade-in slide-in-from-bottom duration-300">
                <div className="text-center mb-4">
                  <span className="text-5xl">{getVerdictEmoji(result.verdict)}</span>
                  <h3 className="text-2xl font-bold mt-2 text-purple-800">{result.verdict}</h3>
                </div>
                <p className="text-gray-700 text-lg">{result.explanation}</p>
              </Card>
            )}
          </div>
          
          {/* Info Section */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="p-6 border-purple-200">
              <h3 className="text-xl font-bold mb-3 text-purple-800">How It Works 🧠</h3>
              <p className="text-gray-700">Our advanced AI (powered by Flask + GPT) analyzes your story for moral nuance, social dynamics, and ethical considerations to determine if you're the bad guy in your situation.</p>
            </Card>
            
            <Card className="p-6 border-pink-200">
              <h3 className="text-xl font-bold mb-3 text-pink-800">Testimonials 💕</h3>
              <ul className="space-y-4">
                <li className="p-3 bg-pink-50 rounded-lg">
                  "AI told me I'm a cinnamon roll. I cried." <span className="block text-sm text-right">— Anonymous</span>
                </li>
                <li className="p-3 bg-purple-50 rounded-lg">
                  "Found out I'm on a villain arc. Very helpful, 10/10 would get judged again." <span className="block text-sm text-right">— Definitely Not A Villain</span>
                </li>
                <li className="p-3 bg-pink-50 rounded-lg">
                  "This app saved my relationship. Turns out I was mildly problematic!" <span className="block text-sm text-right">— Working On It</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 text-center text-gray-600">
        <p>Built with sarcasm and code. © 2025</p>
      </footer>
    </div>
  );
}
