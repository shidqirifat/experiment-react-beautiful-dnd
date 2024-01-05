import { Layout } from "@/layouts";
import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import "../globals.css";
import "../index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

export const metadata: Metadata = {
  title: "My App",
  description: "My App is a...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <MantineProvider>
            {/* {children} */}
            <Layout>{children}</Layout>
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}
