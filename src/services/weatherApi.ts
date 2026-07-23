import { GeocodingLocation, GeocodingResponse, OpenMeteoForecastResponse } from '../types/weather';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1';

export async function searchCities(query: string): Promise<GeocodingLocation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const url = `${GEOCODING_BASE_URL}/search?name=${encodeURIComponent(
    trimmed
  )}&count=10&language=en&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Geocoding HTTP error! Status: ${res.status}`);
    }
    const data: GeocodingResponse = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
}

export async function getCityByCoords(latitude: number, longitude: number): Promise<GeocodingLocation> {
  // Try reverse geocoding via BigDataCloud or Open-Meteo or fallback structured location
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const name = data.city || data.locality || data.principalSubdivision || 'Current Location';
      const country = data.countryName || '';
      return {
        id: Math.round(latitude * 1000 + longitude),
        name,
        latitude,
        longitude,
        country,
        admin1: data.principalSubdivision,
      };
    }
  } catch (e) {
    console.warn('Reverse geocode lookup failed, falling back to coords:', e);
  }

  return {
    id: Date.now(),
    name: 'Your Location',
    latitude,
    longitude,
    country: '',
  };
}

export async function getForecastData(
  latitude: number,
  longitude: number
): Promise<OpenMeteoForecastResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'rain',
      'weather_code',
      'surface_pressure',
      'cloud_cover',
      'wind_speed_10m',
      'uv_index',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'rain_sum',
      'showers_sum',
      'snowfall_sum',
      'precipitation_hours',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
    ].join(','),
    timezone: 'auto',
  });

  const url = `${FORECAST_BASE_URL}/forecast?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Open-Meteo Forecast HTTP error! Status: ${res.status}`);
    }
    const data: OpenMeteoForecastResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
}

// Popular world cities for instant selection
export const POPULAR_CITIES: GeocodingLocation[] = [
  { id: 5128581, name: 'New York', latitude: 40.71427, longitude: -74.00597, country: 'United States', admin1: 'New York' },
  { id: 2643743, name: 'London', latitude: 51.50853, longitude: -0.12574, country: 'United Kingdom', admin1: 'England' },
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.69171, country: 'Japan', admin1: 'Tokyo' },
  { id: 2988507, name: 'Paris', latitude: 48.85341, longitude: 2.3488, country: 'France', admin1: 'Île-de-France' },
  { id: 2147714, name: 'Sydney', latitude: -33.86785, longitude: 151.20732, country: 'Australia', admin1: 'New South Wales' },
  { id: 1275339, name: 'Mumbai', latitude: 19.07283, longitude: 72.88261, country: 'India', admin1: 'Maharashtra' },
  { id: 5368361, name: 'Los Angeles', latitude: 34.05223, longitude: -118.24368, country: 'United States', admin1: 'California' },
  { id: 292223, name: 'Dubai', latitude: 25.25817, longitude: 55.30472, country: 'United Arab Emirates', admin1: 'Dubai' },
];
