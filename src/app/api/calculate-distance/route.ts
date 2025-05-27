import { NextResponse } from 'next/server';

// Our business address - replace with your actual address
const BUSINESS_ADDRESS = '123 Main St, Your City, State ZIP';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address is required' },
      { status: 400 }
    );
  }

  try {
    // Get Google Maps API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured');
    }

    // Encode addresses for URL
    const origins = encodeURIComponent(BUSINESS_ADDRESS);
    const destinations = encodeURIComponent(address);

    // Call Google Maps Distance Matrix API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Failed to calculate distance');
    }

    // Extract distance in miles
    const distanceInMeters = data.rows[0].elements[0].distance.value;
    const distanceInMiles = Math.round(distanceInMeters * 0.000621371); // Convert meters to miles

    return NextResponse.json({ distance: distanceInMiles });
  } catch (error) {
    console.error('Error calculating distance:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to calculate distance' },
      { status: 500 }
    );
  }
} 