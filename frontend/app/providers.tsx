"use client";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "@lib/apolloClient";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <ApolloProvider client={apolloClient}>
      <NextUIProvider className={className}>
        {children}
      </NextUIProvider>
    </ApolloProvider>
  );
}
