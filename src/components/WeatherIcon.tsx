import React from 'react';
import {
  Sun,
  Moon,
  SunMedium,
  MoonStar,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudHail,
  CloudRain,
  CloudRainWind,
  Snowflake,
  CloudSunRain,
  CloudLightning,
  LucideProps,
} from 'lucide-react';

interface Props extends LucideProps {
  name: string;
}

export const WeatherIcon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'Moon':
      return <Moon {...props} />;
    case 'SunMedium':
      return <SunMedium {...props} />;
    case 'MoonStar':
      return <MoonStar {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'CloudMoon':
      return <CloudMoon {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudHail':
      return <CloudHail {...props} />;
    case 'CloudRain':
      return <CloudRain {...props} />;
    case 'CloudRainWind':
      return <CloudRainWind {...props} />;
    case 'Snowflake':
      return <Snowflake {...props} />;
    case 'CloudSunRain':
      return <CloudSunRain {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    default:
      return <Cloud {...props} />;
  }
};
