"use client";

import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";
import apolloClient from "@lib/apolloClient";

export function Providers({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <ApolloProvider client={apolloClient}>
      <NextUIProvider className={className}>
        {children}
      </NextUIProvider>
    </ApolloProvider>
  );
}
