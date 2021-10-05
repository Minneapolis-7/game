import text from '@/shared/const/text';

export default function translateErrorMessage(phrase: string): string {
  return text.serverResponses?.[phrase] || phrase;
}
