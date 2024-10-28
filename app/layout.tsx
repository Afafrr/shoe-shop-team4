import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Providers } from "./providers";

const LogoUrl =
  "https://res.cloudinary.com/devc11z9p/image/upload/v1729807319/Icon_Logo_c0cb4c4f8c.ico";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
export const metadata: Metadata = {
  title: "Shoe Shop",
  description:
    "Shoe Shop Web Application that offers user-friendly platform, by team-4",
  icons: {
    icon: LogoUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Providers>{children}</Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
