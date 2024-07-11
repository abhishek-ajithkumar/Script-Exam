/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/email', 'N/record'],
    /**
     * @param{currentRecord} currentRecord
     * @param{email} email
     * @param{record} record
     */
    function (currentRecord, email, record) {

        // /**
        //  * Function to be executed after page is initialized.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
        //  *
        //  * @since 2015.2
        //  */
        // function pageInit(scriptContext) {

        // }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {

            try {
                let currentRecordObj = scriptContext.currentRecord;
                let courseField = 'custrecord_jj_language';
                let courseField2 = 'language';

                if (scriptContext.fieldId === courseField) {
                    let courseValue = currentRecordObj.getValue({
                        fieldId: courseField
                    });
                    let feeDetails = record.load({
                        type: 'customrecord_jj_fee_details',
                        id: courseValue,
                        isDynamic: true
                    });
                    let fee = feeDetails.getValue({
                        fieldId: 'custrecord_jj_fee'
                    })
                    currentRecordObj.setValue({
                        fieldId: 'custrecord_jj_fee_amount',
                        value: fee
                    });
                }
                else if (scriptContext.fieldId === courseField2) {
                    let courseValue = currentRecordObj.getValue({
                        fieldId: courseField2
                    });
                    let feeDetails = record.load({
                        type: 'customrecord_jj_fee_details',
                        id: courseValue,
                        isDynamic: true
                    });
                    let fee = feeDetails.getValue({
                        fieldId: 'custrecord_jj_fee'
                    })
                    currentRecordObj.setValue({
                        fieldId: 'fee_amount',
                        value: fee
                    });
                }

                let tranCurrency1 = 'custrecord_jj_transaction_currency'
                let tranCurrency2 = 'transaction_currency'
                if (scriptContext.fieldId === tranCurrency1) {
                    let currencyValue = currentRecordObj.getText({
                        fieldId: tranCurrency1
                    });
                    console.log(currencyValue)

                }
                else if (scriptContext.fieldId === tranCurrency2) {
                    let currencyValue = currentRecordObj.getText({
                        fieldId: tranCurrency2
                    });
                    console.log(currencyValue)

                    let exrate = getExchangeRate()
                    console.log('exrate rate3:' + exrate);
                    
                    let fee = feeDetails.getValue({
                        fieldId: 'custrecord_jj_fee_amount'
                    })

                    let payable = fee * exrate;
                    currentRecordObj.setValue({
                        fieldId: 'custrecord_jj_exchange_rate',
                        value: payable
                    });


                }



            }
            catch (e) {
                log.error({
                    title: 'Error in field Change',
                    details: e.message
                });
            }



        }

        function getExchangeRate() {

            const apiUrl = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_sl4RQKsW8utsnlmK5V4SWfgMoEcSGF2heNm2Ijnl&currencies=EUR%2CUSD%2CCAD%2CINR%2CSGD&base_currency=INR';
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not good..!!');
                    }
                    return response.json();
                })
                .then(data => {
                    let exchangeRate = parseFloat(data.data.USD);
                    console.log(`Exchange rate: ${exchangeRate}`);
                    return exchangeRate;

                })

                .catch(error => {
                    console.error('There was a problem fetching the data:', error);
                });
        }

        // /**
        //  * Function to be executed when field is slaved.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  * @param {string} scriptContext.fieldId - Field name
        //  *
        //  * @since 2015.2
        //  */
        // function postSourcing(scriptContext) {

        // }

        // /**
        //  * Function to be executed after sublist is inserted, removed, or edited.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @since 2015.2
        //  */
        // function sublistChanged(scriptContext) {

        // }

        // /**
        //  * Function to be executed after line is selected.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @since 2015.2
        //  */
        // function lineInit(scriptContext) {

        // }

        // /**
        //  * Validation function to be executed when field is changed.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  * @param {string} scriptContext.fieldId - Field name
        //  * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
        //  * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
        //  *
        //  * @returns {boolean} Return true if field is valid
        //  *
        //  * @since 2015.2
        //  */
        // function validateField(scriptContext) {

        // }

        // /**
        //  * Validation function to be executed when sublist line is committed.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @returns {boolean} Return true if sublist line is valid
        //  *
        //  * @since 2015.2
        //  */
        // function validateLine(scriptContext) {

        // }

        // /**
        //  * Validation function to be executed when sublist line is inserted.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @returns {boolean} Return true if sublist line is valid
        //  *
        //  * @since 2015.2
        //  */
        // function validateInsert(scriptContext) {

        // }

        // /**
        //  * Validation function to be executed when record is deleted.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  *
        //  * @returns {boolean} Return true if sublist line is valid
        //  *
        //  * @since 2015.2
        //  */
        // function validateDelete(scriptContext) {

        // }

        // /**
        //  * Validation function to be executed when record is saved.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @returns {boolean} Return true if record is valid
        //  *
        //  * @since 2015.2
        //  */
        // function saveRecord(scriptContext) {

        //     let currentRec = currentRecord.get();
        //     let feeAmount = currentRec.getValue({
        //         fieldId: 'custrecord_jj_fee_amount'
        //     });
        //     if (feeAmount < 0) {
        //         dialog.alert({
        //             title: 'Warning',
        //             message: 'Select a preferred course'
        //         });
        //         return false;
        //     }

        //     email.send({
        //         author: -5, 
        //         recipients: 'abhishek@gnail.vom',
        //         subject: 'Tution Fee Query Received for Training',
        //         body: 'Dear Admin'
        //     });
        //     return true;


        // }

        return {
            // pageInit: pageInit,
            fieldChanged: fieldChanged
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });
