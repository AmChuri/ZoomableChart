import { defaultLocale } from '@/locales/config';
import { getLocales } from '@/locales/dictionary';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
  NextRequest,
  NextResponse,
  type NextFetchEvent,
} from 'next/server';

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  };
  const languages = new Negotiator({ headers }).languages();
  const locales = getLocales();

  const locale = match(languages, locales, defaultLocale);
  const response = NextResponse.next();
  if (!request.cookies.get('locale')) {
    response.cookies.set('locale', locale);
  }

  return response;
}
