import { NextResponse } from 'next/server';

const REBRICKABLE_API_KEY = process.env.REBRICKABLE_API_KEY;
const REBRICKABLE_API_URL = 'https://rebrickable.com/api/v3/lego/sets';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  if (!REBRICKABLE_API_KEY) {
    console.error('Rebrickable API key is not configured');
    return NextResponse.json(
      { error: 'API configuration error. Please contact support.' },
      { status: 500 }
    );
  }

  try {
    console.log('Fetching from Rebrickable API:', {
      url: `${REBRICKABLE_API_URL}/?search=${encodeURIComponent(query)}&page_size=10`,
      hasApiKey: !!REBRICKABLE_API_KEY
    });

    const response = await fetch(
      `${REBRICKABLE_API_URL}/?search=${encodeURIComponent(query)}&page_size=10`,
      {
        headers: {
          'Authorization': `key ${REBRICKABLE_API_KEY}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Rebrickable API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.results) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response format');
    }

    return NextResponse.json({ results: data.results });
  } catch (error) {
    console.error('Error fetching LEGO sets:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch LEGO sets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 