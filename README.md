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
const production = false; // use sandbox or production url for validation

async validate(receiptData) {
    const validate - iapReceiptValidator(password, production);

    try {
        const validationData = await validate(receiptData);

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
