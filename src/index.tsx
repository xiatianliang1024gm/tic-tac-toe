import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Game from "./App";

// tsx需要加 as any 当我们使用any类型时，TypeScript编译器会将该变量或表达式视为不受类型检查的，即可以接受任何类型的值
const root = createRoot(document.getElementById("root") as any);
root.render(
    <Game />
);