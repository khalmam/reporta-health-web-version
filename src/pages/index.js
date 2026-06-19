import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Landing from "@components/Landing/Landing";

export default function Home() {
  const router = useRouter();

  const title = "Reporta Health - Search and report a facility";
  const description =
    "A crowd sourcing health facility app for checking registered and unregistered health facilities and reporting unregistered health facilities for enhanced quality health service delivery in Nigeria.";

  return (
    <div className="w-full select-none bg-transparent">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:url"
          content={`http://localhost:3000${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Reporta Health" />
      </Head>

      <Landing />
    </div>
  );
}
