import {
  WeatherConditionInfo,
  IntelligenceReport,
  OpenMeteoForecastResponse,
  TempUnit,
  SpeedUnit,
  ActivityRecommendation,
} from '../types/weather';

// WMO Weather Interpretation Codes (WW)
// https://open-meteo.com/en/docs
export function getWeatherCondition(code: number, isDay: number = 1): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        label: isDay ? 'Clear Sky' : 'Clear Night',
        iconName: isDay ? 'Sun' : 'Moon',
        category: 'clear',
        gradient: isDay
          ? 'from-amber-400 via-sky-400 to-sky-600'
          : 'from-slate-900 via-indigo-950 to-slate-900',
        bgDark: 'bg-sky-950/80',
      };
    case 1:
      return {
        label: 'Mainly Clear',
        iconName: isDay ? 'SunMedium' : 'MoonStar',
        category: 'clear',
        gradient: isDay
          ? 'from-sky-400 via-amber-200 to-sky-500'
          : 'from-slate-800 via-indigo-900 to-slate-900',
        bgDark: 'bg-slate-900/80',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
        category: 'cloudy',
        gradient: 'from-sky-400 via-blue-400 to-slate-500',
        bgDark: 'bg-slate-900/80',
      };
    case 3:
      return {
        label: 'Overcast',
        iconName: 'Cloud',
        category: 'cloudy',
        gradient: 'from-slate-400 via-slate-500 to-slate-700',
        bgDark: 'bg-slate-900/80',
      };
    case 45:
    case 48:
      return {
        label: code === 48 ? 'Depositing Rime Fog' : 'Foggy',
        iconName: 'CloudFog',
        category: 'fog',
        gradient: 'from-slate-400 via-slate-600 to-zinc-700',
        bgDark: 'bg-slate-900/80',
      };
    case 51:
    case 53:
    case 55:
      return {
        label: code === 51 ? 'Light Drizzle' : code === 53 ? 'Moderate Drizzle' : 'Dense Drizzle',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
        gradient: 'from-cyan-600 via-blue-600 to-slate-700',
        bgDark: 'bg-slate-900/80',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing Drizzle',
        iconName: 'CloudHail',
        category: 'drizzle',
        gradient: 'from-cyan-500 via-slate-600 to-blue-800',
        bgDark: 'bg-slate-900/80',
      };
    case 61:
      return {
        label: 'Slight Rain',
        iconName: 'CloudRain',
        category: 'rain',
        gradient: 'from-blue-500 via-indigo-600 to-slate-800',
        bgDark: 'bg-slate-900/80',
      };
    case 63:
      return {
        label: 'Moderate Rain',
        iconName: 'CloudRain',
        category: 'rain',
        gradient: 'from-blue-600 via-indigo-700 to-slate-900',
        bgDark: 'bg-slate-950/90',
      };
    case 65:
      return {
        label: 'Heavy Rain',
        iconName: 'CloudRainWind',
        category: 'rain',
        gradient: 'from-blue-700 via-slate-800 to-slate-950',
        bgDark: 'bg-slate-950/90',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing Rain',
        iconName: 'CloudHail',
        category: 'rain',
        gradient: 'from-teal-600 via-indigo-800 to-slate-900',
        bgDark: 'bg-slate-950/90',
      };
    case 71:
      return {
        label: 'Slight Snow Fall',
        iconName: 'Snowflake',
        category: 'snow',
        gradient: 'from-sky-300 via-indigo-300 to-slate-600',
        bgDark: 'bg-slate-900/80',
      };
    case 73:
      return {
        label: 'Moderate Snow Fall',
        iconName: 'Snowflake',
        category: 'snow',
        gradient: 'from-blue-200 via-slate-400 to-indigo-700',
        bgDark: 'bg-slate-900/80',
      };
    case 75:
      return {
        label: 'Heavy Snow Fall',
        iconName: 'Snowflake',
        category: 'snow',
        gradient: 'from-indigo-300 via-slate-600 to-slate-900',
        bgDark: 'bg-slate-900/80',
      };
    case 77:
      return {
        label: 'Snow Grains',
        iconName: 'Snowflake',
        category: 'snow',
        gradient: 'from-sky-200 via-slate-500 to-indigo-800',
        bgDark: 'bg-slate-900/80',
      };
    case 80:
      return {
        label: 'Slight Rain Showers',
        iconName: 'CloudSunRain',
        category: 'rain',
        gradient: 'from-sky-400 via-blue-600 to-slate-700',
        bgDark: 'bg-slate-900/80',
      };
    case 81:
      return {
        label: 'Moderate Rain Showers',
        iconName: 'CloudRain',
        category: 'rain',
        gradient: 'from-blue-500 via-indigo-700 to-slate-800',
        bgDark: 'bg-slate-900/80',
      };
    case 82:
      return {
        label: 'Violent Rain Showers',
        iconName: 'CloudRainWind',
        category: 'rain',
        gradient: 'from-slate-700 via-blue-900 to-slate-950',
        bgDark: 'bg-slate-950/90',
      };
    case 85:
    case 86:
      return {
        label: 'Snow Showers',
        iconName: 'Snowflake',
        category: 'snow',
        gradient: 'from-indigo-200 via-blue-400 to-slate-700',
        bgDark: 'bg-slate-900/80',
      };
    case 95:
      return {
        label: 'Thunderstorm',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
        gradient: 'from-purple-800 via-indigo-900 to-slate-950',
        bgDark: 'bg-slate-950/90',
      };
    case 96:
    case 99:
      return {
        label: 'Thunderstorm with Hail',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
        gradient: 'from-purple-900 via-slate-900 to-black',
        bgDark: 'bg-slate-950/90',
      };
    default:
      return {
        label: 'Unknown Weather',
        iconName: 'Cloud',
        category: 'cloudy',
        gradient: 'from-slate-500 to-slate-700',
        bgDark: 'bg-slate-900/80',
      };
  }
}

export function convertTemp(celsius: number, unit: TempUnit): number {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function convertSpeed(kmh: number, unit: SpeedUnit): number {
  if (unit === 'mph') {
    return Math.round(kmh * 0.621371);
  }
  if (unit === 'm/s') {
    return Math.round((kmh / 3.6) * 10) / 10;
  }
  return Math.round(kmh);
}

export function getWindDirectionLabel(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function getUVInfo(uvIndex: number): { level: string; color: string; advice: string } {
  if (uvIndex <= 2) {
    return {
      level: 'Low',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      advice: 'Minimal sun protection needed. Safe to stay outside.',
    };
  }
  if (uvIndex <= 5) {
    return {
      level: 'Moderate',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      advice: 'Wear sunglasses and apply SPF 30+ sunscreen if out for extended periods.',
    };
  }
  if (uvIndex <= 7) {
    return {
      level: 'High',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      advice: 'Protection required. Seek shade during peak afternoon hours (10 AM - 4 PM).',
    };
  }
  if (uvIndex <= 10) {
    return {
      level: 'Very High',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      advice: 'Extra protection needed. Avoid direct sun exposure near midday.',
    };
  }
  return {
    level: 'Extreme',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    advice: 'Take all precautions. Unprotected skin can burn in minutes.',
  };
}

export function generateIntelligenceReport(data: OpenMeteoForecastResponse): IntelligenceReport {
  const current = data.current;
  const todayDaily = data.daily;
  const hourly = data.hourly;

  const rainProb = todayDaily.precipitation_probability_max?.[0] ?? 0;
  const rainSum = todayDaily.precipitation_sum?.[0] ?? 0;
  const maxWind = todayDaily.wind_speed_10m_max?.[0] ?? current.wind_speed_10m;
  const tempC = current.temperature_2m;
  const weatherCode = current.weather_code;
  const maxUv = todayDaily.uv_index_max?.[0] ?? 0;

  // 1. Umbrella Recommendation
  let umbrellaNeeded = false;
  let umbrellaLevel: 'Must Carry' | 'Recommended' | 'Low Risk' | 'Not Needed' = 'Not Needed';
  let umbrellaReason = 'No rain expected today. Enjoy the dry weather!';

  if (weatherCode >= 51 && weatherCode <= 67 || (weatherCode >= 80 && weatherCode <= 82) || weatherCode >= 95) {
    umbrellaNeeded = true;
    umbrellaLevel = 'Must Carry';
    umbrellaReason = `Active rain/precipitation (${rainSum.toFixed(1)}mm expected today). Don't leave without an umbrella or raincoat!`;
  } else if (rainProb >= 60 || rainSum >= 2) {
    umbrellaNeeded = true;
    umbrellaLevel = 'Must Carry';
    umbrellaReason = `High chance of rain (${rainProb}%) today with up to ${rainSum.toFixed(1)}mm expected. Highly advise keeping an umbrella handy.`;
  } else if (rainProb >= 35 || rainSum > 0.5) {
    umbrellaNeeded = false;
    umbrellaLevel = 'Recommended';
    umbrellaReason = `Moderate ${rainProb}% risk of passing showers. A compact umbrella in your bag is a smart idea.`;
  } else if (rainProb >= 15) {
    umbrellaNeeded = false;
    umbrellaLevel = 'Low Risk';
    umbrellaReason = `Low ${rainProb}% chance of light rain. An umbrella is likely unnecessary.`;
  }

  // 2. Travel Recommendation
  let travelScore = 85;
  let travelRating: 'Ideal' | 'Good' | 'Moderate' | 'Challenging' | 'Hazardous' = 'Good';
  let travelSummary = 'Great conditions for road trips and local commuting.';
  let travelAdvice = 'Roads are clear and visibility is normal.';

  if (weatherCode >= 95) {
    travelScore = 20;
    travelRating = 'Hazardous';
    travelSummary = 'Severe thunderstorm hazard. Delay unnecessary road trips.';
    travelAdvice = 'Risk of lightning, sudden heavy downpours, and hydroplaning. Stay indoors if possible.';
  } else if (weatherCode >= 71 && weatherCode <= 86) {
    travelScore = 35;
    travelRating = 'Challenging';
    travelSummary = 'Snow & icy road conditions ahead.';
    travelAdvice = 'Ensure winter tires, check vehicle defroster, and drive cautiously with extra brake clearance.';
  } else if (weatherCode === 45 || weatherCode === 48) {
    travelScore = 40;
    travelRating = 'Challenging';
    travelSummary = 'Dense fog alert reducing road visibility.';
    travelAdvice = 'Use fog lights or low beams, keep safe distance, and reduce driving speed.';
  } else if (weatherCode >= 63 || maxWind > 45) {
    travelScore = 50;
    travelRating = 'Moderate';
    travelSummary = 'Heavy precipitation or gusty winds present.';
    travelAdvice = 'Expect wet pavement and slower traffic flow. Keep both hands on steering wheel.';
  } else if (tempC >= 10 && tempC <= 28 && rainProb < 20 && maxWind < 25) {
    travelScore = 95;
    travelRating = 'Ideal';
    travelSummary = 'Perfect weather for travel, scenic drives, or flights!';
    travelAdvice = 'Dry roads, high visibility, and comfortable temperatures expected all day.';
  }

  // 3. Activity Recommendations
  const activities: ActivityRecommendation[] = [];

  // Running
  let runScore = 80;
  let runReason = 'Comfortable conditions for outdoor running.';
  if (tempC < 2 || tempC > 32) runScore -= 35;
  else if (tempC > 25) runScore -= 20;
  if (rainProb > 50) runScore -= 30;
  if (maxWind > 35) runScore -= 25;
  if (weatherCode >= 95) runScore = 5;
  activities.push({
    name: 'Running & Jogging',
    score: Math.max(5, Math.min(100, runScore)),
    rating: runScore >= 80 ? 'Excellent' : runScore >= 60 ? 'Good' : runScore >= 40 ? 'Fair' : 'Poor',
    icon: 'Footprints',
    reason: weatherCode >= 95 ? 'Thunderstorm risk.' : tempC > 30 ? 'Heat caution - stay hydrated.' : runReason,
  });

  // Cycling
  let bikeScore = 85;
  let bikeReason = 'Favorable winds and dry roads for cycling.';
  if (maxWind > 30) {
    bikeScore -= 40;
    bikeReason = `Strong wind gusts up to ${Math.round(maxWind)} km/h make cycling difficult.`;
  } else if (rainProb > 40) {
    bikeScore -= 35;
    bikeReason = 'Wet roads increase slip risk.';
  } else if (tempC < 5) {
    bikeScore -= 25;
    bikeReason = 'Chilly wind chill for open cycling.';
  }
  activities.push({
    name: 'Cycling & Biking',
    score: Math.max(5, Math.min(100, bikeScore)),
    rating: bikeScore >= 80 ? 'Excellent' : bikeScore >= 60 ? 'Good' : bikeScore >= 40 ? 'Fair' : 'Poor',
    icon: 'Bike',
    reason: bikeReason,
  });

  // Outdoor Dining / Picnics
  let diningScore = 80;
  let diningReason = 'Pleasant ambient conditions for patio dining.';
  if (tempC < 15 || tempC > 32) diningScore -= 30;
  if (rainProb > 30) diningScore -= 40;
  if (maxWind > 25) diningScore -= 25;
  if (current.is_day === 0 && tempC < 12) diningScore -= 20;
  activities.push({
    name: 'Patio & Outdoor Dining',
    score: Math.max(5, Math.min(100, diningScore)),
    rating: diningScore >= 80 ? 'Excellent' : diningScore >= 60 ? 'Good' : diningScore >= 40 ? 'Fair' : 'Poor',
    icon: 'Utensils',
    reason: rainProb > 30 ? 'Precipitation risk may disrupt outdoors.' : tempC < 15 ? 'Cool outdoor temperatures.' : diningReason,
  });

  // Hiking & Nature Trails
  let hikeScore = 85;
  let hikeReason = 'Clear trail conditions with mild weather.';
  if (weatherCode >= 61) hikeScore -= 50;
  if (tempC > 30) hikeScore -= 25;
  if (weatherCode === 45) hikeScore -= 30;
  activities.push({
    name: 'Hiking & Walking',
    score: Math.max(5, Math.min(100, hikeScore)),
    rating: hikeScore >= 80 ? 'Excellent' : hikeScore >= 60 ? 'Good' : hikeScore >= 40 ? 'Fair' : 'Poor',
    icon: 'Mountain',
    reason: weatherCode >= 61 ? 'Muddy/slippery trails expected due to rain.' : hikeReason,
  });

  // Stargazing (Night) or Sightseeing
  if (current.is_day === 0) {
    const cloudCover = current.cloud_cover;
    let starScore = 90 - cloudCover * 0.7;
    activities.push({
      name: 'Stargazing',
      score: Math.max(5, Math.min(100, Math.round(starScore))),
      rating: starScore >= 80 ? 'Excellent' : starScore >= 60 ? 'Good' : starScore >= 40 ? 'Fair' : 'Poor',
      icon: 'Sparkles',
      reason: cloudCover < 20 ? 'Crisp clear skies for viewing constellations!' : `${cloudCover}% cloud cover obstructs telescope view.`,
    });
  } else {
    let sightScore = 85;
    if (weatherCode === 45) sightScore -= 40;
    if (rainProb > 40) sightScore -= 30;
    activities.push({
      name: 'Sightseeing & Photography',
      score: Math.max(5, Math.min(100, sightScore)),
      rating: sightScore >= 80 ? 'Excellent' : sightScore >= 60 ? 'Good' : sightScore >= 40 ? 'Fair' : 'Poor',
      icon: 'Camera',
      reason: weatherCode === 45 ? 'Fog decreases scenic visibility.' : 'Good lighting and sky visibility.',
    });
  }

  // 4. Clothing Recommendations
  const clothingItems: string[] = [];
  let clothingSummary = '';

  if (tempC <= 0) {
    clothingSummary = 'Heavy Winter Outfit';
    clothingItems.push('Insulated heavy coat or parka', 'Thermal base layers', 'Warm beanie & gloves', 'Thermal socks & winter boots');
  } else if (tempC <= 10) {
    clothingSummary = 'Cold Weather Layering';
    clothingItems.push('Warm jacket or wool coat', 'Sweater or fleece hoodie', 'Long pants / denim', 'Enclosed comfortable shoes');
  } else if (tempC <= 18) {
    clothingSummary = 'Mild / Transitional Outfit';
    clothingItems.push('Light jacket or cardigan', 'Long sleeve shirt', 'Jeans or trousers', 'Sneakers');
  } else if (tempC <= 26) {
    clothingSummary = 'Warm & Comfortable Casual';
    clothingItems.push('T-shirt or breathable blouse', 'Light shorts or linen pants', 'Sunglasses', 'Casual footwear');
  } else {
    clothingSummary = 'Hot Weather Apparel';
    clothingItems.push('Breathable cotton / moisture-wicking wear', 'Sun hat & UV sunglasses', 'SPF 50+ sunscreen', 'Open sandals or light canvas shoes');
  }

  if (umbrellaNeeded || rainProb > 30) {
    clothingItems.push('Waterproof rain jacket or compact umbrella');
  }

  const uvInfo = getUVInfo(maxUv);

  return {
    umbrella: {
      needed: umbrellaNeeded,
      level: umbrellaLevel,
      reason: umbrellaReason,
      probability: rainProb,
    },
    travel: {
      score: travelScore,
      rating: travelRating,
      summary: travelSummary,
      advice: travelAdvice,
    },
    activities,
    clothing: {
      summary: clothingSummary,
      items: clothingItems,
    },
    uvGuide: {
      index: maxUv,
      level: uvInfo.level,
      advice: uvInfo.advice,
    },
  };
}
