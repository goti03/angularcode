export const environment = {
	prod: true,
	uat: false,
	mobileAPIUrl: 'https://mapi.finagg.in/finAggMobileAPI/api/v1/',
	adminAPIUrl: 'https://portal.finagg.in/finAggPortalAPIService/api/v1/',
	orgin:'https://mapi.finagg.in',
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
	UGRO:382,
	FINAGG:381,
	jana:5363,
	abfl:6630,
	tvs:253
}
export const link = {
	gstnlink : 'https://portal.finagg.in/finAggPortal/#/gstotpcollection/gstuser/'
};


export  const crypto={
	passphrase:"7$G<e7q}LX!3GeK",
	iv : 'FB31757B1FEDDD2761C27D05B723E9C9',
	salt : '7FE722FDCAA34580A9E89502F8275AB81A2C3568B9524FE985B5B19C06D10EC1',
	iterationCount : 1000,
	keySize : 128
  }