import mongoose from 'mongoose'; // Changed from require

const taxRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fiscalYear: { type: String, required: true },
  totalIncome: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['Paid', 'Pending', 'Overdue'], 
    default: 'Pending' 
  },
  downloadUrl: { type: String } 
}, { timestamps: true });

// Changed from module.exports to export default
const TaxRecord = mongoose.model('TaxRecord', taxRecordSchema);
export default TaxRecord;