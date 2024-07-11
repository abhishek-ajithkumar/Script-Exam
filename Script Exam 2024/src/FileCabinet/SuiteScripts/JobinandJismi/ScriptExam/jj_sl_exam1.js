/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/email', 'N/record', 'N/ui/serverWidget'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{serverWidget} serverWidget

 */
    (email, record, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            let recordId = 0;

            if (scriptContext.request.method === 'GET') {

                let form = serverWidget.createForm({
                    title: 'Akshaya Institute Registration via API'
                });
                form.clientScriptModulePath = '../ScriptExam/jj_cs_exam1.js';
                form.addField({
                    id: 'name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });
                form.addField({
                    id: 'country',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Country'
                });
                form.addField({
                    id: 'age',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Age'
                });
                form.addField({
                    id: 'phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone'
                });
                form.addField({
                    id: 'email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email Address'
                });
                form.addField({
                    id: 'language',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customlist_jj_language',
                    label: 'Language'
                });
                let base = form.addField({
                    id: 'base_currency',
                    type: serverWidget.FieldType.SELECT,
                    source: 'currency',
                    label: 'Base Currency',
                });
                base.defaultValue = 5;
                base.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });

                form.addField({
                    id: 'transaction_currency',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customlist_jj_transaction_currency_lis',
                    label: 'Transaction Currency',
                });
                form.addField({
                    id: 'fee_amount',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Fee Amount (in INR)'
                });
                form.addField({
                    id: 'exchange_rate',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Exchange Rate'
                });

                form.addSubmitButton({
                    label: 'Submit'
                });

                scriptContext.response.writePage(form);

            }
            else {

                let name = scriptContext.request.parameters.name;
                let country = scriptContext.request.parameters.country;
                let age = scriptContext.request.parameters.age;
                let phone = scriptContext.request.parameters.phone;
                let email = scriptContext.request.parameters.email;
                let language = scriptContext.request.parameters.language;
                let baseCurrency = scriptContext.request.parameters.base_currency;
                let transactionCurrency = scriptContext.request.parameters.transaction_currency;
                let feeAmount = scriptContext.request.parameters.fee_amount;
                let exchangeRate = scriptContext.request.parameters.exchange_rate;

                try {

                    let akshayaRecord = record.create({
                        type: 'customrecord_jj_akshaya_registration',
                        isDynamic: true
                    });

                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_name1',
                        value: name
                    });
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_country',
                        value: country
                    }); 
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_age1',
                        value: age
                    }); 
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_phone1',
                        value: phone
                    }); 
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_email1',
                        value: email
                    }); 
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_language',
                        value: language
                    }); 
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_base_currency',
                        value: baseCurrency
                    }); 
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_transaction_currency',
                        value: transactionCurrency
                    }); 
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_fee_amount',
                        value: feeAmount
                    }); 
                    akshayaRecord.setValue({
                        fieldId: 'custrecord_jj_exchange_rate',
                        value: exchangeRate
                    }); 
                
                    recordId = akshayaRecord.save();

                    // email.send({
                    //     author: -5, 
                    //     recipients: 'abhishek@gnail.com',
                    //     subject: 'Tution Fee Query Received for Training',
                    //     body: 'Dear Admin \n \n A candidate has been succcessfully registered for training \n \n Record Link: \n https://td2920694.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=66&id='+ recordId
        
                    // });

                    email.send({
                        author: -5,
                        recipients: 'abhishek@gnail.com',
                        subject: 'Test Sample Email Module',
                        body: 'email body'
                    
                    });

                    scriptContext.response.write('Registration was successfully completed. Record ID: ' + recordId);

                    

                } catch (e) {
                    log.error({
                        title: 'Error in Creating Record',
                        details: e.toString()
                    });
                    scriptContext.response.write('An error occurred while creating record: ' + e.message);
                }
            }
           

        }

        return { onRequest }

    });
