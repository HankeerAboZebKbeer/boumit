import "../css/Lab.css";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  decodeFont,
} from "@rive-app/react-webgl2";

export const RiveDemo = () => {
  const { RiveComponent } = useRive({
    src: "boume.riv", // Path
    stateMachines: "Main SM",
    layout: new Layout({
      fit: Fit.Layout,
      alignment: Alignment.Center,
    }),

    autoplay: true,
    assetLoader: loadAllAssets,
  });

  return (
    <div className="RiveContainer">
      <RiveComponent />
    </div>
  );
};

const loadAllAssets = async (asset, bytes) => {
  if (asset.isFont) {
    const fontUrl = "/fonts/Inter-594377.ttf";
    const res = await fetch(fontUrl);
    const fontBuffer = await res.arrayBuffer();
    const font = await decodeFont(new Uint8Array(fontBuffer));
    asset.setFont(font);
    font.unref();
    return true;
  }

  return false;
};

export default function Lab() {
  return (
    <div className="RiveContainer">
      <RiveDemo />
    </div>
  );
}
