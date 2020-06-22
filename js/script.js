'use strict'

const s = selector => document.querySelector(selector);
const ss = selector => document.querySelectorAll(selector);

let setErrorElement = document.createElement('h3');
setErrorElement.setAttribute('class', ' text-info p-5 text-center ')

function noneXml(getError) {
    ss('section').forEach(v => {
        v.remove();
    })
    setErrorElement.innerHTML = getError
    document.body.appendChild(setErrorElement);
}

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //  console.clear()
            let data = xml2json(xhttp.responseXML);
            // document.write(JSON.stringify(data));
            let result = JSON.parse(JSON.stringify(data));
            const api = result.Envelope.Body.InquiryResponse;
            let forError = ReportObject().ReportData;
            let getError = `ErrorCode: ${forError.Error ? forError.Error.ErrorCode : ''} <br/> ErrorMsg: ${forError.Error ? forError.Error.ErrorMsg : ''}`;

            function ReportObject() {
                return api;
            }
            console.log(JSON.stringify(api));
            // for not found ... 
            const { ClientID, ReportOrderNO, Date, Time, SuccessCode } = ReportObject().InquiryResponseHeader;

            // ............ Report Data Title ............. 
            ClientID ? s('#clientId').innerHTML = `Client ID: ${ClientID}` : s('#clientId').remove();
            ReportOrderNO ? s('#reportOrder').innerHTML = `Report Order Number: ${ReportOrderNO}` : s('#reportOrder').remove()
            Date ? s('#reportCreateDate').innerHTML = `Report Created Date: ${Date}` : s('#reportCreateDate').remove();
            Time ? s('#reportCreateTime').innerHTML = `Report Created Time: ${Time}` : s('#reportCreateTime').remove();


            // ............ Report Data Title ............. End



            if (forError.Error) {
                noneXml(getError)
            } else {
                // console.log('false')


                const {
                    InquiryResponseHeader,

                    InquiryRequestInfo: {
                        InquiryAddresses,
                        InquiryPhones,
                        ...default_InquiryRequestInfo
                    },

                    Scores: {
                        Score
                    },
                    ReportData: {
                        IDAndContactInfo: {
                            PersonalInfo,
                            IdentityInfo,
                            AddressInfo,
                            PhoneInfo,
                            EmailAddressInfo
                        },
                        IDAndContactInfo,
                        AccountSummary: {
                            AccountsSummary,
                        },
                        RecentActivities,
                        OtherKeyInd,
                        EnquirySummary,
                        Enquiries,
                        AccountDetails,
                        Disclaimer,
                        ConsumerDisputes,
                        DimensionalVariable,
                        ScoreDetails: {
                            ScoreDetail
                        }
                    }
                } = ReportObject();


                // ......................... OutPut Code ............ 



                // ..................... ReportData............................................



                // ...................IDAndContactInfo...............

                function Report_IDAndContactInfo() {
                    //console.log(Object.keys(IDAndContactInfo))

                    Object.keys(IDAndContactInfo).forEach(id => {
                        s('[data-IDAndContactInfo]').innerHTML +=
                            `
            <li class="col-12 py-2">
            <ul data-${id}  class=" position-relative">

            <li class="color_main sticky-top z_100 bg-light py-2 px-2"> 
            ${id} </li>
            
            </ul>
            
        </li>
            `
                    })

                    {

                        // PersonalInfo
                        const {
                            Name: {
                                FullName
                            },
                            DateOfBirth,
                            Gender,
                            Age: {
                                Age
                            },
                            Occupation
                        } = PersonalInfo;

                        //    console.log(PersonalInfo)

                        if (PersonalInfo) {
                            s('[data-PersonalInfo]').innerHTML =

                                `
                <li class="color_main  z_100 bg-light py-2 px-2"> 
                PersonalInfo    </li>

                <li class="table-responsive-md"> 
                <table class="table"> 
                <thead> 
                <tr> 
                <th> FullName </th> 
                <th> DateOfBirth </th>
                 <th> Gender </th>
                 <th> Age </th>
                  <th> Occupation </th> </tr>
                  </thead>

                <tbody> 
                <tr>
                 <td> ${FullName} </td>  
                 <td> ${DateOfBirth} </td>
                
                <td> ${Gender} </td>
                <td> ${Age} </td>
                <td> ${Occupation} </td>
                
                </tr>
                 </tbody>
                </table>


                </li>
                
                `
                        } else {
                            console.log('PersonalInfo Not Found');
                            s('#APPLICANT_DETAILS').innerHTML = ''
                        }
                    } {
                        // console.log(IdentityInfo)
                        // IdentityInfo
                        //  console.log(IdentityInfo)
                        const { PANId, PassportID, NationalIDCard, IDOther } = IdentityInfo
                        // console.log(NationalIDCard)
                        if (IdentityInfo) {
                            s('[data-IdentityInfo]').innerHTML =
                                `
           <li class="color_main  z_100 bg-light py-2 px-2"> 
           IdentityInfo    </li>
           <li class="table-responsive-md"> 
           <table class="table">
           <thead> <tr> 
           <th> Type </th>  <th> ReportedDate
            </th> <th> IdNumber </th> </tr> </thead>
            <tbody>
           ${
                            PANId ? ` <tr > <td> PANId </td>  <td> ${PANId.attr.ReportedDate} </td> <td> ${PANId.IdNumber} </td> </tr>` :
                                ''
                            }
            ${
                            PassportID ? `<tr > <td> PassportID </td>  <td> ${PassportID.attr.ReportedDate} </td> <td> ${PassportID.IdNumber} </td> </tr>` :
                                ''
                            }
            ${
                            NationalIDCard ? `<tr > <td> NationalIDCard </td>  <td> ${NationalIDCard.attr.ReportedDate} </td> <td> ${NationalIDCard.IdNumber} </td> </tr>` :
                                ''
                            }
            ${
                            IDOther ? `<tr > <td> IDOther </td>  <td> ${IDOther.attr.ReportedDate} </td> <td> ${IDOther.IdNumber} </td> </tr>` :
                                ''
                            }


            </tbody>
           </table>
           </li>
           `

                    } else {
                        console.log('IdentityInfo  Not Found');
                        s('#APPLICANT_DETAILS').classList.add('d-none')
                    }
                }
                /*
    
    
                   
                   
                  */

                {
                    // AddressInfo
                    //  console.log(AddressInfo)



                    // const {_seq,_ReportedDate, Address, State, Postal,Type } = AddressInfo[0];
                    if (AddressInfo) {
                        s('[data-AddressInfo]').innerHTML =

                            `

            <li class="color_main  z_100 bg-light py-2 px-2"> 
            AddressInfo    </li>
            <li class="table-responsive-md"> 

            <table class="table"> 
            <thead>
            <tr data-AddressInfo-col >
            
            <th> Sequence </th> <th> ReportedDate </th> <th> Address</th><th> State</th><th> Postal</th><th>Type </th>
            </tr>
            </thead>

            <tbody data-AddressInfo-body > 


            </tbody>

            </table>

            </li>
            `

                        AddressInfo.map(a => {
                            s('[data-AddressInfo-body]').innerHTML +=

                                `
                        <tr> <td> ${a.attr.seq} </td> <td> ${a.attr.ReportedDate} </td> <td> ${a.Address} </td>
                        <td> ${a.State} </td> <td> ${a.Postal} </td> <td> ${a.Type} </td>  </tr>
                        
                        `
                        })
                    } else {
                        console.log('AddressInfo Not Found');
                        s('#APPLICANT_DETAILS').classList.add('d-none')

                    }

                }


                {

                    // PhoneInfo

                    //  console.log(PhoneInfo)

                    if (PhoneInfo) {
                        s('[data-PhoneInfo]').innerHTML =

                            `

                <li class="color_main z_100 bg-light py-2 px-2"> 
                PhoneInfo    </li>
                <li class="table-responsive-md"> 

                <table class="table"> 
                <thead>
                <tr data-PhoneInfo-col >
                
                <th> Sequence </th> <th> ReportedDate </th> <th> Number</th><th> Typecode</th>
                                </tr>
                </thead>

                <tbody data-PhoneInfo-body > 
                </tbody>

                </table>

                </li>
                `
                        PhoneInfo.map(a => {
                            s('[data-PhoneInfo-body]').innerHTML +=

                                `
                        <tr> <td> ${a.attr.seq} </td> <td> ${a.attr.ReportedDate} </td> <td> ${a.Number} </td>
                        <td> ${a.attr.typeCode} </td>   </tr>
                        
                        `
                        })
                    } else {
                        console.log('PhoneInfo not Found');
                        s('#APPLICANT_DETAILS').classList.add('d-none');
                    }

                }

                {

                    // EmailAddressInfo
                    // console.log(EmailAddressInfo)


                    if (EmailAddressInfo) {
                        s('[data-EmailAddressInfo]').innerHTML +=
                            `
                       <li>

                       <table class="table">
                       
                       <thead>
                       <tr> <th> Sequence No </th> <th> ReportedDate </th> <th> EmailAddress </th>  </tr>
                       </thead>
                       <tbody> 
                       <tr>
                       <td> ${EmailAddressInfo.attr.seq} </td>
                       <td>  ${EmailAddressInfo.attr.ReportedDate} </td>
                       <td> ${EmailAddressInfo.EmailAddress}  </td>
                       </tr>

                       </tbody>

                       
                       
                       </table>


                       </li>
                       `

                    } else {
                        console.log('EmailAddressInfo not Found');
                        s('#APPLICANT_DETAILS').classList.add('d-none');
                    }
                }

            }
            Report_IDAndContactInfo()
            // ...................IDAndContactInfo...............End


             // ...................ScoreDetails...............

             function Report_ScoreDetails() {
                const { ScoringElements: {
                    ScoringElement
                } } = ScoreDetail;
                s('[data-score-count]').innerHTML = ScoreDetail.Value
                ScoringElement.map((n, m) => {
                    s('[data-Score-factor]').innerHTML +=
                        `
               <li class="py-1"> <span class="pr-2"> ${m + 1} </span> ${n.Description != undefined ? n.Description : ''}</li>
               `
                })
            }
            Report_ScoreDetails()
            // ...................ScoreDetails...............End


            {
                // ...................AccountsSummary...............

                //  console.log(AccountsSummary)

                if (AccountsSummary) {
                    function Report_AccountsSummary() {
                        Object.entries(AccountsSummary).forEach(v => {
                            s('[data-AccountsSummary]').innerHTML +=
                                `
                <li class="col-6  col-sm-md-4 col-lg-3 py-2"><span class="key color_main pr-2">
                     ${v[0]}: 
                </span><span class="value"> ${v[1]} </span></li>
                `
                        })

                    }
                    Report_AccountsSummary()
                } else {
                    console.log('AccountSummary not Found');
                    s('.AccountsSummary').classList.add('d-none')

                }


                // ...................AccountsSummary...............End

            }




            // ...................RecentActivities...............

            function Report_RecentActivities() {
                Object.entries(RecentActivities).forEach(v => {
                    s('[data-RecentActivities]').innerHTML +=
                        `
            <li class="col-6  col-sm-md-4 col-lg-3 py-2"><span class="key color_main pr-2">
                 ${v[0]}: 
            </span><span class="value"> ${v[1]} </span></li>
            `
                })

            }
            Report_RecentActivities()
            // ...................RecentActivities...............End


            {
                // ...................OtherKeyInd...............

                function Report_OtherKeyInd() {
                    //  console.log(OtherKeyInd)
                    Object.entries(OtherKeyInd).forEach(v => {
                        s('[data-OtherKeyInd]').innerHTML +=
                            `
            <li class="col-6  col-sm-md-4 col-lg-3 py-2"><span class="key color_main pr-2">
                 ${v[0]}: 
            </span><span class="value"> ${v[1]} </span></li>
            `
                    })

                }
                Report_OtherKeyInd()


                // ...................OtherKeyInd...............End
            }



            {
                // ...................EnquirySummary...............

                //  console.log(EnquirySummary)
                function Report_EnquirySummary() {
                    Object.entries(EnquirySummary).forEach(v => {
                        s('[data-EnquirySummary]').innerHTML +=
                            `
                <li class="col-6  col-sm-md-4 col-lg-3 py-2"><span class="key color_main pr-2">
                     ${v[0]}: 
                </span><span class="value"> ${v[1]} </span></li>
                `
                    })

                }
                Report_EnquirySummary()
                // ...................EnquirySummary...............End
            }





            {
                // ...................Enquiries...............
                // console.log(JSON.stringify(Enquiries));
                if (Enquiries) {
                    console.log('true')
                    function Report_Enquiries() {
                        let arr = Object.entries(Enquiries instanceof Array ? Enquiries[0] : Enquiries);
                        s('[data-Enquiries-head] tr').innerHTML =
                            `<th class="color_main">Sequence</th>
                    <th class="color_main">Institution</th>
                    <th class="color_main">Date</th>
                    <th class="color_main">Time</th>
                    <th class="color_main">RequestPurpose</th>
                    <th class="color_main">Amount</th>`


                        if (Enquiries instanceof Array) {
                            Enquiries.map(j => {
                                s('[data-Enquiries-body]').innerHTML +=
                                    ` <tr> <td> ${j.attr.seq} </td>
                    <td> ${j.Institution} </td>
                    <td> ${j.Date} </td>
                    <td> ${j.Time} </td>
                    <td> ${j.RequestPurpose} </td>
                    <td> ${j.Amount} </td>
                    </tr> `
                            })
                        } else {
                            s('[data-Enquiries-body]').innerHTML +=
                                ` <tr> <td> ${Enquiries.attr.seq} </td>
            <td> ${Enquiries.Institution} </td>
            <td> ${Enquiries.Date} </td>
            <td> ${Enquiries.Time} </td>
            <td> ${Enquiries.RequestPurpose} </td>
                    ${Enquiries.Amount == undefined ? ` <td> - </td>` : ` <td> ${Enquiries.Amount} </td>`}
            </tr> `
                        }
                       
                    }
                    Report_Enquiries()
                } else {
                    console.log('Enquiries not found')
                    s('[data-Enquiries-section]').remove()
                }


                // ...................Enquiries...............End
            }



            // ...................Account...............
            // console.log(Account)
            function Report_Account() {
                //let { Account } = AccountDetails;
                let Account = AccountDetails.Account instanceof Array ? AccountDetails.Account : [AccountDetails.Account];

                if (Account instanceof Array) {
                    //console.log('')
                    Account.map((j, i) => {
                        s('[data-main-account]').innerHTML +=
                            `
              <ul class="row position-relative py-2  table-responsive-md "> 
              <table class="table table-borderless ">
              <thead data-Account-head>
                <tr>
                 <th class="color_main bg_white_head" colspan="30">Account No: ${i + 1}</th>
                </tr>
              </thead>
              <tbody data-Account-body >

              <tr> 
              <td>ReportedDate: ${j.attr.ReportedDate != undefined ? j.attr.ReportedDate : '-'} </td>
              <td> AccountNumber: ${j.AccountNumber != undefined ? j.AccountNumber : '-'} </td> <td>Institution:  ${j.Institution != undefined ? j.Institution : '-'}</td>

              </tr>

              <tr> 

              <td>

               <ul>
               <li class="no_hover py-2"> AccountType: ${j.AccountType != undefined ? j.AccountType : '-'} </li>
               <li class="no_hover py-2"> Card OwnershipType: ${j.OwnershipType != undefined ? j.OwnershipType : '-'}</li>
               <li class="no_hover py-2">  Balance: ${j.Balance != undefined ? j.Balance : '-'} </li>
               <li class="no_hover py-2"> PastDueAmount:  ${j.PastDueAmount != undefined ? j.PastDueAmount : '-'} </li>
               <li class="no_hover py-2"> LastPayment: ${j.LastPayment != undefined ? j.LastPayment : '-'} </li>
               
               </ul>
              </td>

              <td> 
              <ul>
              <li class="no_hover py-2">Open: ${j.Open != undefined ? j.Open : '-'} </li>
              <li class="no_hover py-2">HighCredit: ${j.HighCredit != undefined ? j.HighCredit : '-'} </li>
              <li class="no_hover py-2">LastPaymentDate: ${j.LastPaymentDate != undefined ? j.LastPaymentDate : '-'} </li>
              <li class="no_hover py-2">DateReported: ${j.DateReported != undefined ? j.DateReported : '-'} </li>
              <li class="no_hover py-2">DateOpened: ${j.DateOpened != undefined ? j.DateOpened : '-'} </li>
              </ul>
              </td>
              <td> 
              <ul> 

              <li class="no_hover py-2">Reason: ${j.Reason != undefined ? j.Reason.__text === undefined ? '-' : j.Reason.__text : '-'} </li>
              <li class="no_hover py-2">InterestRate: ${j.InterestRate != undefined ? j.InterestRate.__text === undefined ? '-' : j.InterestRate.__text : '-'}</li>
              <li class="no_hover py-2">RepaymentTenure: ${j.RepaymentTenure != undefined ? j.RepaymentTenure.__text === undefined ? '-' : j.RepaymentTenure.__text : ''} </li>
              <li class="no_hover py-2"> DisputeCode:  ${j.DisputeCode != undefined ? j.DisputeCode.__text === undefined ? '-' : j.DisputeCode.__text : '-'}</li>
              <li class="no_hover py-2">TermFrequency: ${j.TermFrequency != undefined ? j.TermFrequency.__text === undefined ? '-' : j.TermFrequency.__text : '-'} </li>
              </ul>
              </td>
              <td> 
              <ul> 
              <li class="no_hover py-2">CreditLimit: ${j.CreditLimit != undefined ? j.CreditLimit.__text === undefined ? '-' : j.CreditLimit.__text : '-'} </li>
              <li class="no_hover py-2">CollateralValue: ${j.CollateralValue != undefined ? j.CollateralValue.__text === undefined ? '-' : j.CollateralValue.__text : '-'} </li> 
              <li class="no_hover py-2">CollateralType: ${j.CollateralType != undefined ? j.CollateralType.__text === undefined ? '-' : j.CollateralType.__text : '-'} </li> 
              <li class="no_hover py-2">Current Account: ${j.AccountStatus != undefined ? j.AccountStatus.__text : '-'} </li> 
              <li class="no_hover py-2">AssetClassification:  ${j.AssetClassification != undefined ? j.AssetClassification.__text === undefined ? '-' : j.AssetClassification.__text : '-'} </li> 
              </ul>
              </td>
              </tr>
              </tbody>
            </table>

           <li  class="no_hover" > 

           <!-- History48Month  --> 

           <table class="table
           table-responsive position-relative table-borderless hori_scroll">
            <thead> 
             </thead>
            <tbody data-history-48 data-no-${i} >

            <tr class="data-no-month-row" > <td class="color_main" > Month/Year: </td>  </tr>
            <tr class="data-no-payment-row" > <td class="color_main" > Payment Status:  </td>  </tr>
            <tr class="data-no-SuitFiledStatus-row" > <td class="color_main" > SuitFiledStatus:  </td>  </tr>
            <tr class="data-no-AssetClassificationStatus-row" > <td class="color_main">  AssetClassificationStatus:  </td>  </tr>


            </tbody>
           
           </table>
           <!-- History48Month  End-->
           </li>

            
</ul>
              `
                    })
                } else {
                    console.log('Account is object')
                }

            }






            Report_Account()



            //  .................... History48Months......................
            //  console.log(Account)
           
            let Account = AccountDetails.Account instanceof Array ? AccountDetails.Account : [AccountDetails.Account];
         
          //  console.log(Account);
            
            if (Account instanceof Array) {
                const totalAccount = Account.length;
                // console.log(totalAccount)
                for (let i = 0; i < Number(totalAccount); i++) {
                    {
                        // const {History48Months: {Month}} = Account[i];
                        // const monthObj = Month instanceof Array ? Month : [Month];

                        // account 1 history
                        if(Account[1-1]) {
                            const acc = Account[1-1].History48Months.Month
                           // console.log(acc)
                           if(i <= 1){
                            acc.forEach((v,j)=> {
                               console.log(j)
                                s(`[data-no-${1 - 1}] .data-no-month-row`).innerHTML += `
                                <td>   ${v.attr.key} </td>
                               `
                                    s(`[data-no-${1 - 1}] .data-no-payment-row`).innerHTML += `
                               <td>   ${v.PaymentStatus} </td>
                              `
                                    s(`[data-no-${1 - 1}] .data-no-SuitFiledStatus-row`).innerHTML += `
                              <td>   ${v.SuitFiledStatus} </td>
                             `
                                    s(`[data-no-${1 - 1}] .data-no-AssetClassificationStatus-row`).innerHTML += `
                             <td>  ${v.AssetClassificationStatus} </td>
                            `
                            })
                           } 
                          

                            
                            
                        }
                        
                    }

                    {
                        // account 2 history
                        if(Account[2-1]){
                            const acc = Account[2 - 1].History48Months.Month
                            if (i <= acc.length - 1) {
                                const status = acc[i];
                                // console.log(Account[1].History48Months.Month.length)
                                // console.log(status._key)
                                s(`[data-no-${2 - 1}] .data-no-month-row`).innerHTML += `
                            <td>   ${status.attr.key} </td>
                           `
                                s(`[data-no-${2 - 1}] .data-no-payment-row`).innerHTML += `
                           <td>   ${status.PaymentStatus} </td>
                          `
                                s(`[data-no-${2 - 1}] .data-no-SuitFiledStatus-row`).innerHTML += `
                          <td>   ${status.SuitFiledStatus} </td>
                         `
                                s(`[data-no-${2 - 1}] .data-no-AssetClassificationStatus-row`).innerHTML += `
                         <td>  ${status.AssetClassificationStatus} </td>
                        `
                            }
                        }
                       
                    }
                    {
                        // account 3 history
                        if(Account[3-1]){
                            const acc = Account[3 - 1].History48Months.Month
                            if (i <= acc.length - 1) {
                                const status = acc[i];
                                // console.log(Account[1].History48Months.Month.length)
                                // console.log(status._key)
                                s(`[data-no-${3 - 1}] .data-no-month-row`).innerHTML += `
                            <td>   ${status.attr.key} </td>
                           `
                                s(`[data-no-${3 - 1}] .data-no-payment-row`).innerHTML += `
                           <td>   ${status.PaymentStatus} </td>
                          `
                                s(`[data-no-${3 - 1}] .data-no-SuitFiledStatus-row`).innerHTML += `
                          <td>   ${status.SuitFiledStatus} </td>
                         `
                                s(`[data-no-${3 - 1}] .data-no-AssetClassificationStatus-row`).innerHTML += `
                         <td>  ${status.AssetClassificationStatus} </td>
                        `
                            }
                        }
                       
                    }

                    {
                        // account 4 history
                        if (Account[4 - 1]) {
                            const acc = Account[4 - 1].History48Months.Month
                            if (i <= acc.length - 1) {
                                const status = acc[i];
                                // console.log(Account[1].History48Months.Month.length)
                                // console.log(status._key)
                                s(`[data-no-${4 - 1}] .data-no-month-row`).innerHTML += `
                            <td>   ${status.attr.key} </td>
                           `
                                s(`[data-no-${4 - 1}] .data-no-payment-row`).innerHTML += `
                           <td>   ${status.PaymentStatus} </td>
                          `
                                s(`[data-no-${4 - 1}] .data-no-SuitFiledStatus-row`).innerHTML += `
                          <td>   ${status.SuitFiledStatus} </td>
                         `
                                s(`[data-no-${4 - 1}] .data-no-AssetClassificationStatus-row`).innerHTML += `
                         <td>  ${status.AssetClassificationStatus} </td>
                        `
                            }
                        }
                    }



                    {
                        // account 5 history
                        if(Account[4]) {
                            if (i <= 0) {
                                const status = Account[4].History48Months.Month;
                                //   console.log(JSON.stringify(status))
                                //  console.log(status.PaymentStatus.__text)
                                // console.log(Account[1].History48Months.Month.length)
                                // console.log(status)
    
                                // console.log(status._key)
                                if (status instanceof Array) {
                                    //   console.log('true')
    
                                    status.forEach(v => {
                                        s(`[data-no-4] .data-no-month-row`).innerHTML += `
                                <td>   ${v.attr.key} </td>
                               `
                                        s(`[data-no-4] .data-no-payment-row`).innerHTML += `
                               <td>   ${v.PaymentStatus} </td>
                              `
                                        s(`[data-no-4] .data-no-SuitFiledStatus-row`).innerHTML += `
                              <td>   ${v.SuitFiledStatus} </td>
                             `
                                        s(`[data-no-4] .data-no-AssetClassificationStatus-row`).innerHTML += `
                             <td>  ${v.AssetClassificationStatus} </td> `
                                    })
    
                                } else {
                                    // console.log('false')
    
                                    s(`[data-no-4] .data-no-month-row`).innerHTML += `
                               <td>   ${status.attr.key} </td>
                              `
                                    s(`[data-no-4] .data-no-payment-row`).innerHTML += `
                              <td>   ${status.PaymentStatus} </td>
                             `
                                    s(`[data-no-4] .data-no-SuitFiledStatus-row`).innerHTML += `
                             <td>   ${status.SuitFiledStatus} </td>
                            `
                                    s(`[data-no-4] .data-no-AssetClassificationStatus-row`).innerHTML += `
                            <td>  ${status.AssetClassificationStatus} </td> `
                                }
                            }
                        }
                        
                    }

                    for (let n = 6; n <= Number(totalAccount); n++) {
                        //  console.log(n)

                        {
                            // account 6 history
                            const acc = Account[n - 1].History48Months.Month

                            if (i <= acc.length - 1) {

                                const status = acc[i];
                                // console.log(status)
                                // console.log(Account[1].History48Months.Month.length)
                                // console.log(status._key)
                                s(`[data-no-${n - 1}] .data-no-month-row`).innerHTML += `
                        <td>   ${status.attr.key} </td>
                       `
                                s(`[data-no-${n - 1}] .data-no-payment-row`).innerHTML += `
                       <td>   ${status.PaymentStatus} </td>
                      `
                                s(`[data-no-${n - 1}] .data-no-SuitFiledStatus-row`).innerHTML += `
                      <td>   ${status.SuitFiledStatus} </td>
                     `
                                s(`[data-no-${n - 1}] .data-no-AssetClassificationStatus-row`).innerHTML += `
                     <td>  ${status.AssetClassificationStatus} </td>
                    `
                            }
                        }


                    }
                }
            } else {
                //  console.log('Account is object')



                // // account 1 history
                // const acc = Account.History48Months.Month
                // //  console.log(acc)
                // acc.map(v=> {


                //     s(`[data-no-${1 - 1}] .data-no-month-row`).innerHTML += `
                //     <td>   ${v.attr.key} </td>
                //    `
                //         s(`[data-no-${1 - 1}] .data-no-payment-row`).innerHTML += `
                //    <td>   ${v.PaymentStatus} </td>
                //   `
                //         s(`[data-no-${1 - 1}] .data-no-SuitFiledStatus-row`).innerHTML += `
                //   <td>   ${v.SuitFiledStatus} </td>
                //  `
                //         s(`[data-no-${1 - 1}] .data-no-AssetClassificationStatus-row`).innerHTML = `
                //  <td>  ${v.AssetClassificationStatus} </td>
                // `


                // })
            }

            //  .................... History48Months......................End

            // ...................Account...............End


            // ...................Disclaimer...............

            function Report_Disclaimer() {

                s('[data-Disclaimer-body]').innerHTML +=
                    ` ${Disclaimer} `
            }
            Report_Disclaimer()
            // ...................Disclaimer...............End
            // ...................ConsumerDisputes...............
            if (ConsumerDisputes) {

                function Report_ConsumerDisputes() {
                    console.log(ConsumerDisputes)
                    const {
                        Dispute
                    } = ConsumerDisputes;
                    Dispute.map((v, i) => {
                        const disObj = v.DisputeDetails instanceof Array ? v.DisputeDetails : [v.DisputeDetails]

                        s('[data-ConsumerDisputes-body]').innerHTML +=
                            `<tr data-ConsumerDisputes-tr >
                        <td>${v.attr.status}</td>
                        <td>${v.attr.createdDate}</td> 
                        <tr>
                        
                       <td> </td>
                       <td> </td>
    
    
                       <td> 
                       <ul>
                       <li class="p-2">
                           <ul>
                             <li class="py-2"> Type: ${disObj[0].attr.type} </li>
                             <li class="py-2"> AccNum: ${disObj[0].AccNum === undefined ? '-' : disObj[0].AccNum} </li>
                             <li class="py-2"> DisputeComments: ${disObj[0].DisputeComments}</li>
                             <li class="py-2"> Status: ${disObj[0].Status}</li>
                           </ul>
                       </li>
                       </ul>
                       </td>
                       <td> 
    
                       <ul>
    
                       ${
                            v.DisputeDetails[1] ?

                                `
                                <li class="p-2">
                                <ul>
                                  <li class="py-2"> Type: ${disObj[1].attr.type} </li>
                                  <li class="py-2"> AccNum: ${disObj[1].AccNum === undefined ? '-' : disObj[1].AccNum} </li>
                                  <li class="py-2"> DisputeComments: ${disObj[1].DisputeComments}</li>
                                  <li class="py-2"> Status:  ${disObj[1].Status}</li>
                                </ul>
                            </li> 
                                
                                ` : ``
                            }
    
    
                       </ul>
    
                       </td>
    
    
                       <td> 
                       
    
    
                       <ul>
    
    
                       ${
                            v.DisputeDetails[1] ?

                                `
                                <li class="p-2">
                                <ul>
                                  <li class="py-2"> Type: ${disObj[2].attr.type} </li>
                                  <li class="py-2"> AccNum: ${disObj[2].AccNum === undefined ? '-' : disObj[2].AccNum} </li>
                                  <li class="py-2"> DisputeComments: ${disObj[2].DisputeComments}</li>
                                  <li class="py-2"> Status:  ${disObj[2].Status}</li>
                                </ul>
                            </li> 
                                
                                ` : ``
                            }
                       
    
                       </ul>
                       
                       </td>
    
    
                        </tr>
    
    
                        <td>
    
                      
                           
    
                       </ul>
                   
                   </td>
    
                                         </tr>
                        `
                    })
                }
                Report_ConsumerDisputes()
            } else {
                console.log('ConsumerDisputes not Found');
                s('#ConsumerDisputes').classList.add('d-none')

            }


           

            // ..................... ReportData............................................End


            // ......................... OutPut Code ............ End
        }



    } else if (xhttp.status === 404) {
        noneXml('Page Not Found XML File')

    }
};
// this is xml path url;
let xml_path = 'js/xml_file/xml_file/BTPPV1344H.xml' 
xhttp.open("GET", xml_path, true);
xhttp.send();

function xml2json(xml) {
    try {
        let obj = {}, i, j, attribute, item, nodeName, old;
        // for attributes....
        if (xml.nodeType === 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["attr"] = {};
                for (j = 0; j < xml.attributes.length; j = j + 1) {
                    attribute = xml.attributes.item(j);
                    obj["attr"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue;
        }
        // for children ....
        if (xml.children.length > 0) {
            for (let i = 0; i < xml.children.length; i++) {
                let item = xml.children.item(i);

                let nodeName = item.nodeName;

                let sliceNode = (nodeName.substring(nodeName.indexOf(':') + 1));

                if (typeof (obj[sliceNode]) == "undefined") {
                    obj[sliceNode] = xml2json(item);
                } else {
                    if (typeof (obj[sliceNode].push) == "undefined") {
                        let old = obj[sliceNode];

                        obj[sliceNode] = [];
                        obj[sliceNode].push(old);
                    }
                    obj[sliceNode].push(xml2json(item));
                }

            }
        } else {
            obj = xml.textContent;
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
}