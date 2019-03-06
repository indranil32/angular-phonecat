'use strict';

// Register `killbill` component, along with its associated controller and template
angular.
  module('killbill').
  component('killbill', {
    templateUrl: 'killbill/killbill.template.html',
    controller: ['KillBillService', '$sce', function KillBillController(KillBillService, $sce) {
    	var self = this;
    	// data setup
    	this.groupSchema = [];
    	var plainSchema = {};
    	plainSchema.key = 'AccountId';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	plainSchema = {};
    	plainSchema.key = 'basePackage_Selected';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=false;
    	this.groupSchema.push(plainSchema);
    	
    	plainSchema = {};
    	plainSchema.key = 'currency_Selected';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=false;
    	this.groupSchema.push(plainSchema);
    	plainSchema = {};
    	plainSchema.key = 'amount';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=false;
    	this.groupSchema.push(plainSchema);
    	
    	plainSchema = {};
    	plainSchema.key = 'paymentMethod_Selected_External';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=false;
    	this.groupSchema.push(plainSchema);
    	
    	this.user = {};
    	this.user.plainAttrs={};
    	for (var i = 0, len = this.groupSchema.length; i < len ; i ++) {
    		var ps = this.groupSchema[i];
    		var key = ps.key;
    		this.user.plainAttrs[key]={};
    		this.user.plainAttrs[key].values=[];
    	}
    	// test data
    	this.user.plainAttrs['AccountId'].values=["1234"];
    	
    	var details = KillBillService.getConfig("killbill");
    	var req = {
			method: 'GET',
			url: details.baseUrl+details.packagesURL,
			headers: details.headers
    	}
    	
    	this.availableOptions = {};
    	//[{key:'bundle1', content:'Lite package'}, {key:'bundle2', content:'Ultimate Package'}];
    	this.availableOptions.basePackages=[];
    	this.availableOptions.currencys = [];
    	this.availableOptions.amoutn = 'Please select currency';
    	
    	//[{key:'paypal', content:'Paypal'}, {key:'stripe', content:'Stripe'}];
    	this.availableOptions.paymentMethods=[];
    	
    	this.currencys = {};
		this.amount = {};
    	this.user.killbillConfig = KillBillService.getConfig();
    	KillBillService.getBaseAvailablePackages(req).then(function(data) {
    	    var pkgList = data;
    	    console.log(pkgList)
        	for (var i = 0 , len=pkgList.length; i < len ; i++) {
        		var expr = pkgList[i].product+ " -- " + pkgList[i].plan + " -- " + pkgList[i].finalPhaseBillingPeriod;
        		self.availableOptions.basePackages.push({key: expr, content: expr});
        		self.currencys[expr] = [];        		
        		for (var j = 0 , len2= pkgList[i].finalPhaseRecurringPrice.length; j < len2 ; j++) {
        			//self.availableOptions.basePackages.push({key: pkgList[i].product, content: pkgList[i].product+ " -- " + pkgList[i].plan + " -- " + pkgList[i].finalPhaseBillingPeriod + " -- " + pkgList[i].finalPhaseRecurringPrice[j].currency + " -- " + pkgList[i].finalPhaseRecurringPrice[j].value});
        			self.currencys[expr].push(pkgList[i].finalPhaseRecurringPrice[j].currency);
        			var id = expr + ' -- ' + pkgList[i].finalPhaseRecurringPrice[j].currency;
        			self.amount[id] = pkgList[i].finalPhaseRecurringPrice[j].value;
        		}
        	}
    	}, function(err) {
    		console.log(err);
    	});

    	req = {
			method: 'GET',
			url: details.baseUrl+details.paymentMethodsURL,
			headers: details.headers
    	}

    	KillBillService.getPaymentMethods(req).then(function(data) {
    		var payList = data
        	console.log(payList)
        	for (var i = 0 , len=payList.length; i < len ; i++) {
        		//self.availableOptions.paymentMethods.push({key: payList[i].paymentMethodId, content: payList[i].pluginName});
        		self.availableOptions.paymentMethods.push({key: payList[i].pluginName, content: payList[i].pluginName});
        	}
    	}, function(err) {
    		console.log(err);
    	});
    	console.log(this.availableOptions)
    	console.log(this.user)
    	
    	this.changeme = function(name) {
    		/*alert('Selected package - '+ this.user.plainAttrs.basePackage_Selected.values +
    				'\r\nSelected Payment method - ' + this.user.plainAttrs.paymentMethod_Selected_External.values +
    				'\r\nSelected Payment method - ' + this.user.plainAttrs.currency_Selected.values +
    				'\r\nSelected Payment method - ' + this.user.plainAttrs.amount.values);*/    		
    		//alert(name);
    		var selectedPkg = this.user.plainAttrs.basePackage_Selected.values;
    		if (name === 'basePackage_Selected') {    			
    			var c = this.currencys[selectedPkg]
    			this.availableOptions.currencys[selectedPkg] = [];
    			this.user.plainAttrs.currency_Selected.values=[];
    			this.availableOptions.currencys = [];
    			for (var i = 0, len = c.length; i < len; i++) {
    				this.availableOptions.currencys.push({key: c[i], content: c[i]});    				
    			} 	 
    		} else if (name  === "currency_Selected") {
    			var selectedCurr = this.user.plainAttrs.currency_Selected.values;
    			//alert(selectedCurr);
    			//alert(this.amount[selectedPkg +' -- '+ selectedCurr]);
    			this.user.plainAttrs.amount.values=[];
    			this.user.plainAttrs.amount.values.push(this.amount[selectedPkg +' -- '+ selectedCurr]);
    			this.user.paypal={};
    			this.user.paypal.name=this.user.plainAttrs.basePackage_Selected.values[0];
    			this.user.paypal.currency=this.user.plainAttrs.currency_Selected.values[0]
    			this.user.paypal.price=this.user.plainAttrs.amount.values[0];    			
    		} 		 
    	};
    	
    	this.trustSrc = function(src) {
    	    return $sce.trustAsResourceUrl(src);
    	};
}]});
