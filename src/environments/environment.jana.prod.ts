export const environment = {
	prod: true,
	uat: false,
	// mobileAPIUrl: 'https://janamapi.finagg.in/finAggMobileAPI/api/v1/',
	// adminAPIUrl: 'https://jana.finagg.in/finAggPortalAPIService/api/v1/',
	mobileAPIUrl: 'https://scf.janabank.com/finAggMobileAPI/api/v1/',
	adminAPIUrl: 'https://scf.janabank.com/finAggPortalAPIService/api/v1/',
	orgin:'https://janamapi.finagg.in',

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
	jana:1000,
	abfl:6630,
	tvs:253
}
export const link = {
	gstnlink : 'https://scf.janabank.com/portal/#/gstotpcollection/gstuser/'
};


export  const crypto={
	passphrase:"7$G<e7q}LX!3GeK",
	iv : 'FB31757B1FEDDD2761C27D05B723E9C9',
	salt : '7FE722FDCAA34580A9E89502F8275AB81A2C3568B9524FE985B5B19C06D10EC1',
	iterationCount : 1000,
	keySize : 128
  }