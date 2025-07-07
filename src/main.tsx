import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { ThemeProvider } from "styled-components"

import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"

import { GlobalStyle } from "@/styles/GlobalStyle.tsx"
import { theme } from "@/styles/themes.tsx"

import App from "./App.tsx"

export const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<GlobalStyle/>
				<App/>
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>
)
