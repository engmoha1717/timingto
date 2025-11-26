/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef } from 'react';

interface GoogleAdProps {
  adSlot: string; // You'll get this from Google AdSense
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const GoogleAd: React.FC<GoogleAdProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = {},
  className = ''
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={className} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default GoogleAd;

// Example usage in your components:
// 
// <GoogleAd 
//   adSlot="1234567890" 
//   adFormat="auto"
//   className="my-4"
// />
//
// For vertical ad (sidebar):
// <GoogleAd 
//   adSlot="1234567890" 
//   adFormat="vertical"
//   style={{ minHeight: '250px' }}
// />
//
// For horizontal ad (banner):
// <GoogleAd 
//   adSlot="9876543210" 
//   adFormat="horizontal"
//   style={{ minHeight: '90px' }}
// />