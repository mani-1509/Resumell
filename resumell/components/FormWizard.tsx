import React, { useState } from 'react';

interface WizardStep {
  id: string;
  name: string;
  component: React.ReactNode;
}

interface FormWizardProps {
  steps: WizardStep[];
  initialStep?: number;
  onComplete: (data: any) => void;
}

export const FormWizard: React.FC<FormWizardProps> = ({
  steps,
  initialStep = 0,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [wizardData, setWizardData] = useState<Record<string, any>>({});

  const handleNext = (stepData?: any) => {
    if (stepData) {
      setWizardData(prev => ({
        ...prev,
        [steps[currentStep].id]: stepData,
      }));
    }

    if (currentStep === steps.length - 1) {
      onComplete({ ...wizardData, [steps[currentStep].id]: stepData });
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Progress indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '32px',
          padding: '16px 24px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
        }}
      >
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          aria-label="Go back to previous step"
          style={{
            background: 'transparent',
            border: 'none',
            color: currentStep === 0 ? '#666' : '#FFFFFF',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          ← Back
        </button>
        <div style={{ color: '#A1A1AA', fontSize: '14px' }}>
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Step progress bar */}
      <div
        style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          marginBottom: '32px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            transition: 'width 400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        />
      </div>

      {/* Current step content */}
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: '24px',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          {steps[currentStep].name}
        </h2>
        {steps[currentStep].component}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => handleNext()}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
