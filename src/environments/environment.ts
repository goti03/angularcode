export const environment = {
	prod: false,
	uat: false,
	gemProgramTypeId: 4,
	//finagg prod
	 //mobileAPIUrl: 'https://mapi.finagg.in/finAggMobileAPI/api/v1/',
	 //adminAPIUrl: 'https://portal.finagg.in/finAggPortalAPIService/api/v1/',
	//mobileAPIUrl: 'https://scf.janabank.com/finAggMobileAPI/api/v1/',
	//adminAPIUrl: 'https://scf.janabank.com/finAggPortalAPIService/api/v1/',
	//orgin:'https://scf.janabank.com',
	////finagg uat
	//   mobileAPIUrl: 'https://uat.finagg.in:8228/finAggMobileAPI/api/v1/',
	//  adminAPIUrl: 'https://uat.finagg.in:8228/finAggPortalAPIService/api/v1/',
	orgin: 'http://local.finagg.in:8080',
	// local
	// mobileAPIUrl: 'http://localhost:8143/finAggMobileAPI/api/v1/',
	//adminAPIUrl: 'http://localhost:8081/finAggPortalAPIService/api/v1/',

	mobileAPIUrl: 'http://192.168.1.34:8141/finAggMobileAPI/api/v1/',
	 adminAPIUrl: 'http://192.168.1.34:8080/finAggPortalAPIService/api/v1/',
	// orgin:'http://local.finagg.in:8228',	
	
// jana
// mobileAPIUrl: 'https://janauat.finagg.in:8228/finAggMobileAPI/api/v1/',
//  adminAPIUrl: 'https://janauat.finagg.in:8228/finAggPortalAPIService/api/v1/',
	// mobileAPIUrl: 'https://scf.janabank.com/finAggMobileAPI/api/v1/',
	// adminAPIUrl: 'https://jana.finagg.in/finAggPortalAPIService/api/v1/'
// tvsc
	//  mobileAPIUrl: 'https://janauat.finagg.in:8080/finAggMobileAPI/api/v1/',
	//  adminAPIUrl: 'https://janauat.finagg.in:8080/finAggPortalAPIService/api/v1/',

// abfl
	//  mobileAPIUrl: 'https://abfluat.finagg.in:8229/finAggMobileAPI/api/v1/',
	// adminAPIUrl: 'https://abfluat.finagg.in:8229/finAggPortalAPIService/api/v1/',

	readOnly :{
		roleId: 18,
		anchorRoleId:19
	},
	recaptcha: {
		siteKey: '6Ldl4ochAAAAAHkKe2_uUaKQ2ABC0-M9c1aSQ7Lx',
	  },

};

export const lender = {
	IDFC: 100,
	// UGRO:382,
	UGRO: 740,
	FINAGG: 381,
	jana:5363 ,
	abfl:6630,
	tvs:253
};

export const link = {
	gstnlink: 'https://uat.finagg.in:8228/finAgg/#/gstotpcollection/gstuser/',
	readOnlyRoleId : 18,

};
export const crypto = {
	passphrase: "7$G<e7q}LX!3GeK",
	iv: 'FB31757B1FEDDD2761C27D05B723E9C9',
	salt: '7FE722FDCAA34580A9E89502F8275AB81A2C3568B9524FE985B5B19C06D10EC1',
	iterationCount: 1000,
	keySize: 128
}