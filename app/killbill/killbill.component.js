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
    	plainSchema.key = 'email';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	var plainSchema = {};
    	plainSchema.key = 'name';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	var plainSchema = {};
    	plainSchema.key = 'address';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	var plainSchema = {};
    	plainSchema.key = 'postalCode';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	var plainSchema = {};
    	plainSchema.key = 'company';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	var plainSchema = {};
    	plainSchema.key = 'city';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	var plainSchema = {};
    	plainSchema.key = 'state';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	var plainSchema = {};
    	plainSchema.key = 'country';
    	plainSchema.mandatoryCondition = true;
    	plainSchema.multivalue=false;
    	plainSchema.type='String';
    	plainSchema.readonly=true;
    	this.groupSchema.push(plainSchema);
    	var plainSchema = {};
    	plainSchema.key = 'phone';
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
    	// init data
    	this.user.plainAttrs['AccountId'].values=["NA"];
    	this.user.plainAttrs['email'].values=["NA"];
    	this.user.plainAttrs['address'].values=["NA"];
    	this.user.plainAttrs['phone'].values=["NA"];
    	this.user.plainAttrs['postalCode'].values=["NA"];
    	this.user.plainAttrs['country'].values=["NA"];
    	this.user.plainAttrs['state'].values=["NA"];
    	this.user.plainAttrs['city'].values=["NA"];
    	this.user.plainAttrs['name'].values=["NA"];
    	this.user.plainAttrs['company'].values=["NA"];
    	this.user.username="demo@newremmedia.com";
    	
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
    	this.availableOptions.amount = 'Please select currency';
    	
    	//[{key:'paypal', content:'Paypal'}, {key:'stripe', content:'Stripe'}];
    	this.availableOptions.paymentMethods=[];
    	
    	this.currencys = {};
		this.amount = {};
    	this.user.killbillConfig = KillBillService.getConfig();
    	KillBillService.getBaseAvailablePackages(req).then(function(data) {
    	    var pkgList = data;
        	for (var i = 0 , len=pkgList.length; i < len ; i++) {
        		var expr = pkgList[i].product+ "/" + pkgList[i].plan + "/" + pkgList[i].priceList + "/" + pkgList[i].finalPhaseBillingPeriod;
        		self.availableOptions.basePackages.push({key: expr, content: expr});
        		self.currencys[expr] = [];        		
        		for (var j = 0 , len2= pkgList[i].finalPhaseRecurringPrice.length; j < len2 ; j++) {
        			//self.availableOptions.basePackages.push({key: pkgList[i].product, content: pkgList[i].product+ " -- " + pkgList[i].plan + " -- " + pkgList[i].finalPhaseBillingPeriod + " -- " + pkgList[i].finalPhaseRecurringPrice[j].currency + " -- " + pkgList[i].finalPhaseRecurringPrice[j].value});
        			self.currencys[expr].push(pkgList[i].finalPhaseRecurringPrice[j].currency);
        			var id = expr + '/' + pkgList[i].finalPhaseRecurringPrice[j].currency;
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
        	for (var i = 0 , len=payList.length; i < len ; i++) {
        		var ele = {key: payList[i].pluginName, content: payList[i].pluginName};
        		if (self.availableOptions.paymentMethods.indexOf(ele)==-1)
        			self.availableOptions.paymentMethods.push(ele);
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
    			//alert(this.amount[selectedPkg +'/'+ selectedCurr]);
    			this.user.plainAttrs.amount.values=[];
    			this.user.plainAttrs.amount.values.push(this.amount[selectedPkg +"/"+ selectedCurr]);
    			
    			this.user.pkgName={};
    			this.user.pkgName.values=this.user.plainAttrs.basePackage_Selected.values;
    			this.user.currency={};
    			this.user.currency.values=this.user.plainAttrs.currency_Selected.values
    			this.user.price={};
    			this.user.price.values=this.user.plainAttrs.amount.values;
    			
    			//test data
    	    	this.user.AccountId={};
    	    	this.user.AccountId.values=["1234"];
    	    	this.user.email={};
    	    	this.user.email.values=["demo91@newremmedia.com"];
    	    	this.user.address={};
    	    	this.user.address.values=["demo address"];
    	    	this.user.phone={};
    	    	this.user.phone.values=["+619999999999"];
    	    	this.user.postalCode={};
    	    	this.user.postalCode.values=["MA1234"];
    	    	this.user.country={};
    	    	this.user.country.values=["Canada"];
    	    	this.user.state={};
    	    	this.user.state.values=["Ontario"];
    	    	this.user.city={};
    	    	this.user.city.values=["Toronto"];
    	    	this.user.name={};
    	    	this.user.name.values=["New Rem Media"];
    	    	this.user.company={};
    	    	this.user.company.values=["New Rem Media"];
    	    	
    	    	this.user.plainAttrs['AccountId'].values=["1234"];
    	    	this.user.plainAttrs['email'].values=["demo91@newremmedia.com"];
    	    	this.user.plainAttrs['address'].values=["demo address"];
    	    	this.user.plainAttrs['phone'].values=["+619999999999"];
    	    	this.user.plainAttrs['postalCode'].values=["MA1234"];
    	    	this.user.plainAttrs['country'].values=["Canada"];
    	    	this.user.plainAttrs['state'].values=["Ontario"];
    	    	this.user.plainAttrs['city'].values=["Toronto"];
    	    	this.user.plainAttrs['name'].values=["New Rem Media"];
    	    	this.user.plainAttrs['company'].values=["New Rem Media"];
    		} 		 
    	};
    	
    	this.trustSrc = function(src) {
    	    return $sce.trustAsResourceUrl(src);
    	};
}]});
