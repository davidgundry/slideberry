import * as React from "react";
import { Metadata } from "../app/Metadata";

export const SectionContext = React.createContext<string>("");

export const MetadataContext = React.createContext<Metadata | null>(null)
