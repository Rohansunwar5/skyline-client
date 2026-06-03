'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuoteModalContextType {
  isQuoteOpen: boolean;
  preselectedProduct: string;
  openQuote: (productName?: string) => void;
  closeQuote: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState('');

  const openQuote = (productName?: string) => {
    setPreselectedProduct(productName || '');
    setIsQuoteOpen(true);
  };

  const closeQuote = () => {
    setIsQuoteOpen(false);
    setPreselectedProduct('');
  };

  return (
    <QuoteModalContext.Provider value={{ isQuoteOpen, preselectedProduct, openQuote, closeQuote }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  return context;
}
