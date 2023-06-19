export const environment = {
	prod: false,
	uat: true,
	gemProgramTypeId:4,
	// mobileAPIUrl: 'https://uat.finagg.in:8228/finAggMobileAPI/api/v1/',
	// adminAPIUrl: 'https://uat.finagg.in:8228/finAggPortalAPIService/api/v1/',
	mobileAPIUrl: 'https://tvscuat.finagg.in:8080/finAggMobileAPI/api/v1/',
	adminAPIUrl: 'https://tvscuat.finagg.in:8080/finAggPortalAPIService/api/v1/',
	orgin:'https://tvscuat.finagg.in',
	recaptcha: {
		siteKey: '6Ld9hQ0iAAAAAAcLhyBDvMioqJiaQpqmBeykt4-H',
	  },
	  readOnly :{
		roleId: 18,
		anchorRoleId:19
	}
};
export const lender = {
	IDFC:100,
	UGRO:740,
	FINAGG:381,
	jana:5363,
	abfl:6630,
	tvs:253
};
export const link = {
	gstnlink : 'https://uat.finagg.in:8228/finAgg/#/gstotpcollection/gstuser/'
};


export  const crypto={
	passphrase:"7$G<e7q}LX!3GeK",
	iv : 'FB31757B1FEDDD2761C27D05B723E9C9',
	salt : '7FE722FDCAA34580A9E89502F8275AB81A2C3568B9524FE985B5B19C06D10EC1',
	iterationCount : 1000,
	keySize : 128
  }