import * as vader from 'vader-sentiment';

interface VaderSentiment {
  neg: number;
  neu: number;
  pos: number;
  compound: number;
}

export const vaderSentiment = (text: string): VaderSentiment => {
  const sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  return sentiment;
};