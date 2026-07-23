export interface GeocodingLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string;
  admin2?: string;
  timezone?: string;
  population?: number;
}

export interface GeocodingResponse {
  results?: GeocodingLocation[];
  generationtime_ms?: number;
}

export interface CurrentWeatherData {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

export interface HourlyForecastData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  weather_code: number[];
  surface_pressure: number[];
  cloud_cover: number[];
  wind_speed_10m: number[];
  uv_index: number[];
}

export interface DailyForecastData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
}

export interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  current: CurrentWeatherData;
  hourly: HourlyForecastData;
  daily: DailyForecastData;
}

export type TempUnit = 'C' | 'F';
export type SpeedUnit = 'km/h' | 'mph' | 'm/s';

export interface WeatherConditionInfo {
  label: string;
  iconName: string;
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  gradient: string;
  bgDark: string;
}

export interface ActivityRecommendation {
  name: string;
  score: number; // 0 to 100
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  icon: string;
  reason: string;
}

export interface IntelligenceReport {
  umbrella: {
    needed: boolean;
    level: 'Must Carry' | 'Recommended' | 'Low Risk' | 'Not Needed';
    reason: string;
    probability: number;
  };
  travel: {
    score: number;
    rating: 'Ideal' | 'Good' | 'Moderate' | 'Challenging' | 'Hazardous';
    summary: string;
    advice: string;
  };
  activities: ActivityRecommendation[];
  clothing: {
    summary: string;
    items: string[];
  };
  uvGuide: {
    index: number;
    level: string;
    advice: string;
  };
}
