const xlsx = require('xlsx');
const Expense = require('../models/Expense');

//Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user._id;
    try{
            const {icon, category, amount, date} = req.body;
            if(!category || !amount || !date){
                return res.status(400).json({message: "All the fiels are required"});
            }
            const newExpense = new Expense ({
                userId, 
                icon, category, amount, date: new Date(date)
            });
            await newExpense.save();
            res.status(200).json(newExpense);
    } catch (error){
        console.error("Error adding expense:", error);
            res.status(500).json({message: "server error"});

    }
}

//getAll Categories
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    console.log("Fetching expenses for:", userId); 
    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    }catch(error){
        res.status(500).json({message: "server error"});
    }
};

//Delete Expense Source
exports.deleteExpense = async (req, res) => {
    const userId = req.user._id;
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"});
    }catch(error){
        res.status(500).json({message: "server error"});
    }
};

//Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        //Prepare date for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }catch(error){
        res.status(500).json({message: "server error"});
    }
}