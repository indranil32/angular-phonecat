/* 
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict';

angular.module('killbill')
        .factory('KillBillService', ['$http',
          function ($http) {

            var killBillService = {};
            
            var error = function (response) {
                console.error("Something went wrong", response);
                //return $q.reject(response.data || response.statusText);
                return response.statusText;
            };
            
            killBillService.getBaseAvailablePackages = function (req) { 
	            return $http(req).then(function(response){
	            	console.log(response);
	            	return response.data;
	            }, error);
	            //JSON.parse('[ { "product": "Sports", "plan": "sports-monthly", "priceList": "DEFAULT", "finalPhaseBillingPeriod": "MONTHLY", "finalPhaseRecurringPrice": [ { "currency": "GBP", "value": 375 }, { "currency": "USD", "value": 500 } ] }, { "product": "Standard", "plan": "standard-monthly", "priceList": "DEFAULT", "finalPhaseBillingPeriod": "MONTHLY", "finalPhaseRecurringPrice": [ { "currency": "GBP", "value": 75 }, { "currency": "USD", "value": 100 } ] } ]');
            };
            
            killBillService.getPaymentMethods = function (req) {
             return $http(req).then(function(response){
            	 console.log(response);
            	 return response.data;
             }, error);
             //JSON.parse('[ { "paymentMethodId": "916619a4-02bb-4d3d-b3da-2584ac897b19", "externalKey": "coolPaymentMethod", "accountId": "84c7e0d4-a5ed-405f-a655-3ed16ae19997", "isDefault": false, "pluginName": "__EXTERNAL_PAYMENT__", "pluginInfo": null, "auditLogs": [] }, { "paymentMethodId": "dc89832d-18a3-42fd-b3be-cac074fddb36", "externalKey": "paypal", "accountId": "ca15adc4-1061-4e54-a9a0-15e773b3b154", "isDefault": false, "pluginName": "killbill-paypal-express", "pluginInfo": null, "auditLogs": [] } ]');
            };            
            
            killBillService.getConfig = function () {
            	return JSON.parse('{ "baseUrl": "http://35.185.74.215:8080/1.0/kb", "paymentMethodsURL": "/paymentMethods/pagination?offset=0&limit=100&withPluginInfo=false&audit=NONE", "packagesURL": "/catalog/availableBasePlans", "headers": { "accept": "application/json", "authorization": "Basic YWRtaW46cGFzc3dvcmQ=", "X-Killbill-ApiKey": "admin", "X-Killbill-ApiSecret": "password" }, "stripeURL": "http://35.185.74.215:8080/charge", "stripePublicKey": "pk_test_CmztJP46fhZLqKzLJGzRhfwC", "paypalURL":"https://www.sandbox.paypal.com/cgi-bin/webscr", "paypalInvoiceURL": "http://35.185.74.215:8080/redirect?externalKey=", "paypalBusinessAccount" : "indranil_055332@yahoo.com" }');
            }
            
            return killBillService;         
}]);


