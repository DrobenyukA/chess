import { useControls } from 'leva';

export function usePhysicalMaterialAdjustment() {
  return useControls({
    whiteColor: { value: '#bebbb1' },
    blackColor: { value: '#232323' },
    emissive: { value: '#000000', disabled: true },
    isSelected: false,
    metalness: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    roughness: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    ior: {
      value: 1,
      min: 0,
      max: 2.33,
      step: 0.01,
    },
    reflectivity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    iridescence: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    iridescenceIOR: {
      value: 1.62,
      min: 0,
      max: 2.33,
      step: 0.01,
    },
    sheenRoughness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    clearcoat: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    clearcoatRoughness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    clearcoatIntensity: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    opacity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
      label: `Opacity`,
    },
  });
}
