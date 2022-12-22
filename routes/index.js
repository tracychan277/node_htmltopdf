var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = require('../response.json');
  const { transactions, totalFiatDeposits, totalCryptoDeposits, totalInterestEarned, totalInterestEarnedInAud, totalFiatWithdrawals, totalCryptoWithdrawals, totalGainLoss, transactionHistory } = data;
  res.render('invoice', { transactions, totalFiatDeposits, totalCryptoDeposits, totalInterestEarned, totalInterestEarnedInAud, totalFiatWithdrawals, totalCryptoWithdrawals, totalGainLoss, transactionHistory });
});

module.exports = router;
