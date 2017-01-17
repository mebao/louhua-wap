app.directive('calendarWidget', function(){
	var ctrl=['$scope','$rootScope',function($scope,$rootScope){
	    var defaults={
	    	title: '请选择日期',
	    	months: ['01月', '02月', '03月', '04月', '05月', '06月',
                '07月', '08月', '09月', '10月', '11月', '12月'],
            days: ['日', '一', '二', '三', '四', '五', '六'],
	    	date: new Date(),
			start_date: '',
			end_date: '',
			selectedCallback: ''
		},
		_this=this,
		currentYear,currentMonth,currentDate;

		$scope.defaults = angular.extend(angular.copy(defaults), window.calendarConfig);

		$rootScope.$on('setCalendarConfig', function (event, data) {
            var temp = angular.copy(defaults);
            $scope.defaults = angular.extend(temp, data);
        });

		$scope.daySelected=$scope.defaults.title;
		$scope.showCalendar=false;
		$scope.calendar=function(){
			$scope.showCalendar=true;
		}

		var _init=function(){
			_this.settings=angular.extend({}, $scope.defaults);
			currentYear=_this.settings.date.getFullYear();
			currentMonth=_this.settings.date.getMonth();
			currentDate=new Date(currentYear, currentMonth, _this.settings.date.getDate());
			$scope.year=currentYear;
			$scope.month=_this.settings.months[currentMonth];
			$scope.days=_this.settings.days;
			_render();
		}

		/**
		 * 渲染日历
		 */
		var _render=function(){
			_renderBody(currentDate);
		}

		/**
		 * 组合日历
		 */
		var _renderBody=function(date){
			var firstDay=_firstDayOfMonth(date);
			var days=_daysInMonth(date);
			var rows=Math.ceil((firstDay+days)/7);
			var dayArray=[];
			var dayRow=[];
			for(var i=0; i<rows; i++){
				for(var j=0; j<7; j++){
					if(i*7+j<firstDay || i*7+j>=firstDay+days){
						dayRow.push({'show': false, 'day': '', 'date': '', 'optional': false});
					}else{
						//当天日期如果小于开始日期，不可选择
						var dayNum=i*7+j-firstDay+1;
						var sameDay=new Date(date.getFullYear(), date.getMonth(), dayNum);
						var dayObj={
							'show': true,
							'day': dayNum,
							'date': date.getFullYear()+'-'+(date.getMonth()+1<10? '0'+(date.getMonth()+1): (date.getMonth()+1))+'-'+(dayNum<10? '0'+dayNum: dayNum),
							'optional': true
						};
						if($scope.defaults.start_date!=''){
							if(sameDay<$scope.defaults.start_date){
								dayObj.optional=false;
							}
						}
						if($scope.defaults.end_date!=''){
							if(sameDay>$scope.defaults.end_date){
								dayObj.optional=false;
							}
						}
						dayRow.push(dayObj);
					}
				}
				dayArray.push(dayRow);
				dayRow=[];
			}
			$scope.dayArray=dayArray;
		}

		/**
		 * 获取月份第一天是星期几[0-6]
		 */
		var _firstDayOfMonth=function(date){
			return (new Date(date.getFullYear(), date.getMonth(), 1)).getDay();
		}

		/**
		 * 获取月份总天数
		 */
		var _daysInMonth=function(date){
			return (new Date(date.getFullYear(), date.getMonth()+1, 0)).getDate();
		}

		/**
		 * 切换年份、月份
		 */
		$scope.changeCalendar=function(type){
			if(type=='next-year'){
				currentDate.setFullYear(currentDate.getFullYear()+1);
				_this.refresh(currentDate);
			}else if(type=='upper-year'){
				currentDate.setFullYear(currentDate.getFullYear()-1);
				_this.refresh(currentDate);
			}else if(type=='next-month'){
				currentDate.setMonth(currentDate.getMonth()+1);
				_this.refresh(currentDate);
			}else if(type=='upper-month'){
				currentDate.setMonth(currentDate.getMonth()-1);
				_this.refresh(currentDate);
			}
		}

		/**
		 * 选择日期
		 */
		$scope.clickOnSelect=function(dayObj){
			if(dayObj.show&&dayObj.optional){
				$scope.daySelected=dayObj.date;
				$scope.backDate=dayObj;
				$scope.showCalendar=false;
			}
		}

		$scope.$watch('backDate', function(n, o){
			if($scope.defaults.selectedCallback && typeof $scope.defaults.selectedCallback === 'function'){
				$scope.defaults.selectedCallback($scope.backDate);
			}
		})

		/**
		 * 更新日历
		 */
		this.refresh=function(date){
			$scope.year=date.getFullYear();
			$scope.month=_this.settings.months[date.getMonth()];
			_renderBody(date);
		}

		_init();
	}];
	return {
		restrict: 'A',
		replace: true,
		controller: ctrl,
		templateUrl: "template/calendar.html"
	}
});
app.run(['$templateCache', function($templateCache){
	$templateCache.put('template/calendar.html',
		'<div>\
			<p ng-bind="daySelected" ng-click="calendar()"></p>\
			<div class="calendar-mask" ng-show="showCalendar">\
				<div class="calendar-body">\
					<div class="calendar-header flex">\
						<div class="header-year flex-1 flex">\
							<div class="year-left flex-1 text-center" ng-click="changeCalendar(\'upper-year\')">\
								<div class="left-btn"></div>\
							</div>\
							<div class="year-text" ng-bind="year">\
							</div>\
							<div class="year-right flex-1 text-center" ng-click="changeCalendar(\'next-year\')">\
								<div class="right-btn"></div>\
							</div>\
						</div>\
						<div class="header-month flex-1 flex">\
							<div class="month-left flex-1 text-center" ng-click="changeCalendar(\'upper-month\')">\
								<div class="left-btn"></div>\
							</div>\
							<div class="month-text" ng-bind="month">\
							</div>\
							<div class="month-right flex-1 text-center" ng-click="changeCalendar(\'next-month\')">\
								<div class="right-btn"></div>\
							</div>\
						</div>\
					</div>\
					<div class="calendar-week flex">\
						<div class="week-item flex-1" ng-repeat="day in days" ng-bind="day">\
						</div>\
					</div>\
					<div class="calendar-day">\
						<table>\
							<tr ng-repeat="dayRow in dayArray">\
								<td ng-class="{\'show\': !(dayObj.show && !dayObj.optional), \'not-show\': dayObj.show && !dayObj.optional}" ng-repeat="dayObj in dayRow" ng-bind="dayObj.day" ng-click="clickOnSelect(dayObj)"></td>\
							</tr>\
						</table>\
					</div>\
				</div>\
		    </div>\
	    </div>');
}]);