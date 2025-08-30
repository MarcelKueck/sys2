"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: ReadonlyArray<{
    readonly title: string;
    readonly description: string;
  }>;
}

export function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Desktop Progress */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center flex-1 relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        stepNumber < currentStep ? "bg-pink-600" : "bg-gray-200"
                      )}
                    />
                  </div>
                )}

                {/* Step Circle */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 relative z-10 bg-white border-2",
                    {
                      "border-pink-600 bg-pink-600 text-white": isCompleted,
                      "border-pink-600 bg-pink-600 text-white ring-4 ring-pink-100": isCurrent,
                      "border-gray-300 text-gray-600": isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>

                {/* Step Title and Description */}
                <div className="text-center">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      {
                        "text-pink-600": isCurrent,
                        "text-gray-900": isCompleted,
                        "text-gray-500": isUpcoming,
                      }
                    )}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="sm:hidden">
        <div className="flex text-sm text-gray-600 mb-2">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.title}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {steps[currentStep - 1]?.description}
        </div>
      </div>
    </div>
  );
}
