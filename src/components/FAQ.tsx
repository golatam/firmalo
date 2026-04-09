"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-base font-medium text-text pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-text-secondary leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-16 sm:py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-text">
          {dict.faq.title}
        </h2>

        <div className="mt-10 bg-surface border border-border rounded-xl p-6">
          {dict.faq.items.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
