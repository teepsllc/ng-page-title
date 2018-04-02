/**
 * stateTitle
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");


/* Files */


/* @ngInject */
function StateTitle ($rootScope, $interpolate, $state) {


    return {

        link: function (scope, element, attrs) {

            var listener = function (event, toState) {

                var title = attrs.pageTitle; /* Get the default title */
                var titleElement = attrs.titleElement || "pageTitle"; /* Where to look for the title in the data */
                var pattern = attrs.pattern || null; /* Do we need to decorate the title? */
                var emptyPattern = attrs.emptyPattern || null;

                /* Get the page title from the data element */
                if (_.has(toState, "data") && _.has(toState.data, titleElement) && _.isEmpty(toState.data[titleElement]) === false) {
                    title = toState.data[titleElement];
                }

                /* Interpolate the title */
                var currentState = next;
                if (_.has(currentState, "locals")) {
                    currentState = currentState.locals;
                }

                title = $interpolate(title)(currentState);

                if (_.isString(pattern)) {
                    if (!title) {
                        title = emptyPattern;
                    } else {
                        title = pattern.replace(/\%s/g, title);
                    }
                }

                /* Set the title */
                element.text(title);

            };

            $rootScope.$on("$stateChangeSuccess", listener);

        },

        restrict: "A",

        scope: false

    };


}


module.exports = StateTitle;
