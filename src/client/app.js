'use strict';

//angular module & Bootstrap App
angular.module('app', [
    'app.components'
]);

//components module
angular.module('app.components', [
    'app.components.form',
    'app.components.input'
]);

// form/container component
angular.module('app.components.form', []);

angular.module('app.components.form')
    .directive('formContainer', formContainerDirective);

function formContainerDirective() {
    return {
        restrict: 'E',
        template: `
                    <div ng-init="vm.init()">
                        <button ng-click="vm.decrementCurrentField()" ng-show="vm.currentField && !vm.sumbittedData"> <- Back</button>
                        <form name="vm.form" novalidate ng-submit="vm.handleSubmit($event)">
                        <div ng-repeat="field in vm.fields">
                                <input-component
                                    id="{{vm.fields.indexOf(field)}}" 
                                    value="{{field.name}}"
                                    submission="vm.onSubmit(input, name, id)" 
                                    ng-show="field.show"
                                 >
                                </input-component>
                            </div>
                            <div ng-show="vm.currentField > vm.fields.length - 1 && !vm.sumbittedData">
                                <span>Do you wish to submit the form?</span>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                        <div ng-show="vm.sumbittedData">
                            <span>You have added: {{vm.sumbittedData}}</span>
                        </div>
                    </div>
        `,
        scope: {},
        controller: formContainerController,
        controllerAs: 'vm',
        bindToController: true,
        transclude: true
    }
}

function formContainerController() {
    var vm = this;

    vm.init = init;
    vm.onSubmit = onSubmit;
    vm.decrementCurrentField = decrementCurrentField;
    vm.handleSubmit = handleSubmit;

    function init() {
        vm.formData = {};
        vm.currentField = 0;
        vm.fields = [
            {name:'Name', show: true},
            {name: 'Age', show: false},
            {name: 'Hobby', show: false}
        ];
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(vm.form.$valid && vm.form.$dirty) {
            vm.sumbittedData = vm.formData;
        } else {
            decrementCurrentField();
        }
    }

    function onSubmit(value, name, id) {
        if(vm.form.$$controls[id].$dirty) {
            vm.formData[name] = value;

            incrementCurrentField();
        }
    }

    function incrementCurrentField() {
        if (vm.currentField < vm.fields.length) {
            vm.fields[vm.currentField].show = false;

            if(vm.fields[vm.currentField + 1]) {
                vm.fields[vm.currentField + 1].show = true;
            }

            if(vm.currentField < vm.fields.length) {
                vm.currentField += 1;
            }
        }
    }

    function decrementCurrentField() {
        if(vm.fields[vm.currentField]) {
            vm.fields[vm.currentField].show = false;
        }

        vm.fields[vm.currentField - 1].show = true;

        vm.currentField -= 1;
    }


}

// input component
angular.module('app.components.input', []);

angular.module('app.components.input')
    .directive('inputComponent', inputComponentDirective);

function inputComponentDirective() {
    return {
        restrict: 'E',
        template: `
                    <div ng-init="vm.init()">
                        <label for="vm.inputName" ng-bind="vm.inputName"></label>
                        <input id="vm.inputName" type="text" ng-model="vm.input" ng-required />
                            <input type="button" value="Next" ng-click="vm.submission({input: vm.input, name: vm.inputName, id: vm.id })" />
                    </div>
        `,
        scope: {
            value:"@",
            id: "@",
            submission:"&",
        },
        controller: inputComponentController,
        controllerAs: 'vm',
        bindToController: true
    }
}

function inputComponentController() {
    var vm = this;

    vm.init = init;

    function init() {
        vm.inputName = vm.value;
    }
}
