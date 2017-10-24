jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"testing/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"testing/test/integration/pages/Worklist",
		"testing/test/integration/pages/Object",
		"testing/test/integration/pages/NotFound",
		"testing/test/integration/pages/Browser",
		"testing/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "testing.view."
	});

	sap.ui.require([
		"testing/test/integration/WorklistJourney",
		"testing/test/integration/ObjectJourney",
		"testing/test/integration/NavigationJourney",
		"testing/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});