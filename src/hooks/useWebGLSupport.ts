import { useState, useEffect } from 'react';

export const useWebGLSupport = () => {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = (
          canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl')
        ) as WebGLRenderingContext | null;

        if (!gl) {
          setIsSupported(false);
          return;
        }

        setIsSupported(true);

        // Check for low-end device indicators (informational only)
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
          const lowEndIndicators = [
            'swift shader',
            'llvmpipe',
            'mesa',
          ];

          const isLowEndGPU = lowEndIndicators.some((indicator) =>
            renderer.toLowerCase().includes(indicator)
          );

          setIsLowEnd(isLowEndGPU);
        }
      } catch (e) {
        setIsSupported(false);
      }
    };

    checkWebGL();
  }, []);

  return { isSupported, isLowEnd };
};
