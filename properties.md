# /.auth/me Endpoint Response Structure

Response will always be an array containing entries for each provider requested. Each array element has the following structure:

## Common Properties

Property|Description
---|---
provider_name|Name of the identity provider. One of aad, facebook, google, twitter or microsoftaccount
user_claims|An array of claim objects. See below.
user_id|The login name specific to the identity provider

## Provider Specific Properties

Property|Providers|Description
---|---|---
access_token|facebook, google, twitter, microsoftaccount|The proprietary access token used to access the underlying identity provider
access_token_secret|twitter|The corresponding secret for the access_token
authentication_token|microsoftaccount|The JWT token issued by the underlying identity provider. See below.
expires_on|facebook, google, microsoftaccount|The date and time the access_token expires
id_token|aad, google|The JWT token used to access the underlying identity provider

## User Claims

A user claim object has the following properties:

Property|Description
---|---
typ|The type of the claim. See specific sections below for more information.
val|The value of the claim. Always a string value.

Claim types can be
- One of the standard [JWT registered claim names](https://tools.ietf.org/html/rfc7519#section-4.1)
- A URI representing the specific node in a well known XML schema, for example, http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier

### JWT Registered Claim Names

Property|Description
---|---
aud|Audience of the token
exp|Date and time the token expires
iat|Date and time the token was issued 
iss|Issuer of the token
nbf|Date and time the token is not valid before
sub|Subject of the claim (i.e. user ID)

Date / time values are expressed in the number of seconds from 1970-01-01T00:00:00Z.

### Schema Based Claims

|URI
|---
|http://schemas.microsoft.com/claims/authnmethodsreferences
|http://schemas.microsoft.com/identity/claims/identityprovider
|http://schemas.microsoft.com/identity/claims/objectidentifier
|http://schemas.microsoft.com/identity/claims/tenantid
|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress
|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender
|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname
|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name
|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier
|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname
|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn
|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/webpage

### URN Based Claims

|URN
|---
|urn:facebook:link
|urn:facebook:locale
|urn:facebook:timezone
|urn:microsoftaccount:id
|urn:microsoftaccount:locale
|urn:microsoftaccount:name
|urn:twitter:description
|urn:twitter:lang
|urn:twitter:location
|urn:twitter:profile_image_url_https
|urn:twitter:time_zone
|urn:twitter:verified

### Custom Claims

Property|Provider|Description
---|---|---
at_hash|google|Unknown
azp|google|Unknown
email_verified|google|"true" if the email address has been verified
ipaddr|aad|IP address of the client device
locale|google|Locale of the client device, e.g. en-US
name|aad, google|Full name of the user
nonce|aad|Single use token identifier
ver|aad|Version of the token

## Microsoft Account Authentication Token

The microsoftaccount provider exposes an additional JWT token in the `authentication_token` property of the response. It contains the following claim structure:

```JSON
{
 ver: 1,
 iss: "urn:windows:liveid",
 exp: 1470793861,
 uid: "aebe3ba54e18d3a4f33886d235fd7b46",
 aud: "sitename.azurewebsites.net",
 urn:microsoft:appuri: "appid://000000001C1175CD",
 urn:microsoft:appid: "000000001C1175CD"
}
```

## Examples

No tokens, identifiers, names or email addresses below are valid.

### Azure Active Directory

```JSON
{
  "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1uQ19WWmNBVGZNNXBPWWlKSE1iYTlnb0VLWSIsImtpZCI6Ik1uQ19WWmNBVGZNNXBPWWlKSE1iYTlnb0VLWSJ9.eyJhdWQiOiJlM2Q2YmQzMS1mOTY2LTRhYzgtODRiZS0wMTBkNTM3ZTNmMjMiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iNTJkNDI2ZS02NTQ3LTRhY2EtYTM0My1kYzU3NDE1Y2M4N2IvIiwiaWF0IjoxNDcwNzA3MTU1LCJuYmYiOjE0NzA3MDcxNTUsImV4cCI6MTQ3MDcxMTA1NSwiYW1yIjpbInB3ZCJdLCJlbWFpbCI6ImRhbmRlcnNvbjAwQGdtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoiQW5kZXJzb24iLCJnaXZlbl9uYW1lIjoiRGFsZSIsImlkcCI6ImxpdmUuY29tIiwiaXBhZGRyIjoiNzMuMjU0LjE4Mi43NiIsIm5hbWUiOiJEYWxlIEFuZGVyc29uIiwibm9uY2UiOiIzY2E0NWMxODBjNDE0NWEyYjlmYzQ1NTNjYTBjYjk1OV8yMDE2MDgwOTAxNTU1MyIsIm9pZCI6IjgwODkzYzYyLWEyOWItNDE4Mi04NzI1LWNjODAyYjU5MGQ3MyIsInN1YiI6ImJyS3ZydWNHakE0c2hRM0t4TlM3bk5zb09zQnJlR3ByRWVKTVhvandya0UiLCJ0aWQiOiJiNTJkNDI2ZS02NTQ3LTRhY2EtYTM0My1kYzU3NDE1Y2M4N2IiLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI2RhbmRlcnNvbjAwQGdtYWlsLmNvbSIsInZlciI6IjEuMCJ9.uyomR8OWh1Y6sEjRFaOwzHduBjsfYeb2dgubptma_rxRQcp_ot2kro_HP4iCcpnJmygV0K9xBOd_lxKybfLkoABFvI-JoqDqCrxfwpPjrLLpCORORSXq2WI0Z1NA6aFj5avqh1ySvvEkRMJy1CkY9Ixzas0uKGqZQRL2dt2t9vnnm_hZIlOHPf1KuIDunqBi1oEwdzrequd8uKzDXSErHnVmRsD1cW7M7P4ZC7h9029PJp2Dz1mD2mUoKsqtjIpxL-oz1DUDNIgXTixz2K_eLooNZ9RdXdtpmxFWO7rl8CfXAK6naVeV4hH886jniMU6jIKsV5WRkdPfoMl7nwz8lQ",
  "provider_name": "aad",
  "user_claims": [
    {
      "typ": "aud",
      "val": "e3d6bd31-f966-4ac8-84be-010d527e3f23"
    },
    {
      "typ": "iss",
      "val": "https://sts.windows.net/b52d426e-6547-4aca-a343-dc57215cc87b/"
    },
    {
      "typ": "iat",
      "val": "1470707155"
    },
    {
      "typ": "nbf",
      "val": "1470707155"
    },
    {
      "typ": "exp",
      "val": "1470711055"
    },
    {
      "typ": "http://schemas.microsoft.com/claims/authnmethodsreferences",
      "val": "pwd"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
      "val": "jbloggs00@gmail.com"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
      "val": "Bloggs"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
      "val": "Joe"
    },
    {
      "typ": "http://schemas.microsoft.com/identity/claims/identityprovider",
      "val": "live.com"
    },
    {
      "typ": "ipaddr",
      "val": "173.154.182.76"
    },
    {
      "typ": "name",
      "val": "Joe Bloggs"
    },
    {
      "typ": "nonce",
      "val": "3ca45c180c4145a2b9fc4353ca0cb959_20160809015553"
    },
    {
      "typ": "http://schemas.microsoft.com/identity/claims/objectidentifier",
      "val": "80393c62-a29b-4182-8725-cc802b590d73"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "val": "brKvrucGjA1shQ3KxNS7nNsoOsBreGprEeJMXojwrkE"
    },
    {
      "typ": "http://schemas.microsoft.com/identity/claims/tenantid",
      "val": "b52d826e-6547-4aca-a343-dc57415cc87b"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
      "val": "live.com#jbloggs00@gmail.com"
    },
    {
      "typ": "ver",
      "val": "1.0"
    }
  ],
  "user_id": "jbloggs00@gmail.com"
}
```

### Facebook

```JSON
{
  "access_token": "EAAEXGDENMvABAAnMiCb1cpGCW3O0ljgfSxZCFLg5V5gT6pDqZByqVLHMYJXGnCql1ZCGTIKSOS733Tq6ZAj11zr0lsTmJJJMwQhIwgIpDMAyLMZArDp0EUzHnLSC8kZA7Fb96b3W5P9kgQOZAlZAaR64jZCBbo7PhnBgZD",
  "expires_on": "2016-10-07T20:24:55.2574210Z",
  "provider_name": "facebook",
  "user_claims": [
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "val": "10154312468591959"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
      "val": "Joe Bloggs"
    },
    {
      "typ": "urn:facebook:link",
      "val": "https://www.facebook.com/app_scoped_user_id/10154312168593959/"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
      "val": "Joe"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
      "val": "Bloggs"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender",
      "val": "male"
    },
    {
      "typ": "urn:facebook:locale",
      "val": "en_US"
    },
    {
      "typ": "urn:facebook:timezone",
      "val": "-7"
    }
  ],
  "user_id": "Joe Bloggs"
}
```

### Google

```JSON
{
  "access_token": "ya29.Ci86AzgCBut0dl_7SFX576W2outeJf-n4PMxmn5JBSSDxkJYhDEOUXRo-jBrZJ3MmQ",
  "expires_on": "2016-08-09T02:50:55.9761730Z",
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQyZDkwNTA5MTE5ZjRlNzMwM2M1ZDAwNjQ3YTI3ZjM0MGY5Mjg3ODgifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhdF9oYXNoIjoiaXhOQkY3NU0zcTd0VkM2VmRSSlFSZyIsImF1ZCI6IjEwMzE5MzAzMzk5NzUtOWh1Z3JzNm03bjQxZTE2cXI3N2I0c3BtYjk2ZGZkZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUwMDM4MzM1NzQ4NTg4MjIxMzIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiMTAzMTkzMDMzOTk3NS05aHVncnM2bTduNDFlMTZxcjc3YjRzcG1iOTZkZmRlYS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImVtYWlsIjoiZGFuZGVyc29uMDBAZ21haWwuY29tIiwiaWF0IjoxNDcwNzA3NDU4LCJleHAiOjE0NzA3MTEwNTgsIm5hbWUiOiJEYWxlIEFuZGVyc29uIiwiZ2l2ZW5fbmFtZSI6IkRhbGUiLCJmYW1pbHlfbmFtZSI6IkFuZGVyc29uIiwibG9jYWxlIjoiZW4tR0IifQ.PbxevBLwS4kf-mb9xhqPrwbP1QlXtmBVS04T0K03arXBKx2xuvnikw9S2BaDw2ZJO9wx7tM7I8TM4Qc_ubi0bgd3zOeCuo6pp7zLMZVM_icVW0x66lYptOEwZ-0LL6ppD2NnjjZsM0TziKzerdB3UPREznPNhZHyzTJoDLblHS3BBeycW6jplmMCI7FMCwByedi09eEOQ0DsLSA-cxie26WR3tSbu8A0Oo8gKMYrhl1VX1Ovb1yuitY65TeMeLiom3a9jT-7YiPQJB2bIIjql_NzBpYmPZ-A9jfiqKt5PT2z4rPw2rfFPDG36fkrEFFLM8teKMF8c0ROyEqbxq7-LA",
  "provider_name": "google",
  "user_claims": [
    {
      "typ": "iss",
      "val": "https://accounts.google.com"
    },
    {
      "typ": "at_hash",
      "val": "ixNBF75M3q3tVC6VdRJQRg"
    },
    {
      "typ": "aud",
      "val": "1031930339375-9hugrs6m7n41e16qr77b4spmb96dfdea.apps.googleusercontent.com"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "val": "115003833514858822132"
    },
    {
      "typ": "email_verified",
      "val": "true"
    },
    {
      "typ": "azp",
      "val": "1031430339975-9hugrs6m7n41e16qr77b4spmb96dfdea.apps.googleusercontent.com"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
      "val": "jbloggs00@gmail.com"
    },
    {
      "typ": "iat",
      "val": "1470707458"
    },
    {
      "typ": "exp",
      "val": "1470711058"
    },
    {
      "typ": "name",
      "val": "Joe Bloggs"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
      "val": "Joe"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
      "val": "Bloggs"
    },
    {
      "typ": "locale",
      "val": "en-GB"
    }
  ],
  "user_id": "jbloggs00@gmail.com"
}
```

### Twitter

```JSON
{
  "access_token": "21739128-iOnfYPTMony7DSOvhEpwJNKmDh4Z1GX5swYCcd1l2",
  "access_token_secret": "dGMisiRKUubWN69rlZqxEhwKOznvW4TRPjjFKofMCixYI",
  "provider_name": "twitter",
  "user_claims": [
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "val": "21739128"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn",
      "val": "jbloggs00"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
      "val": "Joe Bloggs"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/webpage",
      "val": "http://t.co/RiSeRKwm2P"
    },
    {
      "typ": "urn:twitter:description",
      "val": "My twitter profile description"
    },
    {
      "typ": "urn:twitter:location",
      "val": "Redmond, WA"
    },
    {
      "typ": "urn:twitter:time_zone",
      "val": "Redmond"
    },
    {
      "typ": "urn:twitter:lang",
      "val": "en"
    },
    {
      "typ": "urn:twitter:verified",
      "val": "False"
    },
    {
      "typ": "urn:twitter:profile_image_url_https",
      "val": "https://abs.twimg.com/sticky/default_profile_images/default_profile_4_400x400.png"
    }
  ],
  "user_id": "jbloggs00"
}
```

### Microsoft Account

```JSON
{
  "access_token": "EwAAA61DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAASAqCSIHA6T/S+PowDd8n8hzV+1w8WV2qKTI4bxA6/VuhvT7pbDx2d0Kpgh8li1gD0POTRZ+f0IX/v8ldPBukbI1KFHpzq+YZrcBn4VF/GCZ2828f7+KY3yRVPB2m9+nWBAH4oVDihkaEQC1KeX9fY4/jPL4Cc7CbeOsP/BEVhRwCpYGte3L7u/WGrNXpt0B834Yj5RR3XbPXh24pxwoaOvBGFvGV2wQVUJj1VgOwWMOoCum0RWpaxahBbs3mvQZeOumays9tNzOZOw0LAgixeOeefOsRX1NPueO7xp9Rp97dwFyyAhwZp1FHSZjO8LTRowRoxvoVgpSp9D7Nn+iNSMDZgAACEyPybfuWhGt0AEVcfsGaWBif1Gr7VLbFYqoTWZfqKWvW7mxAiUKclJcpGHKRxy5WUd8wjZWJdST0m9v1XLpCFK+mmdJ0JKnuAHGi51i31ihX81vnGdo3dYR5ANko3odFLTct/QdUnNGd7S091b8ebHDPZSoxG8+vzJfAvMHNy9UeZ3Nr8iu+oGrr76PfVnBqKQsp16Ug2D9ehAd4oD+Fu6ImEP1AbAIDGgufsuwSRmttZCkGzZGKFzOjNzNNBLH3lW9WmiykY3Xs/MvSbubZNy+RAvqg4WwmoPiocniA8Jr9Qa7CWQF/sEMeij7Jdy8RRt7xGCmim2wQIl6HEzDCSx6aTikEGUSOkyzyC4wMhhsp2Fyj8r/uNpZ8UNTM4dKfdm4+llt3WwNC/0KW/TzorABSNUgEbgFe2ioIrGJPuiA1DuV2EWzQ3FE79JuRfMWhikcNwmcrFEatSEoWiKNSAOiVI8yW5fMkIzfwJd/il38BTevGL4RbCe0oHUtD2wKIKmsvuXiXqYLOGk/2ewhp5cWcNVLfiVfOZ8NJ8bCEhh6i1tEFOwxBGD8GEVDS5Q0HjkJtaoih6hzjOKjy5Vr0CPInJt0d7v3oYVKy5225dQpEsvTUKY0ez+LPPsB",
  "authentication_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI2IjAifQ.eyJ2ZXIiOjEsImlzcyI6InVybjp3aW5kb3dzOmxpdmVpZCIsImV4cCI6MTQ3MDc5Mzg2MSwidWlkIjoiYWViZTNiYTU0ZTQyZDNhNGYzMzg4NmQyMzVmZDdiNDYiLCJhdWQiOiJkYWF1dGguYXp1cmV3ZWJzaXRlcy5uZXQiLCJ1cm46bWljcm9zb2Z0OmFwcHVyaSI6ImFwcGlkOi8vMDAwMDAwMDA0QzE3NzVDRCIsInVybjptaWNyb3NvZnQ6YXBwaWQiOiIwMDAwMDAwMDRDMTc3NUNEIn0.SQSsrNMDAayYhSRQmLJfapioQg-FhKpMxi4clAetKAw",
  "expires_on": "2016-08-09T02:51:00.0543765Z",
  "provider_name": "microsoftaccount",
  "user_claims": [
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "val": "f5164e2a3258fd41"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
      "val": "Joe Bloggs"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
      "val": "Joe"
    },
    {
      "typ": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
      "val": "Bloggs"
    },
    {
      "typ": "urn:microsoftaccount:locale",
      "val": "en_AU"
    },
    {
      "typ": "urn:microsoftaccount:id",
      "val": "f5162e6a3258fd41"
    },
    {
      "typ": "urn:microsoftaccount:name",
      "val": "Joe Bloggs"
    }
  ],
  "user_id": "Joe Bloggs"
}
```