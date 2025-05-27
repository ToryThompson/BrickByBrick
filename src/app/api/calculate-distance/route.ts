import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address is required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Maps API key is not configured' },
      { status: 500 }
    );
  }

  try {
    // First, geocode the user's address
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK') {
      return NextResponse.json(
        { error: 'Could not find the address. Please check the address and try again.' },
        { status: 400 }
      );
    }

    const userLocation = geocodeData.results[0].geometry.location;

    // Our business location (replace with your actual business coordinates)
    const businessLocation = {
      lat: 33.41522984728399, // Your business latitude
      lng: -84.12067507427162 // Your business longitude
    };

    // Calculate distance using Distance Matrix API with driving mode
    const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${businessLocation.lat},${businessLocation.lng}&destinations=${userLocation.lat},${userLocation.lng}&mode=driving&key=${apiKey}`;
    const distanceResponse = await fetch(distanceUrl);
    const distanceData = await distanceResponse.json();

    if (distanceData.status !== 'OK') {
      return NextResponse.json(
        { error: 'Could not calculate delivery cost. Please try again.' },
        { status: 500 }
      );
    }

    if (!distanceData.rows?.[0]?.elements?.[0]?.distance?.value) {
      return NextResponse.json(
        { error: 'Could not calculate delivery cost. Please try again.' },
        { status: 500 }
      );
    }

    // Convert distance from meters to miles
    const distanceInMeters = distanceData.rows[0].elements[0].distance.value;
    const distanceInMiles = Math.round(distanceInMeters * 0.000621371 * 10) / 10; // Round to 1 decimal place

    // Calculate delivery cost based on distance
    let deliveryCost = 0;
    if (distanceInMiles <= 5) {
      deliveryCost = 10; // Base delivery cost for first 5 miles
    } else {
      deliveryCost = 10 + ((distanceInMiles - 5) * 2.50); // $2.50 per mile after first 5 miles
    }

    // Log distance information for debugging
    console.log('Distance Calculation:', {
      userAddress: address,
      userLocation,
      businessLocation,
      distanceInMiles,
      deliveryCost,
      distanceData: {
        status: distanceData.status,
        origin_addresses: distanceData.origin_addresses,
        destination_addresses: distanceData.destination_addresses,
        rows: distanceData.rows
      }
    });

    return NextResponse.json({ 
      deliveryCost: Math.round(deliveryCost * 100) / 100 // Round to 2 decimal places
    });
  } catch (error) {
    console.error('Error calculating delivery cost:', error);
    return NextResponse.json(
      { error: 'Could not calculate delivery cost. Please try again.' },
      { status: 500 }
    );
  }
} 