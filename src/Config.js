let Config = {
	localTimezoneOffset: 5,
	//интервал в секундах для обновления сетки расписания для сотрудника парка
	enterTimeSheetUpdatePeriod: 30,
	urls:                {
		references: {
			load: '/timeSheet/references/load-references/',
		},
		timeSheet:  {
			loadBlocks: '/timeSheet/time-sheet/load-blocks/',
			emailSendingConfig: {
				load:     '/timeSheet/email-sending-config/load/',
				save:     '/timeSheet/email-sending-config/save/',
				testSend: '/timeSheet/email-sending-config/test-send/',
			},
		},
		timeSheetControl: {
			loadWeekSheet:        '/timeSheet/time-sheet-control/load-for-week/',
			saveWeekSheet:        '/timeSheet/time-sheet-control/save-for-week/',
			applyTemplateForWeek: '/timeSheet/time-sheet-control/apply-template-for-week/',
		},
		ticketConfig: {
			load: '/order/ticket-config/load',
			save: '/order/ticket-config/save',
		},
		order: {
			create: {
				createNewOrdersBySlots: '/order/create/create-new-orders-by-slots/',
				createNewOrderByBlocks: '/order/create/create-new-order-by-blocks/',
				createOrderForProduct:  '/order/create/create-order-for-product/',
			},
			management: {
				list:             '/order/management/list/',
				getOrderData:     '/order/management/get-order-data/',
				addPayment:       '/order/management/add-payment/',
				cancel:           '/order/management/cancel/',
				editSlots:        '/order/management/edit-slots/',
				printTicket:      '/order/print-ticket/',
				addService:       '/order/management/add-service/',
				addTournament:    '/order/management/add-tournament/',
				editOrderSlots:   '/order/management/edit-slots/',
				addDiscountCard:  '/order/management/add-discount-card/',
			},
			certificate: {
				search:       '/order/certificate/search',
				create:       '/order/certificate/create',
				edit:         '/order/certificate/edit',
				load:         '/order/certificate/load',
				loadByNumber: '/order/certificate/load-by-number',
			},
			discountCard: {
				search:       '/order/discount-card/search',
				create:       '/order/discount-card/create',
				edit:         '/order/discount-card/edit',
				loadById:     '/order/discount-card/load-by-id',
				loadByNumber: '/order/discount-card/load-by-number',
			},
		},
		price: {
			savePricePositions: '/timeSheet/price/save-price-position',
		},
		logFrontError: '/log/frontend-errors/',
		user: {
			checkAuthorization: '/user/auth/check-authorization/',
			auth:               '/user/auth/authorizate/',
			logout:             '/user/auth/logout/',
			management: {
				search:   '/user/user-search/search/',
				load:     '/user/user-search/load/',
				register: '/user/management/create/',
				edit:     '/user/management/edit/',
				delete:   '/user/management/delete/',
			},
		},
		enter: {
			loadTimeSheet: 'order/enter/load-time-sheet',
			ticketSearch:  'order/enter/ticket-search',
			ticketApprove: 'order/enter/ticket-approve',
		},
		report: {
			loadReportFilters: 'report/report/load-report-filters',
			anyDay:            'report/report/any-day',
			today:             'report/report/today',
			month:             'report/report/month',
			correctReport:     'report/report/correct-report',
			loadCsv:           'report/report-download/get-csv',
			printAnyDay:       'report/report-download/print-any-day',
			printMonth:        'report/report-download/print-month',
			printToday:        'report/report-download/print-today',
		},
	}
};

export default Config;