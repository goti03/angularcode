import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/index';
import { ApiResponse } from '../model/api.response';
import { ResponseType } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class ApiService {

  constructor(private https: HttpClient) { }

  // Get from Enviroment Variable

  baseUrl = environment.mobileAPIUrl;
  baseUr2 = environment.adminAPIUrl;
  // baseUr2='http://192.168.29.64:8082/finAggPortalAPIService/api/v1/'
  baseUr3 = 'https://portal.finagg.in:8080/lms/api/v1/';




  // master start
  getMasterList(): Observable<any> {
    return this.https.get(`${this.baseUr2}master/getMasterList`);
  }
  getMylistCreditlist(roleId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}sourcing/getMyListCreditApprovalList/${roleId}`);
  }
  getMasterSetup(id: number): Observable<any> {
    return this.https.get(`${this.baseUr2}master/getMastersById/${id}`);
  }
  deletefinanceentry(oomytId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}brandReport/removeBrandDataEntry/${oomytId}`);
  }
  createMasterSetup(master: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}master/createMaster`, master);
  }
  updateMasterSetup(id: number, value: any): Observable<any> {
    return this.https.put(`${this.baseUr2}master/updateMaster/${id}`, value);
  }
  // master end

  // program Start
  getProgramSetup(id: number): Observable<any> {
    return this.https.get(`${this.baseUr2}program/getProgramsById/${id}`);
  }

  createProgramSetup(program: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}program/createProgram`, program);
  }
  updateProgramSetup(id: number, value: any): Observable<any> {
    return this.https.put(`${this.baseUr2}program/updateProgram/${id}`, value);
  }
  deleteProgramSetup(id: number): Observable<any> {
    return this.https.delete(`${this.baseUr2}program/programs/${id}`, { responseType: 'text' });
  }
  getProgramSetupList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/getProgramList`);
  }

  getMasterProgramList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/masterProgramList`);
  }
  getProgramLenderList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/lenderList`);
  }
  getfilteredProgramList(programTypeId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getfilteredProgramList/${programTypeId}`);
  }
  skipGstCredential(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}gst/skipGstCredential`, data);

  }
  GenerateotpBank(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}login/validateUser`, data);

  }
  VerifyotpLMS(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}otp/verifyOTPForLMS`, data);

  }
  sendotplLMS(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}otp/sendOTPForLMS`, data);

  }
  updateDetailsLMS(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/remarksUpdateForLMS`, data);

  }
  saveshopVerification(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/saveShopVerification`, data);
  }
  getGstlist(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}gst/gstnList`, data);
  }
  verifyOTPconsent(data: any): Observable<any> {

    return this.https.post(`${this.baseUrl}schedule/getDigitalKYCOtpVerification`, data);
  }
  customerOTPconsent(data: any): Observable<any> {

    return this.https.post(`${this.baseUrl}otp/digitalKYCMessageForCustomer`, data);
  }
  getOtpgst(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}gst/authenticateRequestOTP`, data);
  }
  verifyOtpgst(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}gst/getAuthToken`, data);
  }
  getPartnerList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/partnerList`);
  }
  getProgramTypeList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/programTypeList`);
  }
  getProgramModeList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/programModeList`);
  }
  getRepaymentList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/repaymentList`);
  }
  updateInvoiceList(anchorRefNo: string, invoiceNo: string, invoiceDate: string, invoiceAmount: string, ldild: string, id: string): Observable<any> {

    return this.https.get(`${this.baseUr2}sourcing/invoiceUpdate`);
  }

  getBeneficiaryList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/beneficiaryList`);
  }
  getLoanTenureList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/getLoanTenureList`);
  }
  // program End

  //lender start
  getLenderSetup(id: number): Observable<any> {
    return this.https.get(`${this.baseUr2}lender/getLendersById/${id}`);
  }
  createLenderSetup(lender: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}lender/createLender`, lender);
  }
  updateLenderSetup(id: number, value: any): Observable<any> {
    return this.https.put(`${this.baseUr2}lender/updateLender/${id}`, value);
  }
  getLenderList(): Observable<any> {
    return this.https.get(`${this.baseUr2}lender/getLendersList`);
  }
  //lender end

  // sourcing partner start
  getSourcingSetup(id: number): Observable<any> {
    return this.https.get(`${this.baseUr2}sourcing/getSourcingById/${id}`);
  }
  createSourcingSetup(sourcing: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/createSourcing`, sourcing);
  }
  updateSourcingSetup(id: number, value: any): Observable<any> {
    return this.https.put(`${this.baseUr2}sourcing/updateSourcing/${id}`, value);
  }
  getSourcingList(): Observable<any> {
    return this.https.get(`${this.baseUr2}sourcing/getSourcingList`);
  }
  // sourcing partner end

  //upload start 
  getUploadSetup(id: number): Observable<any> {
    return this.https.get(`${this.baseUr2}sourcing/getSourcingById/${id}`);
  }
  getBranddetails(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}brandReport/getBrandMonthlyTurnOver/${orgId}`);
  }

  getBrand(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}brandReport/getBrandDetails/${orgId}`);
  }
  createUploadSetup(formData: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/uploadBrandData`, formData);
  }
  insertBrandData(dataList: Object, sourcingPartnerId: any, userId: any, programId: any, retailerId: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/insertBrandData/${sourcingPartnerId}/${userId}/${programId}/${retailerId}`, dataList);
  }
  updateUploadSetup(id: number, value: any): Observable<Object> {
    return this.https.put(`${this.baseUr2}sourcing/updateSourcing/${id}`, value);
  }
  getUploadList(): Observable<any> {
    return this.https.get(`${this.baseUr2}sourcing/getSourcingList`);
  }
  getBrandnode(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}brandReport/getBrandDetails/${orgId}`);
  }


  //upload end 

  // rules start
  getRuleDetails(id: number): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getRulesList/${id}`);
  }
  createRule(rule: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}rules/createRules`, rule);
  }
  // updateRule(id: number, value: any): Observable<Object> {
  //   return this.https.put(`${this.baseUr2}rules/updateRule/${id}`, value);
  // }
  updateRule(id: number, value: any): Observable<Object> {
    return this.https.post(`${this.baseUr2}rules/updateRules`, value);
  }
  getRuleList(): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getRulesList`);
  }
  getObjectList(): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getAllDataObjects`);
  }
  getTelcoObject(): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getTelcoObjects`);
  }
  getBureauObject(): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getBureauObjects`);
  }
  getProgramList(roleId:any, orgId:any): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getProgramList/${roleId}/${orgId}`);
  }
  getBrandList(): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getBrandDataList`);
  }
  getBankDataMonthly(): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getBankDataMonthlyList`);
  }
  getBankDataSummary(): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getBankDataSummary`);
  }
  getUomList(): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getUomList`);
  }
  getObjectByName(name: string): Observable<any> {
    return this.https.get(`${this.baseUr2}rules/getObjectByName/${name}`);
  }
  // rules end


  // brand start
  getBrandNodes(data: any): Observable<any> {
    console.count(this.baseUrl);
    return this.https.post(`${this.baseUr2}report/brandNodes`, data);
  }
  getLeadDetails(userId: any, roleId: any): Observable<any> {
    console.count(this.baseUrl);
    let params = new HttpParams().set('userId', userId)
    if (roleId == '15') {
      return this.https.get(`${this.baseUr2}sourcing/getLeadMangementList`, { params });
    } else {
      return this.https.get(`${this.baseUr2}sourcing/getLeadMangementList`);
    }
  }
  getBrandRetailer(orgId: string): Observable<any> {
    return this.https.get(`${this.baseUr2}report/brandData/${orgId}`);
  }
  insertDistributerBankDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/insertDistributerBankDetails`, data);
  }
  getDistributerBank(orgId: string): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getDistributerBankList/${orgId}`);
  }
  getTranchOpen(orgId: any, flag: any, startDate: any, endDate: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getTranchOpen/${orgId}/${flag}/${startDate}/${endDate}`);
  }
  getUnFinancedInvoices(orgId: any, flag: any, startDate: any, endDate: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getUnFinancedInvoices/${orgId}/${flag}/${startDate}/${endDate}`);
  }
  getTranchRepayment(orgId: any, flag: any, startDate: any, endDate: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getTranchRepayment/${orgId}/${flag}/${startDate}/${endDate}`);
  }

  getTranchfullyPaid(orgId: any, flag: any, startDate: any, endDate: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getTranchfullyPaid/${orgId}/${flag}/${startDate}/${endDate}`);
  }
  getTranchOverDue(orgId: any, flag: any, startDate: any, endDate: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getTranchOverDue/${orgId}/${flag}/${startDate}/${endDate}`);
  }
  // brand end

  // report start 
  getOverviewSetupList(obj: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/loanRequestList`, obj);
  }
  getLoanRequestStatus(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/loanRequestStatus/${id}/${loanid}`);
  }
  getCustomerDetailInfo(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/customerDetailInfo/${id}`);
  }
  getPendingapprovallist(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/getpendingorderinvoicelist`, data);
  }


  approveorderinvoice(obj: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/approveorderinvoicerequest`, obj);
  }
  getPendingsourceapprovallist(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/getSellerDisbursementDetails`, data);
  }


  getCustomerRetailerInfo(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/customerRetailerInfo/${id}`);
  }
  getCustomerTelcoDetailInfo(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/customerTelcoDetailInfo/${id}`);
  }
  getCustomerBrandInvoiceInfo(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/customerBrandInvoiceInfo/${id}`);
  }
  getCustomerBrandDetailsInfo(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/customerBrandDetailsInfo/${id}`);
  }
  getCustomerBankDetails(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/customerBankDetails/${loanid}`);
  }
  getAggregateBankDetails(id: number, loanid: number, month: String, year: String): Observable<any> {
    return this.https.get(`${this.baseUr2}report/aggregateBankDetails/${id}/${loanid}/${month}/${year}`);
  }
  getLoanRequestById(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/loanRequestById/${loanid}`);
  }
  getCustomerBankMergedDetails(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/customerBankMergedDetails/${loanid}`);
  }
  getCustomerBureauDetailsInfo(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/customerBureauDetailsInfo/${id}`);
  }
  getLoanMonthAvailableWithBank(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/loanMonthAvailable/${id}`);
  }
  getBankOutflowGroups(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankOutflowGroups`);
  }
  getBankInflowGroups(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankInflowGroups`);
  }
  getBankInflowGroupAmount(id: number, month: string, year: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankInflowGroupAmount/${id}/${month}/${year}/${loanid}`);
  }
  getBankOutflowGroupAmount(id: number, month: string, year: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankOutflowGroupAmount/${id}/${month}/${year}/${loanid}`);
  }
  getBankOutflowGroupswithBankId(id: number, loanid: number, bankid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankOutflowGroupsWithBankId/${bankid}`);
  }
  getBankInflowGroupswithBankId(id: number, loanid: number, bankid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankInflowGroupsWithBankId/${bankid}`);
  }
  getAggregateBankDetailswithBankId(id: number, loanid: number, month: String, year: String, bankid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/aggregateBankDetailsWithBankId/${id}/${loanid}/${month}/${year}/${bankid}`);
  }
  getcicSummaryData(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/cicSummaryData/${loanid}`);
  }
  getcicSummaryDetails(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/cicSummaryDetails/${loanid}`);
  }
  getSummaryDetails(id: number, loanid: number, gemId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/summaryDetails/${loanid}/${gemId}`);
  }
  getLoanMonthAvailable(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/loanMonthAvailable/${id}/${loanid}`);
  }
  getDisbursalInvoiceDetails(id: number, loanid: number, programTypeId: number, statusFlag: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/loanDisbursalInvoiceDetails/${loanid}/${programTypeId}/${statusFlag}`);
  }
  getRepaymentInvoiceDetails(id: number, loanid: number, programTypeId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getRepaymentInvoiceList/${loanid}/${programTypeId}`);
  }
  getDisbursalDetails(id: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/loanDisbursalDetails/${loanid}`);
  }
  getloanFormDetails(loanid: number, disbursalId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/loanFormDetails/${loanid}/${disbursalId}/0`);
  }
  getLoanCheckListDetails(loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLoanCheckListDetails/${loanid}`);
  }
  getUploadedDocuments(loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getUploadedDocuments/${loanid}`);
  }
  getUploadedBankStatements(loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getUploadedBankStatements/${loanid}`);
  }
  getLoanHeaderDetails(loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLoanHeaderDetails/${loanid}`);
  }

  getDisbursalDocuments(loanid: number, loanDisbursalId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getDisbursalDocuments/${loanid}/${loanDisbursalId}`);
  }
  getDisbursalCheckList(loanid: number, disbursalId: number, digit: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getDisbursalCheckList/${loanid}/${disbursalId}/${digit}`);
  }
  getReasonList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getReasonList`);
  }
  getLoanActionstatus(stausId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLoanActionstatus/${stausId}`);
  }
  getStatementList(loanid: number, date: object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/statementOfAccount/${loanid}`, date);
  }
  removeView(loanid: number, docId: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateRemoveDocument/${loanid}`, docId);
  }
  updateLoanActionStatus(loanid: number, data: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateLoanActionStatus/${loanid}`, data);
  }
  getLoanTelcoData(loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLoanTelcoData/${loanid}`);
  }
  updateReportTelcoRuleDetails(loanid: number, data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateTelcoRuleDetails/${loanid}`, data);
  }
  uploanDocuments(loanid: number, data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/uploanDocuments/${loanid}`, data);
  }
  getLoanStatusHistory(loanid: number, programTypeId: number, statusFlow: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLoanStatusHistory/${loanid}/${programTypeId}/${statusFlow}`);
  }
  getDocumentTypeList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getDocumentTypeList`);
  }
  getLoanEmiSchedule(loanRequestId: number, disbursalId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLoanEmiSchedule/${loanRequestId}/${disbursalId}`);
  }
  getBankRuleData(loanRequestId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getBankRuleData/${loanRequestId}`);
  }
  updateReportBankRuleDetails(loanRequestId: number, data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateBankRuleDetails/${loanRequestId}`, data);
  }
  getBankNameList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankList`);
  }
  getAccountTypeList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/accountTypeList`);
  }
  getNachFormDetails(loanId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getNachFormDetails/${loanId}`);
  }
  uploadFileDocument(obj: any): Observable<any> {
    return this.https.post<ApiResponse>(this.baseUr2 + 'report/uploadDocuments', obj);
  }
  getCollectionList(obj: any): Observable<any> {
    return this.https.post<ApiResponse>(this.baseUr2 + 'report/getCollectionList', obj);
  }

  // report end

  // gstreport start 
  getAccountTabDetails(loanId: number, gemId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getBankAccountDetails/${loanId}/${gemId}`);
  }
  // getGstTurnoverList(): Observable<any> {
  //   return this.https.get(`${this.baseUr2}report/gstTurnoverList`);
  // }
  editAccountTabDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/editBankDetails`, data);
  }
  gstnSalesSegmentList(startDate: String, endDate: String): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gstnSalesSegmentList/${startDate}/${endDate}`);
  }
  gstBankTurnoverList(startDate: String, endDate: String): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gstBankTurnoverList/${startDate}/${endDate}`);
  }
  salesPurchaseRatioList(startDate: String, endDate: String): Observable<any> {
    return this.https.get(`${this.baseUr2}report/salesPurchaseRatioList/${startDate}/${endDate}`);
  }
  // topCustomersList(): Observable<any> {
  //   return this.https.get(`${this.baseUr2}report/gstTopCustomerList`);
  // }
  gstDurationList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gstDurationList`);
  }
  getGstSummaryList(startDate: String, endDate: String): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gstSummaryList/${startDate}/${endDate}`);
  }
  getGstHSNList(startDate: String, endDate: String): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gstHSNList/${startDate}/${endDate}`);
  }
  getCustomerDetails(id: number, loanId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getCustomerDetails/${id}/${loanId}`);
  }
  getSaleData(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getSalesData/${orgId}`);
  }
  getNewGstSummaryList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gstTurnover/${orgId}`);
  }
  gstNewBankTurnoverList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankTurnoverDetails/${orgId}`);
  }
  salesPurchaseRatioDetails(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/salesPurchaseRatioDetails/${orgId}`);
  }
  salesDataPercentage(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/salesDataPercentage/${orgId}`);
  }
  bankSummaryDetails(retailerId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankSummaryData/${retailerId}`);
  }
  brandSummaryDetails(orgId: any, loanId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/brandSummary/${orgId}/${loanId}`);
  }
  businessSummaryDetails(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/businessSummaryData/${orgId}`);
  }
  topCustomers(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/topCustomers/${orgId}`);
  }
  sellerFinanceSubLimit(loanId: any, programTypeId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/sellerFinanceSubLimit/${loanId}/${programTypeId}`);
  }
  retailerFinanceSubLimit(loanId: any, programTypeId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/retailerFinanceSubLimit/${loanId}/${programTypeId}`);
  }
  gemFinanceSubLimit(loanId: any, gemId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gemFinanceSubLimit/${loanId}/${gemId}`);
  }

  gstTurnover(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gstTurnover/${orgId}`);
  }
  gstTurnoverQuarterwise(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/gstTurnoverQuarterwise/${orgId}`);
  }
  generateOtpleads(mobileNo: any): Observable<any> {
    return this.https.post(`${this.baseUr3}otp/generate?m=${mobileNo}`, '');
  }
  bankCreditQuarter(retailerId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/bankCreditQuarter/${retailerId}`);
  }
  // top5BuyerPurchaser(orgId: any): Observable<any> {
  //   return this.https.get(`${this.baseUr2}report/top5BuyerPurchaser/${orgId}`);
  // }
  // serviceGoodsRatio(orgId: any): Observable<any> {
  //   return this.https.get(`${this.baseUr2}report/serviceGoodsRatio/${orgId}`);
  // }
  // pNlCalculation(orgId: any): Observable<any> {
  //   return this.https.get(`${this.baseUr2}report/pNlCalculation/${orgId}`);
  // }
  uploadDisbursalFile(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/uploadDisbursalFile`, data);
  }
  insertLeadDetails(data: any, parentOrgId: any, userId: any, type: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/insertNotInterestedCases/${parentOrgId}/${userId}/${type}`, data);
  }
  getUploadedBankDetails(loanId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getUploadedBankDetails/${loanId}`);
  }
  getSellerBankDetails(loanId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getSellerBankDetails/${loanId}`);
  }
  getSellerFormDetails(loanId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getSellerFormDetails/${loanId}`);
  }
  saveFormDetails(loanId: any, obj: any): Observable<any> {
    return this.https.post<ApiResponse>(`${this.baseUr2}report/saveSellerFormDetails/${loanId}`, obj);
  }
  getSellerApplicantDetails(loanId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getSellerApplicantDetails/${loanId}`);
  }
  getCommonList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getCommonList`);
  }
  // gstreport end
  // mobileapp api start
  login(loginPayload): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'login/validateUser', loginPayload);
  }
  validateUser(obj: any): Observable<any> {
    return this.https.post(`${this.baseUr2}login/validateUser`, obj);
  }
  callImageUploadS3(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'ocr/imageUploadS3', obj);
  }
  getOCRData(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'ocr/getOCRData', obj);
  }
  saveLREditedData(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'ocr/saveLREditedData', obj);
  }
  gstnList(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'gst/gstnList', obj);
  }
  getCkycData(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'kyc/getCkycData', obj);
  }
  kycUpdate(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'kyc/kycUpdate', obj);
  }
  getKYCData(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'report/getKYCData', obj);
  }
  getParsedBankTransactions(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'banking/processBankStatements', obj);
  }
  getProcessOverAllBankStatements(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'banking/processOverAllBankStatements', obj);
  }
  ceateLoanApi(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'banking/createLoanApplication', obj);
  }
  getRuleData(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'report/getRuleList', obj);
  }
  updateTelcoRuleDetails(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'otp/updateTelcoRuleDetails', obj);
  }
  updateBankRuleDetails(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'banking/updateBankRuleDetails', obj);
  }
  saveShopVerification(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'disbursal/saveShopVerification', obj);
  }

  uploadDocuments(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'seller/uploadUtilDocs', obj);
  }

  updateGstnRule(obj: any): Observable<any> {
    return this.https.post<ApiResponse>(this.baseUrl + 'gst/processGstnRule', obj);
  }
  updatebureauCall(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'seller/bureauCall', obj);
  }
  updatebureauRule(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'bureau/bureauRule', obj);
  }
  createCrn(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'seller/createCrn', obj);
  }
  createLoan(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'seller/createLoan', obj);
  }
  UploadToFilenet(obj: any): Observable<any> {
    return this.https.post<any>(this.baseUrl + 'agreement/docBulkUpload', obj);
  }
  generateLoanForm(obj: any): Observable<any> {
    return this.https.post<any>(this.baseUrl + 'agreement/generateLoanAgreementPDF', obj);
  }

  generateLoanAgreement(obj: any): Observable<any> {
    return this.https.post<any>(this.baseUrl + 'agreement/generateLoanAgreementPDF', obj);
  }
  nachRegistration(obj: any): Observable<any> {
    return this.https.post<any>(this.baseUrl + 'nach/nachRegistration', obj);
  }
  checkLoanStatus(obj: any): Observable<any> {
    return this.https.post<any>(this.baseUrl + 'seller/checkLoanStatus', obj);
  }
  checkNachStatus(obj: any): Observable<any> {
    return this.https.post<any>(this.baseUrl + 'nach/checkNachStatus', obj);
  }
  downloadForm(loanid: number, disbursalId: number, pdfFlag: number): Observable<any> {
    return this.https.get(`${this.baseUrl}report/loanFormDetails/${loanid}/${disbursalId}/${pdfFlag}`);
  }


  // mobileapp api end


  createUploadExcel(formData: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/uploadSupplierExcelData`, formData);
  }

  getEmailList(emailData: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/getEmailData`, emailData);
  }

  uploadEmailData(formData: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/uploadEmailData`, formData);
  }

  insertInvoiceData(invoiceList: Object, sourcingPartnerId: any, userId: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/doInsertInvoiceData/${sourcingPartnerId}/${userId}`, invoiceList);
  }

  uploadInvoiceData(obj: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/uploadInvoiceData`, obj);
  }
  uploadDisbursalInvoiceData(obj: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/saveorderinvoice`, obj);
  }

  disburseInvoiceotp(obj: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/getorderinvoicedisbursalotp`, obj);
  }

  verifyInvoiceotp(obj: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/orderinvotpverify`, obj);
  }


  getParsedBankStatementExcel(obj: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/getParsedBankStatementExcel`, obj);
  }
  updateBranddetails(obj: any): Observable<any> {
    return this.https.post(`${this.baseUr2}brandReport/updateBrandMonthlyTurnOver`, obj);
  }
  addSalesPerson(obj: any): Observable<any> {
    return this.https.post(`${this.baseUrl}seller/salesPersonDetailsUpdate`, obj);
  }
  processBankStatementExcel(fiarray: Object, userId: any, loanId: any): Observable<any> {
    return this.https.post(`${this.baseUrl}banking/processBankStatementExcel/${userId}/${loanId}`, fiarray);
  }
  sendTemplate(obj: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/addTemplatesInDb`, obj);
  }
  getFinaggUserList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/finaggUserList`);
  }



  //Brand / Distributor Login Services Start
 
  getBrandDashboardMTDSummary(orgId: any, lenderId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getBrandDashboardMTDSummary/${orgId}/${lenderId}`);
  }
  getBrandDashboardRetailerSummary(orgId: any, lenderId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getBrandDashboardRetailerSummary/${orgId}/${lenderId}`);
  }
  getbrandList(orgId: any, obj: Object): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}brandReport/getBrandDashboardDetails/${orgId}`, obj);
  }
  getChildRetailerList(orgId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getChildRetailerList/${orgId}`);
  }
  getParentRetailerList(programId: any, brandId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getParentRetailerList/${programId}/${brandId}`);
  }
  getBrandNameList(programId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getBrandList/${programId}`);
  }
  getRetailerList(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getRetailerList`);
  }
  getTotalInvoiceList(orgId: any, flag: any, startDate: any, endDate: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getTotalInvoiceList/${orgId}/${flag}/${startDate}/${endDate}`);
  }
  getTotalPendingInvoiceList(orgId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getTotalPendingInvoiceList/${orgId}`);
  }
  getTotalPaidInvoiceList(orgId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getTotalPaidInvoiceList/${orgId}`);
  }
  getRepaymentInvoiceList(orgId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getRepaymentInvoiceList/${orgId}`);
  }
  getRetailerDetails(orgId: any, lenderId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getRetailerDetails/${orgId}/${lenderId}`);
  }
  getStatusReport(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getStatusReport`);
  }
  getDashboardBrandList(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getDashboardBrandList`);
  }
  getBrandOrgId(orgId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getBrandOrgId/${orgId}`);
  }
  viewHulCustomerDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/getHULConsent`, data)
  }

  //Brand / Distributor Login Services End


  generateSupplierExcel(loanId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/generateSupplierExcel/${loanId}`);
  }
  generateInvoiceExcel(gemId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/generateInvoiceExcel/${gemId}`);
  }
  getBusinessTypeList(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getBusinessTypeList`);
  }
  getBranchList(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getBranchList`);
  }
  getCityList(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getCityList`);
  }
  getAnchorsFundingList(loanId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getAnchorsFundingList/${loanId}`);
  }
  getGstnProcessList(orgId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getGstnProcessList/${orgId}`);
  }

  saveDisbursalLanNo(gemId: any, data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/saveDisbursalLanNo/${gemId}`, data);
  }
  saveFinalLimit(custId: any, data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/saveFinalLimit/${custId}`, data);
  }

  updateChecklistEntry(checkListData: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateChecklistEntry`, checkListData);

  }
  verifytheChecklist(loanId: any): Observable<any> {
    return this.https.post(`${this.baseUrl}/api/v1/checkList/updateCheckListData/${loanId}`, loanId);
  }
  getRepaymentDetails(orgId: any, obj: Object): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/getRepaymentDetails`, obj);
  }
  getSOADetails(orgId: any, obj: Object): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/getSOADetails`, obj);
  }
  saveDisbursalUtrNo(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/saveDisbursalUtrNo`, data);
  }
  updateFundingLimit(loanid: any, data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/updateFundingLimit/${loanid}`, data);
  }
  gemLoanDisbursalInvoiceDetails(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/gemLoanDisbursalInvoiceDetails`);
  }

  downloadCam(loanId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUrl}agreement/camSummaryPDF/${loanId}`);
  }
  getPhysicalNACHDetail(obj: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}nach/getnachdetail/`, obj);

  }
  compressImages(obj: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}nach/compressImages/`, obj);

  }
  getNACHList(obj: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}nach/nachlist/`, obj);

  }

  generateAnchorProfile(loanid: any, userId: any, type: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}seller/anchorGeneration/${loanid}/${userId}/${type}`, '');
  }

  removeProcessedBankStatement(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}banking/removeProcessedBankStatement`, data);

  }

  resetProcessedBankStatement(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}banking/resetCompleteBankProcess`, data);

  }

  getNachTransaction(nachid: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}nach/nachTransactionHistory`, nachid);
  }
  rejectLoanDisbursal(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}seller/rejectLoanDisbursalRequest`, data);
  }

  getLoanDisbursalStatusHistory(loanDisbursalId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLoanDisbursalStatusHistory/${loanDisbursalId}`);
  }
  getDisbursalInvoiceList(loanDisbursalId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getDisbursalInvoiceList/${loanDisbursalId}`);
  }
  getLeadsList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLeadsList`);
  }
  getLeadsDocumentList(leadId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLeadsDocumentList/${leadId}`);
  }
  getLeadsPromotorsList(leadId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getLeadsPromotorsList/${leadId}`);
  }

  insertSellerData(dataList: Object, userId: any, programId): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/insertsellerData/${userId}/${programId}`, dataList);
  }


  getStatusList(id: any): Observable<any> {
    return this.https.get(`${this.baseUr2}program/getStatuslist/${id}`);
  }


  getsubStatusList(id: any): Observable<any> {
    return this.https.get(`${this.baseUr2}program/getsubStatuslist/${id}`);
  }


  updateLoanStaus(dataList: Object): Observable<any> {
    return this.https.post(`${this.baseUr2}program/updateloanstatus/`, dataList);
  }


  brandList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/brandList`);
  }
  programList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getProgramList/${orgId}`);
  }
  retailerList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getRetailerList/${orgId}`);
  }
  getEncodeData(url: object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/getEncodeData`, url);
  }
  getBuyersList(orgId: any, type: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getBuyersList/${orgId}/${type}`);
  }
  getResultValueList(loanId: any, type: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getResultValueList/${loanId}/${type}`);
  }
  saveResultValue(formData: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/saveResultValue`, formData);
  }
  getCompanyTypeList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getCompanyTypeList`);
  }
  getSubStatusAction(substatusId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getSubStatusAction/${substatusId}`);
  }
  uploadDistanceAnalysis(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/uploadDistanceAnalysis`, data);
  }
  saveBankDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/saveBankDetails`, data);
  }
  getFinalLimitRange(loanId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getFinalLimitRange/${loanId}`);
  }
  getSanctionCondition(loanId: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getSanctionCondition/${loanId}`);
  }
  saveSanctionCondition(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/saveSanctionCondition`, data);
  }
  downloadFile(filePath: any) {
    // const request_param=new HttpParams().set('filePath',filePath);
    return this.https.get(`${this.baseUr2}report/getEncodeData`, { responseType: 'arraybuffer' })
  }


  getRepaymentReport(orgId: any, obj: Object): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/getRepaymentReport`, obj);
  }


  getloanRequestSOADetails(obj: Object): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/getloanRequestSOADetails`, obj);
  }



  // downloadFile(filename){
  //   const request_param=new HttpParams().set('filename',filename);
  //   return this.https.get(`${this.baseUr2}getEncodeData`,{ params:request_param , responseType:'arraybuffer'})
  // }

  muteCondition(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/muteCondition`, data);
  }

  saveCreateLoanInfo(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/saveCreateLoanInfo`, data);
  }
  updateAcceptStatus(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateAcceptStatus`, data);
  }
  updateRejectStatus(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateRejectStatus`, data);
  }
  updateStatus(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateStatus`, data);
  }


  consumerBureau(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}bureau/consumerBureau`, data);
  }
  commercialBureau(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}bureau/commercialBureau`, data);
  }
  deDupeCall(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}ugro/deDupeCall`, data);
  }
  fraudCheckApi(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}ugro/fraudCheckCall`, data);
  }
  uploadBankstatements(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'banking/processBankStatementsonperfios', obj);
  }
  financialRegister(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'ugro/financialDocumentreview', obj);
  }
  financialCheck(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'ugro/financialDocumentStatus', obj);
  }
  financialRule(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'ugro/processFinancialCheckRule', obj);
  }
  bureauRule(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'bureau/uGroBureauRule', obj);
  }
  getSOAReport(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'report/getSOAReport', obj);
  }
  saveSanctionDate(obj: Object): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}report/saveSanctionDate`, obj);
  }
  saveAnchorCustomerId(obj: Object): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}operation/saveAnchorCustomerId`, obj);
  }
  fetchAnchorCustomerId(obj: Object): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}operation/fetchAnchorCustomerId`, obj)
  }
  getSoaReportByLoanId(loanId: number): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getSoaReportByLoanId/${loanId}`);
  }
  getAddressByPincode(pincode: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getAddressByPincode/${pincode}`);
  }
  getCustomerList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getCustomerList`);
  }
  getGSTNList(orgId: number, loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getGSTNData/${orgId}/${loanid}`);
  }
  saveGSTNData(gstnData: object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/saveGSTNData`, gstnData);
  }
  updateGstnData(data: object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/doGstnLimitCorrection`, data)
  }
  reEunBrandRule(data: object): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/karzaProfileSubmit`, data);
  }

  pendingRepayments(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/pendingRepaymentList`);
  }
  listAll(data: object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/getRepaymentByOrgId`, data);
  }
  detailedTranch(id: number): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getRepaymentprocessList/${id}`);
  }

  getWhatsappMessages(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getWhatsappMessages`);
  }
  sellerEMailsNotSend(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/sellerEMailsNotSend`);
  }
  sellerMailSendStatus(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/sellerMailSendStatus`);
  }
  getStateList(): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getStateList`);
  }
  getCityListBystatetid(stateName: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getCityListBystatetid/${stateName}`);
  }

  processrepayment(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}report/processRepayment/`, data);
  }

  getGSTDetails(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getGstnDetailsList/${orgId}`);
  }
  getGstnR1GstList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getGstnR1GstList/${orgId}`);
  }

  getGstn3bList(orgId: any, gstnNo: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getGstn3BList/${orgId}/${gstnNo}`);
  }
  getGstnr1List(orgId: any, gstnNo: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getGstnR1List/${orgId}/${gstnNo}`);
  }

  saveGstnR1List(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/saveGSTNR1Data`, data);
  }

  saveGstn3BList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/saveGSTN3BData`, data);
  }

  ugroDisbursalList(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}seller/getDisbursallist`, data);
  }

  updateDisbursalstatus(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}seller/disbursalupdate`, data);
  }

  ugroNachList(data: object): Observable<any> {
    return this.https.post(`${this.baseUrl}nach/lenderNachList`, data);
  }
  updateUgroNachStatus(data: object): Observable<any> {
    return this.https.post(`${this.baseUrl}nach/nachupdate`, data);
  }
  uploadPDC(data: object): Observable<any> {
    return this.https.post(`${this.baseUrl}nach/uploadPDC`, data);
  }
  generateEnachLink(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}nach/generateENachLinks`, data);
  }
  authenticateRequestOTP(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}gst/authenticateRequestOTP`, data);
  }
  getAuthToken(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}gst/getAuthToken`, data);
  }
  gstCredentialDetails(): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/gstCredentialDetails`);
  }
  updateGstAuthentication(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/updateGstAuthentication`, data);
  }
  getBrandDataList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getBrandData/${orgId}`);
  }

  saveAnchorDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/saveAnchorDetails`, data);
  }

  saveBankDetailsop(userId: any, loanId: any, data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/saveBankDetails/${loanId}/${userId}`, data);
  }
  updateDip(data: object): Observable<any> {
    return this.https.post(`${this.baseUr2}report/doGstnDipCorrection`, data);
  }
  UpdateNachBankDetails(data: object): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/UpdateNachBankDetails`, data);
  }
  mailNotification(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}schedule/MailAfterEachDisbursal/${orgId}`);
  }

  getLoanlist(userId: any, lenderId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getCreateLoanList/${userId}/${lenderId}`);
  }
  uploadFal(formData: Object, program: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/uploadFALMigrationExcelData/${program}`, formData);
  }

  insertFal(dataList: any, sp: any, program: any, dr: any, userId: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/insertFALMigrationExcelData/${userId}/${sp}/${program}/${dr}`, dataList);
  }

  getFinaggAsLenderProgramList(): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getFinaggAsLenderProgramList`);
  }
  getSoaReport(loanId, fromDate, toDate, lan, pan): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}report/getSoaReport/${loanId}/${fromDate}/${toDate}/${lan}/${pan}`);
  }
  // waterfall Report
  getWaterfallReport(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}seller/getWaterfallReportlist`, data);
  }

  // Escrow report
  escrowReport(): Observable<any> {
    return this.https.get(`${this.baseUrl}escrow/getescrowbenelist`);
  }

  updateEscrowStatus(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}escrow/updateescrowbenelist`, data);
  }

  merchantAnalysing(pan, gst, pin, ll, ccl, r, name, userId, dob): Observable<any> {
    let params = new HttpParams().set('pan', pan).set('gst', gst).set('pincode', pin).set('ll', ll).set('ccl', ccl).set('r', r).set('name', name).set('userId', userId).set('dob', dob).set('nonsoleFlag', '');
    return this.https.get(`${this.baseUr2}sourcing/processMerchantAnalysis`, { params });
  }

  getBrandDistributerList(): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getBrandDistributerList`);
  }
  sanctionNotification(loanId: any): Observable<any> {
    return this.https.get(`${this.baseUrl}schedule/sanctionNotification/${loanId}`);
  }
  updateVanno(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/updateVaNumber`, data);
  }
  descriptionPending(id: number): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/descriptionpending/${id}`);
  }
  createNewLoan(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/createNewLoan`, data);
  }
  getProgramListUsingTypeId(id: any, orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getProgramListUsingTypeId/${id}/${orgId}`);
  }
  getProgramListUsingLenderId(lenderId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getProgramListUsingLenderId/${lenderId}`);
  }
  // getCompanyRatingList() : Observable<any> {
  //   return this.https.get(`${this.baseUr2}operation/getCompanyRatingList`);
  // }
  // Cancellation of Invoice 
  invoiceList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/invoiceCancellationList`, data);
  }

  deleteInvoice(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/invoiceCancellationUpdate`, data);
  }
  // /sourcing/deletedInvoiceList
  cashDiscount(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUrl}schedule/onCDprogramAndSavinghtml/${orgId}`)
  }

  cdSaving(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUrl}schedule/onCDprogramAndNoSavinghtml/${orgId}`)
  }

  duein3(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUrl}schedule/before3DaysDueAlertCDhtml/${orgId}`)
  }

  overDue(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUrl}schedule/overDueMailAlertCDhtml/${orgId}`)
  }
  getAnchorsOverallData(loanId: any, type: any): Observable<any> {
    return this.https.post(`${this.baseUrl}seller/getAnchorsOverallData/${loanId}/${type}`, '')
  }
  updateAnchorDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}seller/updateAnchorDetails`, data)
  }

  checkStatus(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}banking/bankstatementprocessstatus`, data);
  }
  getR1DataList(orgId: any, type: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getR1DataList/${orgId}/${type}`);
  }
  getR2DataList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getR2DataList/${orgId}`);
  }
  skipBankrule(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}banking/skipBankrule`, data);
  }
  //One Step Disbursement 
  getcustpendinginvdtllist(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/getcustpendinginvdtllist`, data);
  }

  disbursalinitiating(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/disbursalinitiating`, data);
  }


  verifylink(data: any): Observable<any> {
    return this.https.get(`${this.baseUrl}disbursal/verifylink/${data}`);
  }

  getdisbursalotp(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/getdisbursalotp`, data);
  }

  getdisbursalotpverification(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/getdisbursalotpverification`, data);
  }

  cancelDisbursalRequest(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/cancelDisbursalRequest`, data);
  }

  disbursalrequestlist(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/disbursalrequestlist`, data);
  }

  getCustomerListUsingProgramId(data: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getCustomerListUsingProgramId/${data}`)
  }

  resentOtp(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/resentotplink`, data);
  }

  //auto disbursement 
  autoDisbursementNotificationhtml(token: any): Observable<any> {
    return this.https.get(`${this.baseUr2}sourcing/autoDisbursementNotificationhtml/${token}`);
  }
  autoDisbursementCustomerList(): Observable<any> {
    return this.https.get(`${this.baseUr2}sourcing/autoDisbursementCustomerList`)
  }
  initiateAutoDisbursal(userId: any, id: any): Observable<any> {
    return this.https.get(`${this.baseUrl}disbursal/initiateAutoDisbursal/${id}/${userId}`)
  }
  stopAutoDisbursal(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}disbursal/stopAutoDisbursal`, data);
  }

  //disbursement 9 am notification
  getcustinvlstdisbursal(data: any): Observable<any> {
    return this.https.get(`${this.baseUrl}disbursal/getcustinvlstdisbursal/${data}`)
  }
  getTemplateList(id: any): Observable<any> {
    return this.https.get(`${this.baseUr2}sourcing/getTemplateList/${id}`)
  }
  invoiceUpdate(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/invoiceUpdate`, data);
  }

  //bulkupload
  uploadNotInterestedCases(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/uploadNotInterestedCases`, data);
  }
  insertNotInterestedCases(data: any, parentOrgId: any, userId: any, type: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/insertNotInterestedCases/${parentOrgId}/${userId}/${type}`, data);
  }

  //audit trail
  auditStatusDetails(data: any): Observable<any> {
    return this.https.get(`${this.baseUrl}report/auditStatusDetails/${data}`);
  }
  //late fee
  insertLateFeeDetails(id: number, value: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/insertLateFeeDetails/${id}`, value);
  }
  updateLateFeeDetails(value: any, programId: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/updateLateFeeDetails/${programId}`, value);
  }
  getLateFeeDetails(id: any): Observable<any> {
    return this.https.get<ApiResponse>(`${this.baseUr2}program/getLateFeeDetails/${id}`);
  }
  //smi api start
  insertSmiDetails(id: number, value: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/insertSmiDetails/${id}`, value);
  }
  saveCustomConfiguration(id: number, lenderId: any, value: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/saveCustomConfiguration/${id}/${lenderId}`, value);
  }
  updateSMIDetails(value: any, programId: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/updateSMIDetails/${programId}`, value);
  }
  getSMIDetails(id: any): Observable<any> {
    return this.https.get<ApiResponse>(`${this.baseUr2}program/getSMIDetails/${id}`);
  }
  getCustomConfiguration(id: any, id2: any): Observable<any> {
    return this.https.get<ApiResponse>(`${this.baseUr2}program/getCustomConfiguration/${id}/${id2}`);
  }
  getSmiProcessList(): Observable<any> {
    return this.https.get<ApiResponse>(`${this.baseUr2}program/getSmiProcessList`);
  }
  getSmiTypeList(): Observable<any> {
    return this.https.get<ApiResponse>(`${this.baseUr2}program/getSmiTypeList`);
  }
  //smi api end

  //bene add checker start
  getorgbankdetails(approvalstatus: any, orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getorgbankdetails/${approvalstatus}/${orgId}`)
  }
  bankdetailsapproval(id: any, op: any, userId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/bankdetailsapproval/${id}/${op}/${userId}`)
  }
  gstOrganisationList(): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/gstOrganisationList`);
  }
  //bene add checker end

  //late fee start
  addnewchargestype(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}addoncharges/addnewchargestype`, data);
  }
  addnewdiscounttype(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}addoncharges/addnewdiscounttype`, data);
  }
  getloandisbursalcharges(data: any): Observable<any> {
    return this.https.get(`${this.baseUrl}addoncharges/getloandisbursalcharges/${data}`);
  }
  getdiscountchargeslist(): Observable<any> {
    return this.https.get(`${this.baseUrl}addoncharges/getdiscountchargeslist`);
  }
  getchargesmasterlist(): Observable<any> {
    return this.https.get(`${this.baseUrl}addoncharges/getchargesmasterlist`);
  }
  getcustomerlist(): Observable<any> {
    return this.https.get(`${this.baseUrl}addoncharges/getcustomerlist`);
  }
  getcustomerloanlist(data: any): Observable<any> {
    return this.https.get(`${this.baseUrl}addoncharges/getcustomerloanlist/${data}`);
  }
  getcustomerdisbursallist(data: any): Observable<any> {
    return this.https.get(`${this.baseUrl}addoncharges/getcustomerdisbursallist/${data}`);
  }
  adddisbursalothercharges(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}addoncharges/adddisbursalothercharges`, data);
  }
  getdisbursalchargesfordiscount(data: any): Observable<any> {
    return this.https.get(`${this.baseUrl}addoncharges/getdisbursalchargesfordiscount/${data}`);
  }
  adddisbursaldiscount(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}addoncharges/adddisbursaldiscount`, data);
  }
  //late fee end
  SaveFinancialSummay(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}ugro/SaveFinancialSummay`, data);
  }
  getUserName(userId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}user/getUserName/${userId}`);
  }
  updatePassword(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}user/updatePassword`, data);
  }
  getAnchorAndDistributerList(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}user/getAnchorAndDistributerList`);
  }
  getUserLenderList(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}user/getLenderList`);
  }
  getroleList(): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}user/getroleList`);
  }
  insertUserRole(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}user/insertUserRole`, data);
  }
  createNewUser(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}user/createNewUser`, data);
  }
  deleteUser(data: any, userId: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}user/deleteUser/${userId}`, data);
  }
  editUser(data: any, userId: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}user/editUser/${userId}`, data);
  }
  getApplicationDetails(loanId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}operation/getApplicationDetails/${loanId}`);
  }
  saveApplicationDetails(loanId: any, data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}operation/saveApplicationDetails/${loanId}`, data);
  }
  getGst2AList(orgId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}operation/getGst2AList/${orgId}`);
  }
  getGst2AExcelList(orgId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}operation/getGst2AExcelList/${orgId}`);
  }
  activeProgram(programId: any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}program/activeProgram/${programId}`);
  }
  cancelLoanRequest(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUr2}operation/cancelLoanRequest`, data);
  }
  cancelLoanDisbursalRequest(data: any, token: any): Observable<any> {
    window.localStorage.setItem('loaderName', 'Cancelling Disbuserment');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.https.post(`${this.baseUrl}retailer/cancelLoanDisbursalRequest`, data, { 'headers': headers });
  }
  getBenelistuseingLoanrequestid(loanId: any): Observable<any> {
    return this.https.get(`${this.baseUrl}disbursal/getbenedetails/${loanId}`)
  }
  getOverDueList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getOverDueReport/${orgId}`)
  }
  updateGst2AList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/updateGst2AList`, data)
  }
  getDealerAnchorPan(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getDealerAnchorPan/${orgId}`)
  }
  getAnchor2AData(panNo: any, orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getAnchor2AData/${panNo}/${orgId}`)
  }
  get2ADataSummary(month: any, orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/get2ADataSummary/${month}/${orgId}`)
  }
  getSchemaList(programId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getSchemaList/${programId}`)
  }
  getSellerProgramList(): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getSellerProgramList`)
  }
  getTradeName(pan: any, orgId: any, userId: any): Observable<any> {
    return this.https.post(`${this.baseUrl}seller/anchor/${pan}/${orgId}/${userId}`, '')
  }
  getLenderMISDetails(lenderId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getLenderMISDetails/${lenderId}`)
  }

  //link to customer
  gstnVerifyLink(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}schedule/gstnVerifyLink`, data);
  }
  runFinancialRule(obj: any): Observable<ApiResponse> {
    return this.https.post<ApiResponse>(this.baseUrl + 'ugro/processFinancialCheckRule', obj);
  }

  getCustomerListUsingOrgId(data: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getCustomerListUsingOrgId/${data}`)
  }
  newtofinaggDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/newToFinagg`, data)
  }
  totaloffinaggDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/getTotalFinaggDetails`, data)
  }
  livenotdisbursementDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/getLiveNotDisbursementList`, data)
  }
  undersanctionlistDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/getUnderSanctionList`, data)
  }
  rejectedlistDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/getRejectedList`, data)
  }
  sanctionnotlivelistDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/getSanctionNotLiveList`, data)
  }

  //view document with category
  getDocCatagoryList(): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getDocCatagoryList`)
  }
  getDocumentList(categoryId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getDocumentList/${categoryId}`)
  }

  updateActivityId(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateActivityId`, data);
  }
  gettotalFinaggretailerdetails(): Observable<any> {
    return this.https.get(`${this.baseUr2}dashboard/totalToFinaggAllretailerdetails`);
  }
  getFinaggcustomerdetails(): Observable<any> {
    return this.https.get(`${this.baseUr2}dashboard/newToFinaggAllcustomerdetails`);
  }
  newDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/newToFinaggcustomerdetails`, data);
  }
  getRetailerInvoiceDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/getDisbursementinvoiceList`, data);
  }
  //recon bank statement
  getescrowaccount(): Observable<any> {
    return this.https.get(`${this.baseUrl}escrowclient/getescrowaccount`)
  }
  getescrowaccountstatement(obj: any): Observable<any> {
    return this.https.post(`${this.baseUrl}escrowclient/getescrowaccountstatement`, obj);
  }

  checkBrandMobileNumber(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/checkBrandMobileNumber`, data);
  }
  getUploadedDocumentswithcategory(loanid: number): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getUploadedDocuments/${loanid}`);
  }
  updateBrandMobileNumber(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}report/updateBrandMobileNumber`, data);
  }
  getdisbursementDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/getTotalDisbursementList`, data);
  }
  getdisbursementCustomerDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}dashboard/getRetailerDisbursementList`, data);
  }

  //customerList
  getCrnViewList(obj: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/getCrnViewList`, obj);
  }
  getLanViewList(obj: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/getLanViewList`, obj);
  }
  getorgaccount(): Observable<any> {
    return this.https.get(`${this.baseUrl}report/getorgvaaccount`)
  }
  getunidentifiedpaymentlist(): Observable<any> {
    return this.https.get(`${this.baseUrl}report/unidentifiedtransactionlist`)
  }
  mapOrganization(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}report/updateorgidunidentifiedtransactionlist`, data);
  }
  getAllProgramList(Pid: any): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getProgramList/${Pid}`);
  }
  getAllBrandList(): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getbrandList`);
  }

  //menu
  getMenuList(): Observable<any> {
    return this.https.get(`${this.baseUr2}LOSReport/getMenuList`);
  }
  saveMenuList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/saveMenuList`, data);
  }
  getSubMenuList(): Observable<any> {
    return this.https.get(`${this.baseUr2}LOSReport/getSubMenuList`);
  }
  saveSubMenuList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/saveSubMenuList`, data);
  }
  getRoleList(): Observable<any> {
    return this.https.get(`${this.baseUr2}LOSReport/getRoleList`);
  }
  saveRoleList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/saveRoleList`, data);
  }
  deleteMenuList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/deleteMenuList`, data);
  }
  deleteSubMenuList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/deleteSubMenuList`, data);
  }
  deleteRoleList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/deleteRoleList`, data);
  }
  roleMenuMappingList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/roleMenuMappingList`, data);
  }
  saveRoleMenuMapping(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}LOSReport/saveRoleMenuMapping`, data);
  }
  getDeletedInvoiceList(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}sourcing/deletedInvoiceList`, data);
  }
  getQRupiList(orgId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}LOSReport/getQRupiList/${orgId}`);
  }
  getLoanStatusList(): Observable<any> {
    return this.https.get(`${this.baseUr2}LOSReport/getLoanStatusList`)
  }
  insertBorrowerTenureDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/insertBorrowerTenureDetails`, data);
  }
  updateBorrowerTenureDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/updateBorrowerTenureDetails`, data);
  }
  selectBorrowerTenureDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/selectBorrowerTenureDetails`, data);
  }
  selectonlyTenureDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/selectonlyTenureDetails`, data);
  }
  selectonlyROIDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/selectonlyROIDetails`, data);
  }
  getOverallStatusList(): Observable<any> {
    return this.https.get(`${this.baseUr2}LOSReport/getStatusSubstatusList`)
  }
  getFinalLimitRangelimit(loanId: number): Observable<any> {
    return this.https.get(`${this.baseUrl}limit/getFinalLimitRange/${loanId}`);
  }
  saveFinalLimits(data: any): Observable<any> {
    return this.https.post<any>(`${this.baseUrl}limit/saveFinalLimit`, data);
  }
  // limit/saveFinalLimit
  getPendingApiList(loanid: any): Observable<any> {
    return this.https.get(`${this.baseUr2}LOSReport/getPendingApiList/${loanid}`);
  }
  pennyDropApiCall(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}hul/pennyDropApiCall`, data);
  }
  processHUlpan(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}hul/processHulPan`, data);
  }
  processPreApprovalLimit(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}hul/processPreApprovalLimit`, data)
  }
  merchantAnalysisRule(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}hul/merchantAnalysisRule`, data)
  }
  customerCreationCall(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}jana/customerCreationCall`, data)
  }
  amlCall(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}jana/amlCall`, data)
  }
  deDupeApiCall(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}jana/deDupeCall`, data)
  }
  aadhaarVaultFetch(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}jana/aadhaarVaultFetch`, data)
  }
  deleteROIentry(ptId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}program/removeROIEntry/${ptId}`);
  }
  deleteTenureentry(ptId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}program/removeTenureEntry/${ptId}`);
  }
  insertBorrowerROIDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/insertBorrowerROIDetails`, data);
  }
  saveProgramDetails(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}hul/saveProgramDetails`, data);
  }
  getHulProgramList(loanId: any, flag: any): Observable<any> {
    return this.https.get(`${this.baseUrl}hul/getProgramList/${loanId}/${flag}`);
  }
  updateActionStatus(data: object): Observable<any> {
    return this.https.post(`${this.baseUrl}hul/updateNonStopPWAFlow`, data);
  }
  processHulOnboarding(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}retailer/processHulOnboarding`, data);
  }
  updateRoiTenureFlag(data: object): Observable<any> {
    return this.https.post(`${this.baseUr2}program/updateRoiTenureFlag`, data);
  }
  selectRoiTenureFlag(data: object): Observable<any> {
    return this.https.post(`${this.baseUr2}program/selectRoiTenureFlag`, data);
  }
  getBankDetails(loanId: any): Observable<any> {
    return this.https.get(`${this.baseUrl}hul/getBankDetailsList/${loanId}`);
  }
  getAccountType(): Observable<any> {
    return this.https.get(`${this.baseUrl}banking/getBankAccountTypes`)
  }
  getbankList(): Observable<any> {
    return this.https.get(`${this.baseUrl}banking/getBanks`)
  }
  consiladatelist(): Observable<any> {
    return this.https.get(`${this.baseUrl}escrowclient/getconsolidateList`)
  }

  getconsolidateViewList(lpid: any): Observable<any> {
    return this.https.get(`${this.baseUrl}escrowclient/getconsolidateViewList/${lpid}`)
  }

  getconsolidateapproval(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}escrowclient/getconsolidateapproval`, data)
  }
  getoveragereport(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}report/getAgingReport`, data)
  }
  getRepaymentListqr(data: any): Observable<any> {

    return this.https.post(`${this.baseUrl}retailer/getRepaymentList`, data);
  }
  newuserNotification(email: any, name: any, user: any, pass: any): Observable<any> {
    return this.https.get(`${this.baseUr2}report/getUserDetailsPasscode/${email}/${name}/${user}/${pass}`)
  }
  // getorgansation list
  getOrganisationlist(): Observable<any> {
    return this.https.get(`${this.baseUr2}operation/getOrganisationList`)
  }
  bannerList(): Observable<any> {
    return this.https.get(`${this.baseUr2}program/bannerList`)
  }

  getProgramBanner(programId: any): Observable<any> {
    return this.https.get(`${this.baseUr2}program/getProgramBannerMapper/${programId}`)
  }
  saveBannerEvent(data: any, programId: any): Observable<any> {
    return this.https.post(`${this.baseUr2}program/saveBannerEvent/${programId}`, data);
  }

  getS3FilePath(obj: any): Observable<any> {
    window.localStorage.setItem('loaderName', 'Uploading file');
    return this.https.post(`${this.baseUrl}seller/getS3FilePath`, obj);
  }
  getBeneIdList(loanId: any, orgIdone: any): Observable<any> {
    return this.https.get(`${this.baseUrl}report/getBeneIdList/${loanId}/${orgIdone}`)
  }
  breApiCall(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}abfl/engine/config`, data)
  }
  checkSellerApprover(data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/checkSellerApprover`, data)
  }
  getInvoiceListSummary(orgId: any, lenderId:any,brandId:any,distId:any): Observable<any> {
    return this.https.get<any>(`${this.baseUr2}brandReport/getBrandDashboardData/${orgId}/${lenderId}/${brandId}/${distId}`);
  }

  getInvoiceDashboardData(orgId:any,lenderId:any,brandId:any,distId): Observable<any> {
    return this.https.get(`${this.baseUr2}brandReport/getInvoiceDashboardData/${orgId}/${lenderId}/${brandId}/${distId}`)
  }
  // nach enable
  saveNachEnable(loanId: any, data: any): Observable<any> {
    return this.https.post(`${this.baseUr2}operation/saveLoanAdhocNach/${loanId}`, data)
  }
  // lenderDisbMoneyCalc
  lenderDisbMoneyCalc(data: any): Observable<any> {
    return this.https.post(`${this.baseUrl}escrow/lenderDisbMoneyCalc`,data)
}
applicantCRNdata(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}seller/applicantPanData`,data)
}
getLOSOutstandingDetails(): Observable<any> {
  return this.https.get(`${this.baseUrl}credit/getLOSOutstandingDetails`)
}
// seller/getBuyerlist/losid/type
getBuyerList(loanId: any, type:any): Observable<any>{
  return this.https.get(`${this.baseUrl}seller/getBuyerList/${loanId}/${type}`)
}
// credit/creditRotationDisbursalRequest
creditRotation(data:any): Observable<any>{
  return this.https.post(`${this.baseUrl}credit/creditRotationDisbursalRequest`,data)
}
viewRotationList(): Observable<any>{
  return this.https.get(`${this.baseUrl}credit/viewRotationList`)
}
viewRotationDetails(id:any): Observable<any>{
  return this.https.get(`${this.baseUrl}credit/viewRotationDetails/${id}`)
}
getSourcingStateList(): Observable<any>{
  return this.https.get(`${this.baseUr2}sourcing/getStateList`)
}
getSourcingCityList(id:any): Observable<any>{
  return this.https.get(`${this.baseUr2}sourcing/getCityListById/${id}`)
}
getRegional(data:any): Observable<any>{
  return this.https.post(`${this.baseUr2}report/getRegionalReportList`,data)
}
getProgramDetailsList(): Observable<any>{
  return this.https.get(`${this.baseUr2}report/getProgramDetailsList`)
}
getSummaryList(data:any): Observable<any>{
  return this.https.post(`${this.baseUr2}report/getSummaryList`,data)
}
getAnchorNames(id:any): Observable<any>{
  return this.https.get(`${this.baseUr2}report/getAnchorList/${id}`)
}

getStatusNameList(data:any): Observable<any> {
  return this.https.post(`${this.baseUr2}report/getStatusNameList`,data);
}

getSouthRegionUserList(): Observable<any> {
  return this.https.get(`${this.baseUr2}report/getSouthRegionUserList`);
}
processLimitAssessment(obj: any): Observable<ApiResponse> {
  return this.https.post<ApiResponse>(this.baseUrl + 'banking/processLimitAssessment', obj);
}

getsubStatusregionalList(data: any): Observable<any> {
  return this.https.post(`${this.baseUr2}report/getSubStatusList`,data);
}
lenderAumReport(obj:any):Observable<any>{
  return this.https.get(`${this.baseUr2}dashboard/getLenderAumReportDetails/${obj}`)
}
getBeneUserId():Observable<any>{
  return this.https.get(`${this.baseUr2}operation/getUserAuthentic`);
}

getClosedBillingListForLenders(data:any):Observable<any>{
  return this.https.post(`${this.baseUr2}LOSReport/getClosedBillingListForLenders`,data);
}
getUserList():Observable<any>{
  return this.https.get(`${this.baseUr2}user/getUserList`);
}
getProgramType(brandId:any):Observable<any>{
  return this.https.get(`${this.baseUr2}user/getProgramType/${brandId}`);
}
saveMappingDetails(data:any):Observable<any>{
  return this.https.post(`${this.baseUr2}user/saveMappingDetails`,data);
}

deletemultipleinvoice(data:any):Observable<any>{
  return this.https.post(`${this.baseUr2}sourcing/invoiceCancellationUpdateTwo`,data)
}
multiplelogin(data:any):Observable<any>{
  return this.https.post(`${this.baseUr2}login/insertFailedLog`,data)
}
saveuploadInvoice(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}seller/sellerLoanRequest`, data);
}
getOtp(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}otp/generateOTP`, data);
}
verifyOtp(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}otp/verifyOTP`, data);
}
insertBorrowerTenureDetail(data: any): Observable<any> {
  return this.https.post(`${this.baseUr2}program/insertBorrowerTenureRoi`, data);
}
getCustomerDump(fromdate: any, todate:any): Observable<any> {
  return this.https.get(`${this.baseUr2}analyticsDetails/getCustomerDump/${fromdate}/${todate}`);
}
getCustomerTransactionDetails1(fromdate:any,todate:any): Observable<any> {
  return this.https.get(`${this.baseUr2}analyticsDetails/getCustomerTransactionDetails1/${fromdate}/${todate}`);
}
getCustomerTransactionDetails2(data:any): Observable<any> {
  return this.https.post(`${this.baseUr2}analyticsDetails/getCustomerTransactionDetails2`,data);
}
casaAccountCreation(data:any):Observable<any>{
  return this.https.post(`${this.baseUrl}janaOD/casaAccountCreation`,data)  
}
createSdfc(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}jana/customerOnboardingSfdc`, data);
}
createVirtualAccount(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}jana/vaAccountCreation`, data);
}
updateCrnDetails(data:any): Observable<any> {
  return this.https.post(`${this.baseUrl}jana/updateCrn`,data);
}
getCrnDetails(data:any): Observable<any> {
  return this.https.post(`${this.baseUrl}jana/getCrnDetails`,data);
}
updateExternalNPAStartDate(data:any): Observable<any> {
  return this.https.post(`${this.baseUr2}operation/updateNPAStartDate`,data);
}
removeNPAStartDate(data:any): Observable<any> {
  return this.https.post(`${this.baseUr2}operation/removeNPAStartDate`,data);
}
activeInactiveUserBrandMapping(id:any,flag:any):Observable<any> {
  return this.https.get(`${this.baseUr2}user/activeInactiveUserBrandMapping/${id}/${flag}`);
}
getUserMappingList(userId: any,flag:any): Observable<any> {
  return this.https.get(`${this.baseUr2}user/getUserMappingList/${userId}/${flag}`);
}
eNachMandatEinquiry(data:any): Observable<any> {
  return this.https.post(`${this.baseUrl}jana/eNachMandatEinquiry`,data);
 }

 getESignDetails(loanId:any):Observable<any>{
  return this.https.get(`${this.baseUrl}eSign/getESignDetails/${loanId}`)
 }

 eSignaturetxnStatus(data:any):Observable<any>{
  return this.https.post(`${this.baseUrl}eSign/eSignaturetxnStatus`,data)
 }

 downloadRequestResponse(id:any,flag:any):Observable<any>{
  return this.https.get(`${this.baseUr2}report/fetchAPILogs/${id}/${flag}`)
}

pgTransactionData(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}cashFree/pgTransactionData`, data);
}
// finAggMobileAPI/api/v1/jana/vkycRegistrationStatus

vkycRegistrationStatus(data: any):Observable<any>{
  return this.https.post(`${this.baseUrl}jana/vkycRegistrationStatus`,data);
}

resendVkycGenerateLink(data: any):Observable<any>{
  return this.https.post(`${this.baseUrl}jana/resendVkycGenerateLink`,data);
}
logOut(obj: any): Observable<any> {
  return this.https.post(`${this.baseUr2}login/logout`, obj);
}
udyamOTPRequest(data:any):Observable<any>{
  return this.https.post(`${this.baseUrl}udyam/udyamOTPRequest`,data)  
}
verifyUdyamDetailsOTP(data:any):Observable<any>{
  return this.https.post(`${this.baseUrl}udyam/verifyUdyamDetailsOTP`,data)  
}
UdyamDetails(data:any):Observable<any>{
  return this.https.post(`${this.baseUrl}udyam/UdyamDetails`,data)  
}
getUdhyamDetails(orgId:any,loanId:any):Observable<any>{
  return this.https.get(`${this.baseUrl}udyam/getUdyamDetails/${orgId}/${loanId}`)
}
insertCustomerRepaymentStatus(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}escrowclient/insertCustomerRepaymentStatus`, data);
}

uploadCustomerRepaymentData(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}escrowclient/uploadCustomerRepaymentData`, data);
}
insertCustomerRepaymentData(data: any): Observable<any> {
  return this.https.post(`${this.baseUrl}escrowclient/insertCustomerRepaymentData`, data);}
  getAnchorList():Observable<any>{
    return this.https.get(`${this.baseUr2}report/getAnchorList`)
  }
  getSanctionConditionList(fileType:any,data:any):Observable<any>{
    return this.https.post(`${this.baseUr2}report/getSanctionConditionList/${fileType}`,data)
  }
  getSanctionListforLos(loanId:any):Observable<any>{
    return this.https.get(`${this.baseUr2}report/getsanctionListForLosId/${loanId}`)
  }
}
