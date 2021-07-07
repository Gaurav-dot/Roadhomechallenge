//Firebase admin configuration

const admin = require('firebase-admin');

module.exports = admin.initializeApp({
  credential: admin.credential.cert({
  "type": "service_account",
  "project_id": "roamhome-5b92b",
  "private_key_id": "217b4b49f3023f34fe59ec3186ac77961c0afb8c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCzhG6b5jvfChhR\naEP3wHKmg+jlpuD3LRUo2pMn3Kbu8QrTH40alX9PmIMpXpwAVzj6W04G/OzfV69P\n94tt73qfXjaX+Mn7C1TNPv/92gxZ/ZeYMFSn4vJ6NFGYHM/BK+zywLlGMuf12PfW\n7aQITi38nFgYVG2P/1ZO6jZWUg24qPK0BBJWTKiCHLDTbEL4chJagVCTQKwW7oFc\n3JX7iN8sGGkjnrJvFForT9IUP4fRh1dYBziYAhYlsdh4erukO2eArKCbNRvYyoTZ\n7F5/u2vv40HOVduKV3zWwrnmc2Qnem8rwjOzFC4MVYkpkEUfQlbsSzW/ucw+IW34\nK43FAuWLAgMBAAECggEAHN6Z2SmEDGD3uzPM5m2FIqFJFZGqUSXnZrwL+VejYv7R\nslU7IIDVSgwpX8BOz0E3sQ9482e+gkZ8M5yISERAkJuapQMGHIDcgOt2SLFF1j0R\noZB4NM2rGBsM2i0b/iFdyEZVJWRvaFqdtOtfu1QzUhIkmrkNK6CxFRzWYzhr63u/\nHIsp38DHQnOFl6rsDUPR4MHe/+4kBvZpcNOqyXIzl1+39BcD5adOcJLcR8KsNKT+\np3dbWJ4hVMVxRgme61lCREIe9yimV9iMEQUw3klbBGL+bS4r7dIPTQv+79MANdSe\nqtX3rWJc1akK05ZmDnL92GZRU03JqAts3D6mos1PCQKBgQDdBCpukOyDDGh6W7RX\nTcmcuiFTJEZwekM9OhTdm/zSTA/SP7YT1406sBPTvk0zgoPPFXIiZlp/3TDtTWfh\nvpCqx/KqPlUc3x9GLIYQh0a4HFxzEQ6I1XGad3ND+Zl/6vMsti/0jRizr23Fjv/K\ng/2UbThzXit74A07BLNQ6GRfYwKBgQDP7q48e0nlkpbuPOzXnG1urYJzXT4fjhWo\nJ5AFfWlQts5+MUJ0bukkLBRYJLyvxoaajRQHUTUWU/+AruhrFr1dT8xU/PoYWIjX\nPRD0JfHfFINZ0TfMo/fqlGA7pZAQAqaCGVpFYdrstJ40EtEMnWeoHtu5zcy2/rpq\nN8WN6tFduQKBgQDUf2PYqIhtu2lcc31iD01P3fmaeZ8sF7E8VfKn24lqHG19xXnn\ne/Cyw4ZcqHSLmOnoGgOBpY1PsLiRAEJn3pQzT0k2e/XTa4cjLj27+IR7EfGlRHoH\n/8hZLo3phjsarSgfDg/vfhWI9ZuCPeobqWoO4jBLY/hFAvdVjkBmAvo2ZwKBgQCF\naF3h8Dg5UxQDRpOuwm5z1F8eJXT2SfMbMEb3Pr+TSbaywGgizAZJbv6ejvOA058J\nCfsPtsqYyMvlhFMaYjyc4dX3sVfExwkFD+kQvEezGTYtKk7ivVES8J/NpSwJGao7\nTojceyw7MqdOQcRek58t/p57V89Ama6A98eIhmBOAQKBgQCvxeB7oqiGTY/zMb/w\nF/0w36mQE2hNan4ZYhplO4SbuEgG8rkBMKs4/Q64rP7gOTMbXhXQqDmg/diLazYi\nOaQP1hO0ueDDr0Z1Y/knJPBED+5AtkRN4FuhIP1iYGb4S28rgMh4cxKnCVSDm+Ma\nhmBiz63cqI22Bq2yugvO+3srrQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-swvxg@roamhome-5b92b.iam.gserviceaccount.com",
  "client_id": "111037696627428197479",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-swvxg%40roamhome-5b92b.iam.gserviceaccount.com"
  }),
});

export {}