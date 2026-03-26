import React, { useState, useEffect } from 'react';
import { IndianRupee, Percent, Calendar } from 'lucide-react';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    
    if (p && r && n) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiValue));
    } else {
      setEmi(0);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
      <h3 className="text-2xl font-serif font-semibold text-[var(--color-navy)] mb-6">EMI Calculator</h3>
      
      <div className="space-y-6">
        {/* Loan Amount */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[var(--color-gold)]" />
              Loan Amount
            </label>
            <span className="text-[var(--color-navy)] font-semibold">{formatCurrency(loanAmount)}</span>
          </div>
          <input 
            type="range" 
            min="1000000" 
            max="100000000" 
            step="100000"
            value={loanAmount} 
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-gold)]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>₹10 L</span>
            <span>₹10 Cr</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Percent className="w-4 h-4 text-[var(--color-gold)]" />
              Interest Rate (p.a.)
            </label>
            <span className="text-[var(--color-navy)] font-semibold">{interestRate}%</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="15" 
            step="0.1"
            value={interestRate} 
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-gold)]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>5%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--color-gold)]" />
              Tenure (Years)
            </label>
            <span className="text-[var(--color-navy)] font-semibold">{tenure} Years</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="30" 
            step="1"
            value={tenure} 
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-gold)]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 Yr</span>
            <span>30 Yrs</span>
          </div>
        </div>

        {/* Result */}
        <div className="mt-8 p-6 bg-[var(--color-navy)] rounded-xl text-center">
          <p className="text-[var(--color-gold-light)] text-sm uppercase tracking-wider font-medium mb-2">Monthly EMI</p>
          <p className="text-4xl font-serif text-white">{formatCurrency(emi)}</p>
          <p className="text-gray-400 text-xs mt-4">
            Principal Amount: {formatCurrency(loanAmount)} <br/>
            Total Interest: {formatCurrency((emi * tenure * 12) - loanAmount)}
          </p>
        </div>
      </div>
    </div>
  );
}
