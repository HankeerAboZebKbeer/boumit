import "../css/Lab.css";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  decodeFont,
  EventType,
} from "@rive-app/react-webgl2";
import { useEffect } from "react";

export const RiveDemo = () => {
  const { RiveComponent, rive } = useRive({
    src: "boume.riv",
    stateMachines: "Main SM",
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    autoplay: true,
    assetLoader: loadAllAssets,
  });

  // Hardcoded redirect link logic
  const handleRedirect = () => {
    const url = "https://bizops.knowledgeowl.com/s3/birthdayfun";
    window.location.href = url;

    setTimeout(() => {
      if (document.hasFocus()) {
        window.open(url, "_blank");
      }
    }, 500);
  };

  // Rive Event Listener
  useEffect(() => {
    if (rive) {
      const onRiveEventReceived = (riveEvent) => {
        const eventData = riveEvent.data;

        if (eventData.name === "Close") {
          console.log("Close event triggered");
          window.close();
        }

        if (eventData.name === "Open") {
          console.log("Open event triggered");
          handleRedirect();
        }
      };

      rive.on(EventType.RiveEvent, onRiveEventReceived);

      return () => {
        rive.off(EventType.RiveEvent, onRiveEventReceived);
      };
    }
  }, [rive]);

  return (
    <div className="RiveContainer">
      <RiveComponent />
    </div>
  );
};

const loadAllAssets = async (asset) => {
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
