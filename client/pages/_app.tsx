import Header from "@/components/header/Header"
import Toast from "@/components/toast/Toast"
import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <div className="relative flex flex-col min-h-screen font-disp">
                <QueryClientProvider client={queryClient}>
                    <>
                        <Header />
                        <Component {...pageProps} />
                        <Toast />
                    </>
                </QueryClientProvider>
            </div>
        </>
    )
}
