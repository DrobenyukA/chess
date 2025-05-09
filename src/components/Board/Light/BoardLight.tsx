export const Light = () => (
  <>
    <directionalLight position={[0, 100, 0]} color="#f8f8f8" intensity={1.25} />
    {/* TODO: use it to highlight selected figure */}
    {/* <pointLight
      castShadow
      position={[-3, 3, 3]} // position of selected figure
      intensity={1.5}
      color="#3ff55f"
      distance={0}
      decay={1.75}
    /> */}
    <hemisphereLight color="#f8f8f8" groundColor="#232323" intensity={7.5} />
  </>
);

Light.displayName = 'BoardLight';
