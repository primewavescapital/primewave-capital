// ============================================
// PORTAL DATA MANAGER - SIMULATES DATABASE
// ============================================

// Data storage
let investors = [];

// Load from localStorage or set default demo investors
function loadData() {
    const saved = localStorage.getItem('primewave_investors');
    if (saved) {
        investors = JSON.parse(saved);
    } else {
        investors = [
            {id:'INV001', name:'Thabo M.', email:'thabo.m@example.com', phone:'0821234567', initialInvestment:125000, currentValue:142800, joinDate:'2024-01-15', status:'active', password:'INV001'},
            {id:'INV002', name:'Nomsa K.', email:'nomsa.k@example.com', phone:'0837654321', initialInvestment:250000, currentValue:289500, joinDate:'2023-11-20', status:'active', password:'INV002'},
            {id:'INV003', name:'David R.', email:'david.r@example.com', phone:'0849988776', initialInvestment:50000, currentValue:61200, joinDate:'2024-02-10', status:'active', password:'INV003'},
            {id:'INV004', name:'Linda S.', email:'linda.s@example.com', phone:'0812345678', initialInvestment:750000, currentValue:825000, joinDate:'2023-08-05', status:'active', password:'INV004'}
        ];
        saveData();
    }
    return investors;
}

// Save to localStorage
function saveData() {
    localStorage.setItem('primewave_investors', JSON.stringify(investors));
}

// ================= ADMIN FUNCTIONS =================

// Get all investors
function getAllInvestors() {
    return investors;
}

// Add new investor
function addInvestor(data) {
    const newId = 'INV' + String(investors.length + 1).padStart(3,'0');
    const newInvestor = {
        id: newId,
        ...data,
        currentValue: data.initialInvestment,
        joinDate: new Date().toISOString().split('T')[0],
        status:'active',
        password: data.password || newId
    };
    investors.push(newInvestor);
    saveData();
    return newInvestor;
}

// Update investor
function updateInvestor(id, data) {
    const index = investors.findIndex(inv => inv.id === id);
    if(index !== -1){
        investors[index] = {...investors[index], ...data};
        saveData();
        return true;
    }
    return false;
}

// Delete investor
function deleteInvestor(id){
    investors = investors.filter(inv=>inv.id !== id);
    saveData();
}

// Bulk profit update
function updateAllProfits(percentage){
    investors.forEach(inv=>{
        inv.currentValue = inv.initialInvestment*(1+percentage/100);
    });
    saveData();
}

// Get investor by ID (for login)
function getInvestorById(id){
    return investors.find(inv=>inv.id === id);
}

// ================= CLIENT FUNCTIONS =================

// Calculate profit/loss
function calculateProfit(inv){
    return inv.currentValue - inv.initialInvestment;
}

// Calculate percentage return
function calculateReturnPercentage(inv){
    return ((inv.currentValue - inv.initialInvestment)/inv.initialInvestment*100).toFixed(2);
}

// Simulated transactions
function getTransactionHistory(id){
    const inv = getInvestorById(id);
    if(!inv) return [];
    return [
        {date:'2024-03-15', type:'dividend', amount: inv.initialInvestment*0.02, description:'Quarterly dividend payment'},
        {date:'2024-02-28', type:'contribution', amount: inv.initialInvestment*0.1, description:'Additional investment'},
        {date:'2024-01-31', type:'growth', amount: inv.currentValue*0.05, description:'Portfolio appreciation'}
    ];
}

// Initialize data
loadData();
