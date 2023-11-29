import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Game from "./App";

// use "as any" to tell TypeScript Compile ignoring type check
const root = createRoot(document.getElementById("root") as any);
root.render(
    <Game />
);