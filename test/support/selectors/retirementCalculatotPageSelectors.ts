const RetirementCalculatorPageSelectors = {
/**
   * Define Page elements
   */


    // Age and Income fields
    get currentAge () { return $('#current-age') },
    get retirementAge () { return $('#retirement-age') },
    get currentIncome () { return $('#current-income') },
    get spouseIncome () { return $('#spouse-income') },
    get currentTotalSavings () { return $('#current-total-savings') },
    get currentAnnualSavings () { return $('#current-annual-savings') },
    get savingsIncreaseRate () { return $('#savings-increase-rate') },
    
    // Social Security Income fields
    get socialSecurityToggleYes () { return $('#yes-social-benefits') },
    get socialSecurityToggleNo () { return $('#no-social-benefits') },
    get socialSecurityMarStatusSingle () { return $('#single') },
    get socialSecurityMarStatusMarried () { return $('#married') },
    get socialSecurityOverrideAmount () { return $('#social-security-override') },
    

    // Buttons and results
    get calculateButton () { return $('button=Calculate') },
    get clearFormButton () { return $('button=Clear Form') },
    get resultSection () { return $('#calculator-results-section') } ,
    get resultMessage () { return $('#result-message') },
    
    // Error messages
    get errorMessage () { return $('#calculator-input-alert')}, //Please fill out all required fields
    get invalidCurrentAgeMessage () { return $('#invalid-current-age-error')} , //Input required
    get invalidRetirementAgeMessage () { return $('#invalid-retirement-age-error')},  //Input required
    get invalidCurrentIncomeMessage () { return $('#invalid-current-income-error')},  //Input required
    get invalidCurrentTotalSavingsMessage () { return $('#invalid-current-total-savings-error')} , //Input required
    get invalidCurrentAnnualSavingsMessage () { return $('#invalid-current-annual-savings-error')},  //Input required
    get invalidSavingsIncreaseRateMessage () { return $('#invalid-savings-increase-rate-error')}  //Input required
  

};  

export default RetirementCalculatorPageSelectors;