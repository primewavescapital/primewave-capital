// ============================================
// PORTAL DATA MANAGER - SIMULATES DATABASE
// ============================================

// -----------------------------
// Global Data Storage
// -----------------------------
let investors = [];

// -----------------------------
// Load & Save Functions
// -----------------------------

/**
 * Load investors from localStorage
 * If none exists, populate default demo investors
 */
function loadData() {
    const saved = localStorage.getItem('primewave_investors');
    if (saved) {
        investors = JSON.parse(saved);
    } else {
        // Default demo investors
        investors = [
            {
                id: 'INV001',
                name: 'Thabo M.',
                email: 'thabo.m@example.com',
                phone: '0821234567',
                initialInvestment: 125000,
                currentValue: 142800,
                joinDate: '2024-01-15',
                status: 'active'
            },
            {
                id: 'INV002',
                name: 'Nomsa K.',
                email: 'nomsa.k@example.com',
                phone: '0837654321',
                initialInvestment: 250000,
                currentValue: 289500,
                joinDate: '2023-11-20',
                status: 'active'
            },
            {
                id: 'INV003',
                name: 'David R.',
                email: 'david.r@example.com',
                phone: '0849988776',
                initialInvestment: 50000,
                currentValue: 61200,
                joinDate: '2024-02-10',
                status: 'active'
            },
            {
                id: 'INV004',
                name: 'Linda S.',
                email: 'linda.s@example.com',
                phone: '0812345678',
                initialInvestment: 750000,
                currentValue: 825000,
                joinDate: '2023-08-05',
                status: 'active'
            }
        ];
        saveData();
    }
    return investors;
}

/**
 * Save current investors to localStorage
 */
function saveData() {
    localStorage.setItem('primewave_investors', JSON.stringify(investors));
}

// -----------------------------
// ADMIN FUNCTIONS
// -----------------------------

/**
 * Get all investors (ensures data is loaded)
 */
function getAllInvestors() {
    loadData();
    return investors;
}

/**
 * Add a new investor
 */
function addInvestor(investorData) {
    const newId = 'INV' + String(investors.length + 1).padStart(3, '0');
    const newInvestor = {
        id: newId,
        ...investorData,
        currentValue: investorData.initialInvestment,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active'
    };
    investors.push(newInvestor);
    saveData();
    return newInvestor;
}

/**
 * Update an existing investor by ID
 */
function updateInvestor(id, updatedData) {
    const index = investors.findIndex(inv => inv.id === id);
    if (index !== -1) {
        investors[index] = { ...investors[index], ...updatedData };
        saveData();
        return true;
    }
    return false;
}

/**
 * Delete an investor by ID
 */
function deleteInvestor(id) {
    investors = investors.filter(inv => inv.id !== id);
    saveData();
}

/**
 * Bulk update profits for all investors by percentage
 */
function updateAllProfits(percentage) {
    investors.forEach(inv => {
        inv.currentValue = inv.initialInvestment * (1 + percentage / 100);
    });
    saveData();
}

/**
 * Get investor by ID (for client login)
 */
function getInvestorById(id) {
    loadData();
    return investors.find(inv => inv.id === id);
}

// -----------------------------
// CLIENT FUNCTIONS
// -----------------------------

/**
 * Calculate profit/loss for a single investor
 */
function calculateProfit(investor) {
    return investor.currentValue - investor.initialInvestment;
}

/**
 * Calculate percentage return for a single investor
 */
function calculateReturnPercentage(investor) {
    return ((investor.currentValue - investor.initialInvestment) / investor.initialInvestment * 100).toFixed(2);
}

/**
 * Get simulated transaction history for a client
 */
function getTransactionHistory(investorId) {
    const investor = getInvestorById(investorId);
    if (!investor) return [];

    return [
        {
            date: '2024-03-15',
            type: 'dividend',
            amount: investor.initialInvestment * 0.02,
            description: 'Quarterly dividend payment'
        },
        {
            date: '2024-02-28',
            type: 'contribution',
            amount: investor.initialInvestment * 0.1,
            description: 'Additional investment'
        },
        {
            date: '2024-01-31',
            type: 'growth',
            amount: investor.currentValue * 0.05,
            description: 'Portfolio appreciation'
        }
    ];
}

// -----------------------------
// Initialize on Load
// -----------------------------
loadData();
