'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function RatingForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: 'destructive',
        title: 'Rating required',
        description: 'Please select a star rating before submitting.',
      });
      return;
    }
    // In a real app, you would submit this data to a server
    console.log({ rating, review });
    toast({
      title: 'Review Submitted!',
      description: `You gave a rating of ${rating} star${rating > 1 ? 's' : ''}.`,
    });
    setRating(0);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                'h-6 w-6 cursor-pointer transition-colors',
                (hoverRating || rating) >= star
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-muted-foreground'
              )}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>
      <Textarea
        placeholder="Write your review... (optional)"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="min-h-[100px]"
      />
      <Button type="submit">Submit Review</Button>
    </form>
  );
}
