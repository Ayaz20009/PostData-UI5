sap.ui.define([
		"testing/controller/BaseController",
		"sap/ui/core/routing/History",
		"sap/m/MessageToast"
	], function (BaseController,History,MessageToast) {
		"use strict";

		return BaseController.extend("testing.controller.Add", {
		
		onInit: function() {
			// Register to the add route matched
			this.getRouter().getRoute("addPage").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function() {
			// register for metadata loaded events
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		_onMetadataLoaded: function(){
			// create default properties
			
			var oProperties = {
			BusinessPartnerRole: "01",
			CurrencyCode: "EUR"
			};
			// create new entry in the model
			this._oContext = this.getModel().createEntry("/BusinessPartnerSet", {
			properties: oProperties,
			success: this._onCreateSuccess.bind(this)
			});
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},
		_onCreateSuccess: function (oProduct) {
			// navigate to the new product's object view
			var sId = oProduct.BusinessPartnerID;
			this.getRouter().navTo("object", {
			objectId : sId
			}, true);
			// unbind the view to not show this object again
			this.getView().unbindObject();
			// show success messge
			MessageToast.show('New Company Created', {
			closeOnBrowserNavigation : false
			});
		},
		onNavBack : function() {
			var oHistory = History.getInstance(),
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		},
		onCancel: function() {
			this.onNavBack();
		},
		/**
		* Event handler for the save action
		* @public
		*/
		onSave: function() {
			this.getModel().submitChanges();
		}
	});
});