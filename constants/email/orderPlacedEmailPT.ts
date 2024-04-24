export const orderPlacedEmailPT = (
  gigName: string,
  packageName: string,
  orderDate: string,
  orderPrice: number,
  platformFee: number,
  orderTotal: number,
) => {
  return `<!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
      <title> </title>
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style type="text/css">
          #outlook a {
              padding: 0;
          }
  
          body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
  
          table {
              container: sidebar / inline-size;
          }
  
          ,
          td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
          }
  
          img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
          }
  
          .title1 {
              display: block;
          }
  
          .order-table {
              display: block;
              width: 100%;
          }
  
          p {
              display: block;
              margin: 13px 0;
          }
      </style>
      <!--[if mso]>
            <noscript>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG />
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            </noscript>
          <![endif]-->
      <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix {
                width: 100% !important;
              }
            </style>
          <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css" />
      <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      </style>
      <!--<![endif]-->
      <style type="text/css">
          @media only screen and (min-width: 480px) {
              .mj-column-per-100 {
                  width: 100% !important;
                  max-width: 100%;
              }
          }
      </style>
      <style media="screen and (min-width:480px)">
          .moz-text-html .mj-column-per-100 {
              width: 100% !important;
              max-width: 100%;
          }
      </style>
      <style type="text/css"></style>
  </head>
  
  <body style="word-spacing: normal">
      <div style="">
          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          <div style="margin: 0px auto; max-width: 600px">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 90%">
                  <tbody>
                      <tr>
                          <td style="
                        direction: ltr;
                        font-size: 0px;
                        padding: 20px 0;
                        text-align: center;
                      ">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="
                          font-size: 0px;
                          text-align: left;
                          direction: ltr;
                          display: inline-block;
                          vertical-align: top;
                          width: 100%;
                        ">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top" width="100%">
                                      <tbody>
                                          <tr>
                                              <tr>
                                                  <td align="left">
                                                      <div class="title1">
                                                          <img src="https://res.cloudinary.com/dqe71igxe/image/upload/v1713944352/icons/payment-email-PT.png" style="max-width:100%;" />
  
                                                      </div>
                                                  </td>
                                              </tr>
  
                                              <tr>
                                                  <td class="order-table">
                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td>
                                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="fullTable" bgcolor="#ffffff">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td>
                                                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                                          <tbody>
                                                                                              <tr>
                                                                                                  <th style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #5b5b5b;
                                                          font-weight: normal;
                                                          line-height: 1;
                                                          vertical-align: top;
                                                          padding: 0 0 7px 0;
                                                        " align="left">
                                                                                                      Serviço
                                                                                                  </th>
                                                                                                  <th style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #5b5b5b;
                                                          font-weight: normal;
                                                          line-height: 1;
                                                          vertical-align: top;
                                                          padding: 0 0 7px;
                                                        " width="42%" align="left"></th>
                                                                                                  <th style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #5b5b5b;
                                                          font-weight: normal;
                                                          line-height: 1;
                                                          vertical-align: top;
                                                          padding: 0 0 7px;
                                                        " align="center">
                                                                                                      Data de Pedido
                                                                                                  </th>
                                                                                                  <th style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #1e2b33;
                                                          font-weight: normal;
                                                          line-height: 1;
                                                          vertical-align: top;
                                                          padding: 0 0 7px;
                                                        " align="right">
                                                                                                      Preço
                                                                                                  </th>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td height="1" style="background: #bebebe" colspan="4"></td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td height="10" colspan="4"></td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td>
                                                                                                      <img style="width: 60px" src="https://res.cloudinary.com/dqe71igxe/image/upload/s--OGENkKw_--/f_auto/v1711664888/gig_uploads/admin/idealize-o-seu-neg%C3%B3cio-com-um-website_gig_picture_0" />
                                                                                                  </td>
                                                                                                  <td style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #00000;
                                                          line-height: 18px;
                                                          vertical-align: top;
                                                          padding: 10px 0;
                                                        " class="article">
                                                                                                      <span>
                                                          ${gigName} (${packageName})
                                                        </span>
                                                                                                  </td>
                                                                                                  <td style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #646a6e;
                                                          line-height: 18px;
                                                          vertical-align: top;
                                                          padding: 10px 0;
                                                        " align="center">
                                                                                                      ${orderDate}
                                                                                                  </td>
                                                                                                  <td style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #1e2b33;
                                                          line-height: 18px;
                                                          vertical-align: top;
                                                          padding: 10px 0;
                                                        " align="right">
                                                                                                      $ ${orderPrice}
                                                                                                  </td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td height="1" colspan="4" style="
                                                          border-bottom: 1px solid
                                                            #e4e4e4;
                                                        "></td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td height="1" colspan="4" style="
                                                          border-bottom: 1px solid
                                                            #e4e4e4;
                                                        "></td>
                                                                                              </tr>
                                                                                          </tbody>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td height="20"></td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- /Order Details -->
                                                      <!-- Total -->
                                                      <table border="0" cellpadding="0" cellspacing="0" align="right" class="fullTable" bgcolor="#e1e1e1">
                                                          <tbody>
                                                              <tr>
                                                                  <td>
                                                                      <table border="0" cellpadding="0" cellspacing="0" class="fullTable" bgcolor="#ffffff">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td>
                                                                                      <!-- Table Total -->
                                                                                      <table border="0" cellpadding="0" cellspacing="0">
                                                                                          <tbody>
                                                                                              <tr>
                                                                                                  <td style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #646a6e;
                                                          line-height: 22px;
                                                          vertical-align: top;
                                                          text-align: right;
                                                        ">
                                                                                                      Subtotal
                                                                                                  </td>
                                                                                                  <td style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #646a6e;
                                                          line-height: 22px;
                                                          vertical-align: top;
                                                          text-align: right;
                                                          white-space: nowrap;
                                                        " width="100">
                                                                                                      $ ${orderPrice}
                                                                                                  </td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                  <td style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #b0b0b0;
                                                          line-height: 22px;
                                                          vertical-align: top;
                                                          text-align: right;
                                                        ">
                                                                                                      <small>Taxa de serviço</small>
                                                                                                  </td>
                                                                                                  <td style="
                                                          font-size: 14px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #b0b0b0;
                                                          line-height: 22px;
                                                          vertical-align: top;
                                                          text-align: right;
                                                        ">
                                                                                                      <small>$ ${platformFee}</small
                                                        >
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td
                                                        style="
                                                          font-size: 15px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #000;
                                                          line-height: 22px;
                                                          vertical-align: top;
                                                          text-align: right;
                                                        "
                                                      >
                                                        <strong>Total</strong>
                                                      </td>
                                                      <td
                                                        style="
                                                          font-size: 12px;
                                                          font-family: &quot;Open Sans&quot;,
                                                            sans-serif;
                                                          color: #000;
                                                          line-height: 22px;
                                                          vertical-align: top;
                                                          text-align: right;
                                                        "
                                                      >
                                                        <strong
                                                          >$ ${orderTotal}</strong
                                                        >
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <!-- /Table Total -->
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
          </div>
        </body>
      </html>
  `;
};
