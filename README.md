# iap-receipt-validation - In-App Purchase Receipts validation on App Store

This package provides a simple function to validate IAP Receipts on App Store

## installation

```sh
npm i --save iap-receipt-validator
```


## usage
```js
import iapReceiptValidator from 'iap-receipt-validator';

const password = 'b212549818ff42ecb65aa45c'; // Shared Secret from iTunes connect
const isProduction = false; // true = prod, false = sandbox
const validateReceipt = iapReceiptValidator(password, isProduction);

async validate(receiptData) {
    try {
        const validationData = await validateReceipt(receiptData);

        // check if Auto-Renewable Subscription is still valid
        // validationData['latest_receipt_info'][0].expires_date > today
    } catch(err) {
        console.log(err.valid, err.error, err.message)
    }
}
```

---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
