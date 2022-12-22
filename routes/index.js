var express = require('express');
var router = express.Router();
var pdf = require('html-pdf');

const data = require('../response.json');
const { transactions, totalFiatDeposits, totalCryptoDeposits, totalInterestEarned, totalInterestEarnedInAud, totalFiatWithdrawals, totalCryptoWithdrawals, totalGainLoss, transactionHistory } = data;

const date = new Date().toLocaleDateString('en-au', { day: 'numeric', month: 'short', year: 'numeric' });

const dateFormat = function () {
  return new Date(this).toLocaleString('en-au', { dateStyle: 'short', timeStyle: 'short' });
};

const audFormat = function () {
  return Number(this).toFixed(2);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('invoice', { transactions, totalFiatDeposits, totalCryptoDeposits, totalInterestEarned, totalInterestEarnedInAud, totalFiatWithdrawals, totalCryptoWithdrawals, totalGainLoss, transactionHistory, date, dateFormat, audFormat });
});

router.get('/pdf', async (req, res) => {
  res.render(
    'invoice', { transactions, totalFiatDeposits, totalCryptoDeposits, totalInterestEarned, totalInterestEarnedInAud, totalFiatWithdrawals, totalCryptoWithdrawals, totalGainLoss, transactionHistory, date, dateFormat, audFormat },
    function(error, html) {
      var config = {
        format: "A4",
        footer: {
          height: '20mm',
          contents: {
            default: '{{page}} of {{pages}}',
          },
        },
      };
      pdf.create(html, config).toStream((err, pdfStream) => {
        if (err) {
          // handle error and return a error response code
          console.log(err)
          return res.sendStatus(500)
        } else {
          // send a status code of 200 OK
          res.statusCode = 200

          // once we are done reading end the response
          pdfStream.on('end', () => {
            // done reading
            return res.end()
          })

          // pipe the contents of the PDF directly to the response
          pdfStream.pipe(res)
        }
      })
    },
  );
})

module.exports = router;
