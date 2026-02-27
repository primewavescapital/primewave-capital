// ============================================
// PORTAL DATA MANAGER - SIMULATES DATABASE
// ============================================

let investors = [];

// Load investors from localStorage (only add demo once)
function loadData() {
    const saved = localStorage.getItem('primewave_investors');
    if (saved) {
        investors = JSON.parse(saved);
    } else {
        investors = [
            { id: 'INV001', name: 'Thabo M.', email: 'thabo.m@example.com', phone: '0821234567', initialInvestment: 125000, currentValue: 142800, joinDate: '2024-01-15', status: 'active' },
            { id: 'INV002', name: 'Nomsa K.', email: 'nomsa.k@example.com', phone: '0837654321', initialInvestment: 250000, currentValue: 289500, joinDate: '2023-11-20', status: 'active' },
            { id: 'INV003', name: 'David R.', email: 'david.r@example.com', phone: '0849988776', initialInvestment: 50000, currentValue: 61200, joinDate: '2024-02-10', status: 'active' },
            { id: 'INV004', name: 'Linda S.', email: 'linda.s@example.com', phone: '0812345678', initialInvestment: 750000, currentValue: 825000, joinDate: '2023-08-05', status: 'active' }
        ];
        saveData();
    }
    return investors;
}

// Save to localStorage
function saveData() {
    localStorage.setItem('primewave_investors', JSON.stringify(investors));
}

// ADMIN FUNCTIONS
function getAllInvestors() { return investors; }
function addInvestor(data) {
    const newId = 'INV' + String(investors.length + 1).padStart(3,'0');
    const newInv = { id: newId, ...data, currentValue: data.initialInvestment, joinDate: new Date().toISOString().split('T')[0], status:'active' };
    investors.push(newInv); saveData(); return newInv;
}
function updateInvestor(id, data) { const i = investors.findIndex(inv => inv.id===id); if(i!==-1){ investors[i] = {...investors[i], ...data}; saveData(); return true;} return false;}
function deleteInvestor(id) { investors = investors.filter(inv=>inv.id!==id); saveData();}
function updateAllProfits(percentage){ investors.forEach(inv=>{inv.currentValue=inv.initialInvestment*(1+percentage/100);}); saveData();}
function getInvestorById(id){ return investors.find(inv=>inv.id===id); }

// CLIENT FUNCTIONS
function calculateProfit(inv){ return inv.currentValue - inv.initialInvestment; }
function calculateReturnPercentage(inv){ return ((inv.currentValue - inv.initialInvestment)/inv.initialInvestment*100).toFixed(2);}
function getTransactionHistory(invId){
    const inv = getInvestorById(invId); if(!inv) return [];
    return [
        { date:'2024-03-15', type:'dividend', amount: inv.initialInvestment*0.02, description:'Quarterly dividend' },
        { date:'2024-02-28', type:'contribution', amount: inv.initialInvestment*0.1, description:'Additional investment' },
        { date:'2024-01-31', type:'growth', amount: inv.currentValue*0.05, description:'Portfolio growth' }
    ];
}

// Initialize
loadData();
