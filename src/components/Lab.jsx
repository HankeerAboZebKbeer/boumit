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

  // Rive Event Listener
  useEffect(() => {
    if (rive) {
      const onRiveEventReceived = (riveEvent) => {
        const eventData = riveEvent.data;

        if (eventData.name === "Close") {
          console.log("Close event triggered");
          window.close(); // Note: only works if the page was opened via JS
        }

        if (eventData.name === "Clicked") {
          console.log("Clicked event triggered");
          link(); // call link function defined below
        }
      };

      rive.on(EventType.RiveEvent, onRiveEventReceived);

      // Cleanup listener on unmount
      return () => {
        rive.off(EventType.RiveEvent, onRiveEventReceived);
      };
    }
  }, [rive]);

  // Link redirect logic
  const link = () => {
    const platform = "web"; // adjust this as needed
    const userName = "john_doe"; // your username logic
    const webUrl = {
      web: "https://bizops.knowledgeowl.com/s3/birthdayfun?ref=",
    };
    const appUrl = {
      web: "https://bizops.knowledgeowl.com/s3/birthdayfun?appref=",
    };

    const webPlatformUrl = webUrl[platform] + userName;
    const appPlatformUrl = appUrl[platform] + userName;

    window.location.href = appPlatformUrl;

    setTimeout(() => {
      if (document.hasFocus()) {
        window.open(webPlatformUrl, "_blank");
      }
    }, 500);
  };

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
