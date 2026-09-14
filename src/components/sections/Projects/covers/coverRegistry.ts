import type { ComponentType } from "react";
import { lazy } from "react";
import type { StaticImageData } from "next/image";

interface SceneCoverProps {
   tint: string;
   variant?: string;
}

type SceneComponent = ComponentType<SceneCoverProps>;

// Animated SVG scenes (undeployed projects) -- lazy so the Projects chunk
// stays lean; they only load when the section renders.
const InfraScene = lazy(() => import("./InfraScene"));
const McpScene = lazy(() => import("./McpScene"));
const MlScene = lazy(() => import("./MlScene"));
const MlopsScene = lazy(() => import("./MlopsScene"));
const GraphScene = lazy(() => import("./GraphScene"));
const GameScene = lazy(() => import("./GameScene"));
const DocsScene = lazy(() => import("./DocsScene"));
const AutomationScene = lazy(() => import("./AutomationScene"));
const AuthScene = lazy(() => import("./AuthScene"));
const WebAppScene = lazy(() => import("./WebAppScene"));
const GateScene = lazy(() => import("./GateScene"));
const TaxScene = lazy(() => import("./TaxScene"));
const PluginScene = lazy(() => import("./PluginScene"));
const GuideScene = lazy(() => import("./GuideScene"));

export type ProjectCover =
   | { kind: "image"; src: string | StaticImageData }
   | { kind: "scene"; Scene: SceneComponent; variant?: string };

/**
 * Default to a WebApp scene for unknown projects.
 */
export const getProjectCover = (
   id: number,
   _title: string,
): ProjectCover | undefined => {
   // Give some variety based on ID
   if (id % 5 === 0) return { kind: "scene", Scene: AuthScene };
   if (id % 4 === 0) return { kind: "scene", Scene: AutomationScene };
   if (id % 3 === 0) return { kind: "scene", Scene: MlScene };
   if (id % 2 === 0) return { kind: "scene", Scene: InfraScene };
   return { kind: "scene", Scene: WebAppScene };
};
